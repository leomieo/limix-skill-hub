import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createHash, randomUUID } from 'node:crypto';
import { cp, mkdir, readFile, readdir, rename, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { parseSkillMd } from './skill-md.mjs';
import { readSkillDir, sha256 } from './pack.mjs';
import { scanSkill } from './security.mjs';
import { classifySkill } from './classify.mjs';

const exec = promisify(execFile);
const FILE_MAX = 2 * 1024 * 1024;
// Leave room for the local manifest and Vietnamese documentation within the 16 MB bundle cap.
const TOTAL_MAX = 14 * 1024 * 1024;
const repoPattern = /^[\w.-]+\/[\w.-]+$/;
const shaPattern = /^[a-f0-9]{40}$/;
const readJson = async (file, fallback) => { try { return JSON.parse(await readFile(file, 'utf8')); } catch { return fallback; } };
const safeFile = (name) => name.split('/').length <= 8 && name.split('/').every((part) => part && part !== '.' && part !== '..' && !part.startsWith('.') && !/[\\<>:"|?*\x00-\x1f]/.test(part) && !/[. ]$/.test(part) && !/^(?:con|prn|aux|nul|com\d|lpt\d)(?:\.|$)/i.test(part) && !['node_modules', '__pycache__', 'venv'].includes(part));

export function validateHybridManifest(value) {
  const fail = (message) => { throw new Error(message); };
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail('invalid hybrid manifest');
  const allowed = ['schemaVersion', 'name', 'version', 'source', 'languages', 'vietnamese', 'requiredCapabilities', 'permissions', 'syncedAt', 'security', 'compatibility'];
  if (Object.keys(value).some((key) => !allowed.includes(key))) fail('unknown hybrid metadata key');
  if (value.schemaVersion !== 1 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.name) || value.name.length > 64) fail('invalid hybrid skill identity');
  const source = value.source;
  if (!source || !/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+(?:\/[^?#]*)?$/.test(source.url) || !shaPattern.test(source.commit) || !/^[a-f0-9]{64}$/.test(source.sha256)) fail('invalid hybrid source');
  if (Object.keys(source).some((key) => !['url', 'commit', 'sha256', 'license'].includes(key))) fail('unknown source key');
  if (!Array.isArray(value.languages) || !value.languages.includes('en') || value.languages.some((lang) => !['en', 'vi'].includes(lang)) || new Set(value.languages).size !== value.languages.length) fail('invalid hybrid languages');
  if (!['unreviewed', 'quarantined', 'review-required'].includes(value.security?.status) || !Array.isArray(value.security?.findings)) fail('hybrid metadata cannot approve a skill');
  if (!['unchecked', 'compatible', 'incompatible'].includes(value.compatibility?.status) || !Array.isArray(value.compatibility?.notes)) fail('invalid hybrid compatibility');
  if (!Array.isArray(value.permissions) || value.permissions.some((permission) => !['filesystem-read', 'filesystem-write', 'network', 'shell'].includes(permission))) fail('invalid hybrid permissions');
  if (!Array.isArray(value.requiredCapabilities) || !Number.isFinite(Date.parse(value.syncedAt))) fail('invalid hybrid metadata');
  if (value.vietnamese) {
    const vi = value.vietnamese;
    if (!value.languages.includes('vi') || vi.sourceSha256 !== source.sha256 || typeof vi.description !== 'string' || !vi.description.trim() || vi.description.length > 1024) fail('invalid Vietnamese layer provenance');
    for (const key of ['aliases', 'keywords']) if (!Array.isArray(vi[key]) || vi[key].length > 24 || vi[key].some((term) => typeof term !== 'string' || !term.trim() || term.length > 120)) fail('invalid Vietnamese terms');
    if (!Array.isArray(vi.examples) || vi.examples.length > 12 || vi.examples.some((example) => typeof example !== 'string' || !example.trim() || example.length > 500)) fail('invalid Vietnamese examples');
    if (vi.guide !== undefined && vi.guide !== 'references/guide.vi.md') fail('invalid Vietnamese guide path');
  }
  return value;
}

async function responseBytes(url, fetcher, limit, token) {
  const response = await fetcher(url, { redirect: 'error', signal: AbortSignal.timeout(25000), headers: { 'User-Agent': 'limix-skill-hub-hybrid', ...(token && new URL(url).hostname === 'api.github.com' ? { Authorization: `Bearer ${token}` } : {}) } });
  if (!response.ok) throw new Error(`GitHub HTTP ${response.status}${response.status === 403 || response.status === 429 ? ' (rate limit; retry in a later run)' : ''}`);
  if (Number(response.headers.get('content-length')) > limit) throw new Error('source exceeds file limit');
  const parts = [];
  let bytes = 0;
  for await (const part of response.body) {
    bytes += part.length;
    if (bytes > limit) throw new Error('source exceeds file limit');
    parts.push(part);
  }
  return Buffer.concat(parts);
}

export async function fetchSourceSkill(repository, id, { fetcher = fetch, resolveCommit, token = process.env.GITHUB_TOKEN } = {}) {
  if (!repoPattern.test(repository)) throw new Error('invalid repository identity');
  const commit = resolveCommit ? await resolveCommit(repository) : (await exec('git', ['ls-remote', `https://github.com/${repository}.git`, 'HEAD'], { timeout: 25000, maxBuffer: 4096, windowsHide: true })).stdout.trim().split(/\s+/)[0];
  if (!shaPattern.test(commit)) throw new Error('GitHub did not return a commit SHA');
  const treeData = JSON.parse((await responseBytes(`https://api.github.com/repos/${repository}/git/trees/${commit}?recursive=1`, fetcher, 12 * 1024 * 1024, token)).toString('utf8'));
  if (treeData.truncated) throw new Error('source tree listing is truncated');
  const tree = treeData.tree;
  if (!Array.isArray(tree)) throw new Error('invalid source tree');
  const candidates = tree.filter((node) => node.type === 'blob' && /(^|\/)SKILL\.md$/.test(node.path) && node.size <= 256 * 1024)
    .sort((a, b) => Number(b.path === 'SKILL.md') - Number(a.path === 'SKILL.md') || Number(b.path.includes(id)) - Number(a.path.includes(id)) || a.path.localeCompare(b.path));
  let selected;
  const downloaded = new Map();
  const raw = async (node) => {
    if (downloaded.has(node.path)) return downloaded.get(node.path);
    const bytes = await responseBytes(`https://raw.githubusercontent.com/${repository}/${commit}/${node.path.split('/').map(encodeURIComponent).join('/')}`, fetcher, FILE_MAX);
    const blobSha = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
    if (node.sha && blobSha !== node.sha) throw new Error(`source blob hash mismatch: ${node.path}`);
    downloaded.set(node.path, bytes);
    return bytes;
  };
  for (const candidate of candidates.slice(0, 50)) {
    const bytes = await raw(candidate);
    const parsed = parseSkillMd(bytes.toString('utf8'));
    if (!('error' in parsed) && parsed.name === id) { selected = candidate; break; }
  }
  if (!selected) return { repository, commit, files: [], verified: false, skipped: [], reason: 'No compatible upstream SKILL.md with the curated English name; legacy English wrapper retained.' };
  const prefix = selected.path.slice(0, -'SKILL.md'.length);
  const nested = candidates.filter((candidate) => candidate !== selected && candidate.path.startsWith(prefix)).map((candidate) => candidate.path.slice(0, -'SKILL.md'.length));
  const ordered = tree.filter((node) => node.type === 'blob' && node.path.startsWith(prefix) && !nested.some((child) => node.path.startsWith(child)))
    .sort((a, b) => Number(b.path === selected.path) - Number(a.path === selected.path) || a.path.localeCompare(b.path));
  const files = [];
  const skipped = [];
  let total = 0;
  for (const node of ordered) {
    const rel = node.path.slice(prefix.length);
    if (!safeFile(rel) || node.mode === '120000' || node.size > FILE_MAX || files.length >= 196 || total + node.size > TOTAL_MAX) { skipped.push(rel); continue; }
    const bytes = await raw(node);
    if (bytes.length < 1024 && bytes.toString('utf8').startsWith('version https://git-lfs.github.com/spec/')) { skipped.push(rel); continue; }
    total += bytes.length;
    files.push({ path: rel, bytes, executable: node.mode === '100755' });
  }
  for (const license of tree.filter((node) => node.type === 'blob' && /^(?:LICENSE|COPYING|NOTICE)(?:\.[\w.-]+)?$/i.test(node.path) && node.size <= FILE_MAX)) {
    if (!files.some((file) => file.path === license.path)) files.push({ path: license.path, bytes: await raw(license), executable: false });
  }
  return { repository, commit, path: prefix.replace(/\/$/, ''), files, skipped, verified: true };
}

const scanFiles = (files) => files.map((file) => ({ path: file.path, size: file.bytes.length, text: file.bytes.includes(0) ? undefined : file.bytes.toString('utf8'), binary: file.bytes.includes(0) }));

export async function verifyHybridSkill(target) {
  const manifest = validateHybridManifest(JSON.parse(await readFile(path.join(target, 'manifest.json'), 'utf8')));
  const inventory = JSON.parse(await readFile(path.join(target, '_hub.source.json'), 'utf8'));
  const core = await readFile(path.join(target, 'SKILL.md'));
  if (sha256(core) !== manifest.source.sha256) throw new Error('English core failed integrity verification');
  if (inventory.commit !== manifest.source.commit || inventory.coreSha256 !== manifest.source.sha256 || !Array.isArray(inventory.files)) throw new Error('source inventory does not match manifest');
  const seen = new Set();
  for (const file of inventory.files) {
    if (!safeFile(file.path) || seen.has(file.path) || !/^[a-f0-9]{64}$/.test(file.sha256)) throw new Error('invalid source inventory path/hash');
    seen.add(file.path);
    if (sha256(await readFile(path.join(target, file.path))) !== file.sha256) throw new Error(`source file failed integrity verification: ${file.path}`);
  }
  if (!seen.has('SKILL.md')) throw new Error('source inventory has no core');
  return { verified: inventory.verified === true, files: seen.size, manifest };
}

/** Restore the exact pre-migration directory; retain the Hybrid version for inspection. */
export async function rollbackHybridSkill(root, id, { commit } = {}) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) throw new Error('invalid skill id');
  const target = path.join(root, 'skills', id);
  const meta = await readJson(path.join(target, '_hub.json'), {});
  if (commit !== undefined && !shaPattern.test(commit)) throw new Error('invalid rollback commit');
  const originalId = commit ? id : meta.legacyId ?? id;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(originalId)) throw new Error('invalid original skill id');
  const backup = commit ? path.join(root, 'version-backups', id, commit) : path.join(root, 'migration-backups', '2026-11-13', originalId);
  await stat(path.join(backup, 'SKILL.md'));
  const destination = path.join(root, 'skills', originalId);
  if (originalId !== id && await stat(destination).then(() => true, () => false)) throw new Error('rollback destination already exists');
  const retained = path.join(root, 'rollback-snapshots', `${id}-${randomUUID()}`);
  const stage = path.join(root, 'skills', `.rollback-${randomUUID()}`);
  await cp(backup, stage, { recursive: true, errorOnExist: true, force: false });
  await mkdir(path.dirname(retained), { recursive: true });
  await rename(target, retained);
  try { await rename(stage, destination); }
  catch (error) { await rename(retained, target); throw error; }
  return { id: originalId, state: 'rolled-back', retained };
}

export async function migrateHybridSkill(root, id, { sourceProvider = fetchSourceSkill, now = new Date().toISOString(), aliases = [], update = false } = {}) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) throw new Error('invalid skill id');
  const target = path.join(root, 'skills', id);
  const previous = await readJson(path.join(target, 'manifest.json'), null);
  if (previous && !update) {
    const inventory = await verifyHybridSkill(target);
    return { id, state: 'unchanged', commit: previous.source.commit, verified: inventory.verified };
  }
  if (previous) await verifyHybridSkill(target);
  const meta = await readJson(path.join(target, '_hub.json'), {});
  if (!repoPattern.test(meta.repository ?? '')) throw new Error('skill has no valid source repository');
  const legacyEnglish = await readFile(path.join(target, 'SKILL.en.md'), 'utf8').catch(() => null);
  const legacyParsed = legacyEnglish ? parseSkillMd(legacyEnglish) : null;
  const originalId = id;
  if (legacyParsed && !('error' in legacyParsed)) id = legacyParsed.name;
  const destination = path.join(root, 'skills', id);
  if (id !== originalId && await stat(destination).then(() => true, () => false)) throw new Error('canonical English name already exists; refusing duplicate overwrite');
  const source = await sourceProvider(meta.repository, id);
  if (!shaPattern.test(source.commit)) throw new Error('source commit could not be verified');
  if (previous?.source.commit === source.commit) return { id, state: 'unchanged', commit: source.commit, verified: source.verified };
  const oldVi = await readFile(path.join(target, 'SKILL.md'), 'utf8');
  const oldEnglish = await readFile(path.join(target, 'SKILL.en.md')).catch(() => previous ? readFile(path.join(target, 'SKILL.md')) : null);
  if (!source.verified && !oldEnglish) throw new Error('no English core available; migration refused');
  let core = source.verified ? source.files.find((file) => file.path === 'SKILL.md')?.bytes : oldEnglish;
  if (!core) throw new Error('source has no English core');
  // Legacy collection extracts are not upstream entrypoints. Give them a valid local envelope,
  // preserve their body, and quarantine them explicitly rather than certifying invented provenance.
  if (!source.verified && 'error' in parseSkillMd(core.toString('utf8'))) {
    core = Buffer.concat([Buffer.from(`---\nname: ${id}\ndescription: Unverified legacy English collection for ${id}. Source entrypoint requires manual review before activation.\n---\n\n`), core]);
    source.reason = `${source.reason ?? 'Unverified legacy source'} Local frontmatter was added to an old English extract; this is not a verified upstream SKILL.md.`;
  }
  const parsed = parseSkillMd(core.toString('utf8'));
  if ('error' in parsed || parsed.name !== id) throw new Error('English core name/frontmatter is incompatible');
  const coreHash = sha256(core);
  const oldParsed = parseSkillMd(oldVi);
  const viDescription = previous?.vietnamese?.description ?? ('error' in oldParsed ? `Hướng dẫn sử dụng ${id}.` : oldParsed.description);
  const sourceFiles = source.verified ? source.files : [{ path: 'SKILL.md', bytes: core, executable: false }];
  if (sourceFiles.some((file) => ['manifest.json', '_hub.json', '_hub.source.json', 'references/guide.vi.md'].includes(file.path))) throw new Error('upstream uses a reserved hub metadata path; manual merge required');
  const findings = scanSkill(scanFiles(sourceFiles));
  const classification = classifySkill(scanFiles(sourceFiles));
  const status = !source.verified || findings.status === 'quarantined' ? 'quarantined' : 'review-required';
  const notes = [
    ...(source.verified ? ['English SKILL.md and downloaded source files are byte-identical to the pinned GitHub commit.'] : [source.reason]),
    ...(source.skipped.length ? [`${source.skipped.length} upstream files were excluded by size/path/nested-skill limits; inspect _hub.source.json before activation.`] : []),
    'No upstream scripts were executed. Compatibility is static only; runtime and provider acceptance remain untested.',
  ];
  const vi = previous?.vietnamese?.sourceSha256 === coreHash ? previous.vietnamese : {
    description: viDescription.slice(0, 1024),
    aliases: aliases.map((alias) => alias.slice(0, 120)).slice(0, 24),
    keywords: [...new Set([...id.split('-'), ...aliases])].map((term) => term.slice(0, 120)).slice(0, 24),
    examples: [`Dùng ${id} cho tác vụ của tôi; giải thích kết quả bằng tiếng Việt.`],
    guide: 'references/guide.vi.md',
    sourceSha256: coreHash,
  };
  const preservedGuide = previous?.vietnamese?.sourceSha256 === coreHash
    ? await readFile(path.join(target, 'references', 'guide.vi.md')).catch(() => null) : null;
  const manifest = validateHybridManifest({
    schemaVersion: 1, name: id, version: source.commit.slice(0, 12),
    source: { url: `https://github.com/${meta.repository}`, commit: source.commit, sha256: coreHash, ...(meta.license ? { license: meta.license } : {}) },
    languages: ['en', 'vi'], vietnamese: vi,
    requiredCapabilities: [], permissions: [...(classification.tools.length ? ['shell', 'filesystem-read', 'filesystem-write'] : []), ...(/https?:\/\//.test(core.toString('utf8')) ? ['network'] : [])],
    syncedAt: now,
    security: { status, findings: findings.findings.slice(0, 48).map((finding) => `${finding.file}: ${finding.rule} (${finding.severity})`).concat(!source.verified ? ['Legacy English wrapper has not been matched to upstream source.'] : []) },
    compatibility: { status: !source.verified || source.skipped.length ? 'incompatible' : 'unchecked', notes },
  });
  const backup = path.join(root, 'migration-backups', '2026-11-13', originalId);
  await mkdir(path.dirname(backup), { recursive: true });
  if (!(await stat(backup).then(() => true, () => false))) await cp(target, backup, { recursive: true, force: false, errorOnExist: true });
  if (previous) {
    const versionBackup = path.join(root, 'version-backups', originalId, previous.source.commit);
    if (!(await stat(versionBackup).then(() => true, () => false))) {
      await mkdir(path.dirname(versionBackup), { recursive: true });
      await cp(target, versionBackup, { recursive: true, force: false, errorOnExist: true });
    }
  }
  const cache = path.join(root, 'source-cache', id, source.commit);
  await mkdir(cache, { recursive: true });
  for (const file of sourceFiles) {
    const dest = path.join(cache, file.path);
    await mkdir(path.dirname(dest), { recursive: true });
    const existing = await readFile(dest).catch(() => null);
    if (existing && !existing.equals(file.bytes)) throw new Error('immutable source cache collision');
    if (!existing) await writeFile(dest, file.bytes, { flag: 'wx' });
  }
  const stage = path.join(root, 'skills', `.hybrid-${id}-${randomUUID()}`);
  await mkdir(stage, { recursive: true });
  try {
    for (const file of sourceFiles) {
      const dest = path.join(stage, file.path);
      await mkdir(path.dirname(dest), { recursive: true });
      await writeFile(dest, file.bytes, { mode: file.executable ? 0o755 : 0o644 });
    }
    const guide = `# ${id} — hướng dẫn tiếng Việt\n\n${vi.description}\n\n## Cách dùng\n\n- Gọi kỹ năng bằng tên gốc \`${id}\` hoặc mô tả yêu cầu bằng tiếng Việt.\n- Ví dụ: “${vi.examples[0]}”\n- Cung cấp đầu vào và kết quả mong muốn. Các điều kiện, giới hạn và bước duyệt tuân theo \`SKILL.md\` gốc.\n\n## Ngôn ngữ và giới hạn\n\nTài liệu này chỉ giải thích cho người dùng; không thay đổi quy trình thực thi. Agent đọc \`SKILL.md\` khi kích hoạt, chỉ đọc reference phù hợp khi cần. Không nạp đồng thời bản dịch đầy đủ. Giữ nguyên tên Tool, API, MCP, CLI, tham số, mã nguồn và đường dẫn.\n\nTrạng thái: **${status}**. Chưa chạy thử script hoặc dịch vụ ngoài. Việc quét tĩnh không bảo đảm an toàn; quyền sử dụng do Limix Bot và chủ bot quyết định.\n\nNguồn: https://github.com/${meta.repository} — commit \`${source.commit}\`.\n`;
    await mkdir(path.join(stage, 'references'), { recursive: true });
    await writeFile(path.join(stage, 'references', 'guide.vi.md'), preservedGuide ?? guide);
    await writeFile(path.join(stage, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
    await writeFile(path.join(stage, '_hub.json'), JSON.stringify({ ...meta, commit: source.commit, path: source.path ?? null, language: 'hybrid', version: source.commit.slice(0, 12), hybrid: true, ...(originalId !== id ? { legacyId: originalId } : {}), originalCoreVerified: source.verified, last_checked: now }, null, 2) + '\n');
    await writeFile(path.join(stage, '_hub.source.json'), JSON.stringify({ repository: meta.repository, commit: source.commit, path: source.path ?? null, verified: source.verified, coreSha256: coreHash, skipped: source.skipped, files: sourceFiles.map((file) => ({ path: file.path, sha256: sha256(file.bytes), executable: file.executable })), backup: path.relative(root, backup).replaceAll('\\', '/') }, null, 2) + '\n');
    if ((await readSkillDir(stage)).length > 200) throw new Error('hybrid bundle exceeds skill folder file limit');
    const old = path.join(root, 'skills', `.previous-${id}-${randomUUID()}`);
    await rename(target, old);
    try { await rename(stage, destination); } catch (error) { await rename(old, target); throw error; }
    await rm(old, { recursive: true, force: true });
    return { id, ...(originalId !== id ? { previousId: originalId } : {}), state: 'migrated', commit: source.commit, verified: source.verified, sourceFiles: sourceFiles.length, skipped: source.skipped.length, security: status, compatibility: manifest.compatibility.status };
  } catch (error) {
    await rm(stage, { recursive: true, force: true });
    throw error;
  }
}
