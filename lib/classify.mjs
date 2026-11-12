// Splits a skill folder into "instructions" (SKILL.md and docs) and "tool parts" (scripts, binaries, MCP configs,
// runtime requirements). Tool parts are never installed automatically: the app shows them as "needs review" and the
// owner enables them by hand. Known runtimes map to the installer catalog of the app ("Công cụ cho kỹ năng").

const SCRIPT_EXT = /\.(py|js|mjs|cjs|ts|sh|bash|zsh|ps1|bat|cmd|rb|pl|php|go|rs)$/i;
const BINARY_EXT = /\.(exe|dll|so|dylib|bin|jar|class|scr|msi|com|apk|dex|node|wasm)$/i;

// runtime name → id in electron/limix-tools.mjs catalog (null = the app cannot install it for the user)
const RUNTIMES = [
  { id: "node", tool: "node", re: /\b(node(\.js)?|npm|npx|pnpm)\b/i },
  { id: "python", tool: null, re: /\b(python3?|pip3?|uv)\b/i },
  { id: "ffmpeg", tool: "ffmpeg", re: /\bffmpeg\b/i },
  { id: "docker", tool: "docker", re: /\bdocker\b/i },
  { id: "java", tool: "jdk", re: /\b(jdk|java\s?\d*|jadx)\b/i },
  { id: "ghidra", tool: "ghidra", re: /\bghidra\b/i },
];

const MCP_FILES = /(^|\/)(\.mcp\.json|mcp\.json|mcp-servers?\.json|claude_desktop_config\.json)$/i;

/** files: [{ path, text?, size }] → { kind, instructions[], tools[], mcp[], runtimes[], needsReview } */
export function classifySkill(files) {
  const tools = [];
  const instructions = [];
  const mcp = [];
  const runtimes = new Map();
  for (const file of files) {
    if (MCP_FILES.test(file.path)) {
      mcp.push(file.path);
      continue;
    }
    if (SCRIPT_EXT.test(file.path) || BINARY_EXT.test(file.path)) {
      tools.push({ path: file.path, kind: BINARY_EXT.test(file.path) ? "binary" : "script", size: file.size ?? 0 });
    } else {
      instructions.push(file.path);
    }
    const text = file.text ?? "";
    // Runtime hints come from docs and scripts the skill ships; one mention is enough, this is a hint, not proof.
    for (const runtime of RUNTIMES) {
      if (runtime.re.test(text)) runtimes.set(runtime.id, runtime.tool);
    }
  }
  const kind = mcp.length ? "mcp-bundle" : tools.length ? "skill-with-tools" : "instructions-only";
  return {
    kind,
    instructions,
    tools,
    mcp,
    runtimes: [...runtimes].map(([name, tool]) => ({ name, installerId: tool })),
    // Anything that can execute code or start a server stays "needs owner approval", whatever the score is.
    needsReview: kind !== "instructions-only",
  };
}
