#!/usr/bin/env node
// Rebuilds registry/*.json from skills/ and quarantine/. Pure local work: no network, no skill code is executed.
//   node tools/build-catalog.mjs [--root <repo dir>]
import { mkdir, readdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseSkillMd, isSkillName } from "../lib/skill-md.mjs";
import { readSkillDir, folderChecksum } from "../lib/pack.mjs";
import { scanSkill } from "../lib/security.mjs";
import { classifySkill } from "../lib/classify.mjs";
import { scoreSkill } from "../lib/score.mjs";
import { validateHybridManifest, verifyHybridSkill } from "../lib/hybrid.mjs";

const rootArg = process.argv.indexOf("--root");
const root = rootArg > 0 ? path.resolve(process.argv[rootArg + 1]) : path.resolve(fileURLToPath(new URL("..", import.meta.url)));

const readJson = async (file, fallback) => {
  try { return JSON.parse(await readFile(file, "utf8")); } catch { return fallback; }
};

async function entryFor(area, id) {
  const dir = path.join(root, area, id);
  const files = await readSkillDir(dir);
  const skillFile = files.find((f) => f.path === "SKILL.md");
  if (!skillFile) return { error: "no SKILL.md" };
  const parsed = parseSkillMd(skillFile.text);
  if ("error" in parsed) return { error: parsed.error };
  if (!isSkillName(parsed.name)) return { error: `invalid skill name ${parsed.name}` };
  if (parsed.name !== id) return { error: `folder ${id} does not match English core name ${parsed.name}` };
  const meta = await readJson(path.join(dir, "_hub.json"), {});          // source info written by discovery
  const review = await readJson(path.join(dir, "_hub.review.json"), {}); // curator bot output (test, translation)
  const content = files.filter((f) => !f.path.startsWith("_hub"));
  const manifestFile = files.find((file) => file.path === "manifest.json");
  const hybrid = manifestFile ? validateHybridManifest(JSON.parse(manifestFile.text)) : null;
  if (hybrid) await verifyHybridSkill(dir);
  if (hybrid && (hybrid.name !== id || hybrid.source.sha256 !== skillFile.sha256)) return { error: "Hybrid source hash/name does not match English core" };
  if (!meta.license && parsed.license) meta.license = parsed.license;
  if (hybrid?.vietnamese) { review.localized = true; review.description_vi = hybrid.vietnamese.description; review.language = "hybrid"; }
  const scan = scanSkill(content);
  const classification = classifySkill(content);
  const quarantined = area === "quarantine" || scan.status === "quarantined" || hybrid?.security.status === "quarantined";
  const score = scoreSkill({ parsed, scan: { ...scan, status: quarantined ? 'quarantined' : scan.status }, classification, meta, review });
  const approval = quarantined ? "quarantined" : "review-required";
  return {
    id,
    name: parsed.name,
    description: parsed.description,
    description_vi: review.description_vi ?? null,
    ...(hybrid ? { hybrid, aliases: hybrid.vietnamese?.aliases ?? [], keywords: hybrid.vietnamese?.keywords ?? [], supported_languages: hybrid.languages } : {}),
    version: meta.version ?? (meta.commit ? meta.commit.slice(0, 7) : "0"),
    source: { repository: meta.repository ?? null, commit: meta.commit ?? null, path: meta.path ?? null },
    stars: typeof meta.stars === "number" ? meta.stars : null,
    created_at: meta.createdAt ?? null,
    pushed_at: meta.pushedAt ?? null,
    stats_checked: meta.statsCheckedAt ?? null,
    license: meta.license ?? parsed.license ?? null,
    language: review.language ?? meta.language ?? "en",
    category: review.category ?? meta.category ?? "other",
    tags: parsed.tags ?? [],
    quality_score: score.total,
    score_parts: score.parts,
    grade: score.grade,
    security_status: quarantined ? 'quarantined' : scan.status,
    security_findings: scan.findings.map(({ rule, severity, file, line }) => ({ rule, severity, file, line })),
    approval_status: approval,
    kind: classification.kind,
    compatibility: { text: parsed.compatibility ?? null, runtimes: classification.runtimes },
    dependencies: classification.runtimes.filter((r) => r.installerId).map((r) => r.installerId),
    permissions: { runs_code: classification.tools.length > 0, mcp: classification.mcp.length > 0, files: content.map((f) => f.path) },
    checksum: folderChecksum(content),
    file_hashes: Object.fromEntries(content.map((f) => [f.path, f.sha256])),
    notes: score.notes,
    last_checked: meta.last_checked ?? null,
    area: quarantined ? "quarantine" : "skills",
  };
}

const catalog = [];
const problems = [];
for (const area of ["skills", "quarantine"]) {
  const dir = path.join(root, area);
  let ids = [];
  try { ids = (await readdir(dir, { withFileTypes: true })).filter((d) => d.isDirectory() && !d.name.startsWith(".")).map((d) => d.name); } catch { /* empty */ }
  for (const id of ids.sort()) {
    try {
      const entry = await entryFor(area, id);
      if (entry.error) problems.push({ area, id, error: entry.error }); else catalog.push(entry);
    } catch (cause) {
      problems.push({ area, id, error: String(cause?.message ?? cause) });
    }
  }
}

if (problems.length) {
  console.error(`catalog: ${catalog.length} skills, ${problems.length} problems; previous registry retained`);
  for (const p of problems) console.error(`  ! ${p.area}/${p.id}: ${p.error}`);
  process.exit(1);
}

const registryDir = path.join(root, "registry");
await mkdir(registryDir, { recursive: true });
const previous = await readJson(path.join(registryDir, "versions.json"), {});
const versions = { ...previous };
for (const e of catalog) {
  const list = (versions[e.id] ??= []);
  if (!list.some((v) => v.checksum === e.checksum)) list.push({ version: e.version, commit: e.source.commit, checksum: e.checksum, at: e.last_checked });
}
const body = {
  schema: 1,
  hub: "leomieo/limix-skill-hub",
  count: catalog.length,
  skills: catalog,
};
// Stable output: no generation timestamp inside the file, so an unchanged hub produces no commit.
await writeFile(path.join(registryDir, "catalog.json"), JSON.stringify(body, null, 2) + "\n");
await writeFile(path.join(registryDir, "versions.json"), JSON.stringify(versions, null, 2) + "\n");
await writeFile(path.join(registryDir, "checksums.json"), JSON.stringify(Object.fromEntries(catalog.map((e) => [e.id, e.checksum])), null, 2) + "\n");
console.log(`catalog: ${catalog.length} skills, ${problems.length} problems`);
for (const p of problems) console.log(`  ! ${p.area}/${p.id}: ${p.error}`);
