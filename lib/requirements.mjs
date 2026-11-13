// Static evidence only. Never resolves packages, executes code or inspects credentials.
const HINTS = [
  ['node', 'runtime', /\b(?:Node\.js|node|npm|npx|pnpm|yarn|bun)\b/i, 'node'],
  ['python', 'runtime', /\b(?:python3?|pip3?|uv)\b/i, null],
  ['ffmpeg', 'tool', /\bffmpeg\b/i, 'ffmpeg'],
  ['ffprobe', 'tool', /\bffprobe\b/i, 'ffmpeg'],
  ['docker', 'tool', /\bdocker\b/i, 'docker'],
  ['java', 'runtime', /\b(?:jdk|java|javac)\b/i, 'jdk'],
  ['ghidra', 'tool', /\bghidra\b/i, 'ghidra'],
  ['rust', 'runtime', /\b(?:rust|rustc|cargo|clippy)\b/i, null],
  ['go', 'runtime', /\b(?:golang|go build|go run|go test)\b/i, null],
  ['git', 'tool', /\bgit (?:clone|status|diff|commit|fetch|pull|push)\b/i, null],
  ['github-cli', 'tool', /\b(?:gh (?:auth|pr|issue|repo)|GitHub CLI)\b/i, null],
  ['browser', 'tool', /\b(?:browser|chromium|chrome|playwright|puppeteer)\b/i, null],
  ['react', 'framework', /\breact\b/i, null],
  ['remotion', 'framework', /\bremotion\b/i, null],
  ['three', 'framework', /\b(?:three\.js|threejs)\b/i, null],
  ['playwright', 'tool', /\bplaywright\b/i, null],
  ['puppeteer', 'tool', /\bpuppeteer\b/i, null],
  ['blender', 'tool', /\bblender\b/i, null],
  ['after-effects', 'tool', /\bAfter Effects\b/i, null],
  ['bash', 'tool', /\b(?:bash|zsh)\b/i, null],
  ['powershell', 'tool', /\b(?:powershell|pwsh)\b/i, null],
  ['image-generation', 'agent-capability', /\b(?:imagegen|image_gen|image generation|image tool)\b/i, null],
  ['text-to-speech', 'agent-capability', /\b(?:TTS|text.to.speech|edge-tts|kokoro)\b/i, null],
  ['video-generation', 'agent-capability', /\b(?:video generation|video tool|generate video)\b/i, null],
  ['web-search', 'agent-capability', /\b(?:web search|web_search|search_query|browse the web)\b/i, null],
  ['subagents', 'agent-capability', /\b(?:sub.agents?|multi.agent|spawn_agent)\b/i, null],
  ['filesystem-read', 'agent-capability', /\b(?:readFile|read_file|Read `[^`]+`|read `[^`]+`)/, null],
  ['filesystem-write', 'agent-capability', /\b(?:writeFile|write_file|write the file|append.*\.md)/i, null],
];

export function analyzeRequirements(files, { capabilities = [], inventory = null } = {}) {
  const items = new Map();
  const diagnostics = [];
  const add = (name, kind, status, file, line, extra = {}) => {
    const key = JSON.stringify([kind, name, status, extra.version ?? null, extra.scope ?? null]);
    if (!items.has(key)) items.set(key, { name, kind, status, ...extra, evidence: [] });
    const evidence = items.get(key).evidence;
    if (!evidence.some(e => e.file === file && e.line === line)) evidence.push({ file, line });
  };
  for (const file of files) {
    // Local translations and manifests are not independent source evidence.
    if (/^(?:manifest\.json|_hub.*)$/.test(file.path) || /(?:guide\.vi\.md|PHAN-TICH\.md)$/.test(file.path)) continue;
    const text = file.text ?? '';
    const lines = text.split(/\r?\n/);
    if (/\.(?:md|mdx|sh|bash|ps1)$/.test(file.path)) lines.forEach((line,i)=>{
      // Only a command at the start of a line or an inline code span; never parse prose after a span.
      const snippets=[line.trim(),...Array.from(line.matchAll(/`([^`]+)`/g),m=>m[1])];
      for(const snippet of snippets) {
      const m=snippet.match(/^(?:\$\s+)?((?:python3?\s+-m\s+)?(?:uv\s+)?pip3?\s+install|npm\s+(?:install|i)|pnpm\s+add|yarn\s+add)\s+([^`\n;&#|]+)/);
      if(!m) continue;
      const ecosystem=/pip/.test(m[1]) ? 'pip' : 'npm';
      let skipNext=false;
      for(const token of m[2].trim().split(/\s+/)) {
        if(skipNext) { skipNext=false; continue; }
        if(token.startsWith('-')) { skipNext=/^(?:-r|--requirement|-c|--constraint|--index-url|--extra-index-url|-t|--target|--prefix|--registry)$/.test(token); continue; }
        // Restrict to plain package specs; reject URLs, paths, substitutions and credential arguments.
        const p=ecosystem==='npm' ? token.match(/^(@[\w.-]+\/[\w.-]+|[a-z][\w.-]*)(@(?:[\w.^~*+<>=-]+))?$/i) : token.match(/^([a-z][\w.-]*)(?:\[[\w,.-]+\])?((?:==|>=|<=|~=|!=|>|<)[\w.*+-]+)?$/i);
        if(p && !/\.(?:txt|json|py|sh)$/.test(p[1])) add(p[1],'package','installation-command-hint',file.path,i+1,{ecosystem,version:p[2]?.replace(/^@/,'') ?? '*'});
      }
      }
    });
    if (/(?:^|\/)(?:pyproject\.toml|Cargo\.toml|go\.mod|Gemfile|environment\.ya?ml)$/.test(file.path)) diagnostics.push({file:file.path,issue:'dependency-format-needs-manual-review'});
    if (/\.(?:md|mdx)$/.test(file.path)) lines.forEach((line,i) => {
      for (const m of line.matchAll(/`\/(\w[\w-]*)`/g)) add(m[1], 'agent-skill', 'reference-hint', file.path, i+1);
    });
    if (/(^|\/)package\.json$/.test(file.path)) {
      try {
        const pkg = JSON.parse(text);
        for (const [scope, kind] of [['dependencies','package'],['devDependencies','package'],['optionalDependencies','package'],['peerDependencies','package'],['engines','runtime']]) {
          for (const [name, version] of Object.entries(pkg[scope] ?? {})) {
            if (typeof version !== 'string') continue;
            const line = lines.findIndex(l => l.includes(JSON.stringify(name))) + 1;
            add(name, kind, 'declared', file.path, line || 1, { version, scope, ecosystem: 'npm' });
          }
        }
      } catch { diagnostics.push({ file: file.path, issue: 'invalid-package-json' }); }
    }
    if (/(^|\/)requirements(?:[-_.][\w-]+)?\.txt$/.test(file.path)) {
      lines.forEach((line, i) => {
        const m = line.match(/^\s*([A-Za-z0-9][\w.-]*)(\[[\w,.-]+\])?\s*((?:===|==|>=|<=|~=|!=|>|<)[^;#\s]+)?(?:\s*(?:;.*|#.*))?\s*$/);
        if (m) add(m[1], 'package', 'declared', file.path, i + 1, { version: m[3] ?? '*', ecosystem: 'pip', scope: 'requirements' });
        else if (line.trim() && !line.trim().startsWith('#')) diagnostics.push({file:file.path,line:i+1,issue:'requirement-needs-manual-review'});
      });
    }
    // Source imports are hints, not guaranteed distribution names or mandatory installs.
    if (/\.(?:mjs|cjs|jsx?|tsx?)$/.test(file.path)) {
      lines.forEach((line, i) => {
        const re = /(?:\bfrom\s*|\bimport\s*\(?\s*|\brequire\s*\(\s*)['"]([^'"]+)['"]/g;
        for (const m of line.matchAll(re)) {
          const spec = m[1];
          if (/^(?:[./#]|node:|https?:|data:)/.test(spec)) continue;
          const name = spec.startsWith('@') ? spec.split('/').slice(0,2).join('/') : spec.split('/')[0];
          // Bare Node builtins are not npm packages.
          if (BUILTINS.has(name)) continue;
          add(name, 'module', 'import-hint', file.path, i+1, { ecosystem:'javascript' });
        }
      });
    }
    if (/\.py$/.test(file.path)) lines.forEach((line,i) => {
      const m = line.match(/^\s*(?:from\s+([A-Za-z_]\w*)[\w.]*\s+import|import\s+([A-Za-z_]\w*))/);
      if(m) add(m[1] ?? m[2], 'module', 'import-hint', file.path, i+1, {ecosystem:'python', distributionName:'unresolved'});
    });
    // Keep generated HTML, lock files, datasets and translated commentary out of mention heuristics.
    if (!/\.(?:md|mdx|txt|py|js|mjs|cjs|ts|tsx|jsx|sh|bash|ps1|toml|json)$/.test(file.path) || /(?:lock|PHAN-TICH)/i.test(file.path)) continue;
    for (const [name, kind, re, installerId] of HINTS) {
      const index = lines.findIndex(line => re.test(line));
      if (index >= 0) add(name, kind, 'mention-hint', file.path, index + 1, { installerId });
    }
    const runtime = /\.py$/.test(file.path) ? 'python' : /\.(?:mjs|cjs|js|jsx|ts|tsx)$/.test(file.path) ? 'node' : /\.(?:sh|bash)$/.test(file.path) ? 'bash' : /\.ps1$/.test(file.path) ? 'powershell' : null;
    if (runtime) add(runtime, 'runtime', 'file-type-hint', file.path, 1, {installerId:runtime === 'node' ? 'node' : null});
    if (/(^|\/)(?:\.mcp\.json|mcp\.json|mcp-servers?\.json|claude_desktop_config\.json)$/.test(file.path)) {
      try {
        const config = JSON.parse(text);
        for (const name of Object.keys(config.mcpServers ?? config.servers ?? {})) add(name, 'mcp-server', 'declared', file.path, 1);
      } catch { diagnostics.push({file:file.path,issue:'invalid-mcp-json'}); }
    }
  }
  const detected = [...items.values()].sort((a,b) => JSON.stringify([a.kind,a.name,a.status,a.scope]).localeCompare(JSON.stringify([b.kind,b.name,b.status,b.scope]), 'en'));
  const runtimeHints = HINTS.filter(([name,, ,id]) => id !== null || name === 'python')
    .filter(([name]) => detected.some(item => item.name === name))
    .map(([name,,,installerId]) => ({name,installerId}));
  const summaries = detected.filter(x => ['declared','installation-command-hint'].includes(x.status) || ['runtime','tool','framework','agent-capability','agent-skill'].includes(x.kind))
    .map(x => `${x.name}${x.version ? ` ${x.version}` : ''} [${x.status}${x.scope ? `; ${x.scope}` : ''}]`);
  return {
    schemaVersion: 1,
    capabilities: [...new Set([...capabilities,...summaries])].sort(),
    runtimeHints,
    detected,
    diagnostics,
    analysisStatus: 'static-review-required',
    coverage: { filesScanned: files.filter(f=>f.text !== undefined && !/^(?:manifest\.json|_hub.*)$/.test(f.path) && !/(?:guide\.vi\.md|PHAN-TICH\.md)$/.test(f.path)).length, detection: detected.length ? 'candidates-found' : 'no-external-requirement-detected' },
    missingPackageFiles: inventory?.skipped ?? [],
    packageCompleteness: inventory?.skipped?.length ? 'incomplete' : inventory?.verified ? 'retained-source-files-verified' : 'unverified',
    environmentStatus: 'not-tested',
    autoInstall: false,
  };
}

import { builtinModules } from 'node:module';
const BUILTINS = new Set(builtinModules.map(name => name.replace(/^node:/,'')));
