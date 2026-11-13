#!/usr/bin/env node
// Daily discovery. Finds public repositories that contain SKILL.md folders and copies them (as inert files) into
// skills/ or quarantine/, pinned to a commit. Nothing downloaded is ever executed. Incremental: a repo whose
// pushed_at did not change since the last run is skipped; progress is checkpointed so a rate-limit stop resumes.
//   GITHUB_TOKEN=... node tools/discover.mjs [--root <dir>] [--dry]
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseSkillMd, isSkillName } from "../lib/skill-md.mjs";
import { scanSkill } from "../lib/security.mjs";

const args = process.argv.slice(2);
const flag = (name) => args.indexOf(name);
const root = flag("--root") >= 0 ? path.resolve(args[flag("--root") + 1]) : fileURLToPath(new URL("..", import.meta.url));
const dry = flag("--dry") >= 0;
const token = process.env.GITHUB_TOKEN ?? "";

const readJson = async (file, fallback) => { try { return JSON.parse(await readFile(file, "utf8")); } catch { return fallback; } };
const sources = await readJson(path.join(root, "discovery/sources.json"), {});
const limits = { max_repos_per_run: 60, max_skills_per_repo: 40, max_new_skills_per_run: 120, min_stars: 0, pushed_within_months: 24, ...sources.limits };
const checkpointFile = path.join(root, "discovery/checkpoint.json");
const checkpoint = await readJson(checkpointFile, { repos: {} });
const stats = { repos: 0, skipped: 0, added: 0, quarantined: 0, rejected: 0, rateLimited: false };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function gh(url, { raw = false, tries = 4 } = {}) {
  for (let attempt = 0; attempt < tries; attempt += 1) {
    const res = await fetch(url, { headers: { "User-Agent": "limix-skill-hub", ...(raw ? {} : { Accept: "application/vnd.github+json" }), ...(token && !raw ? { Authorization: `Bearer ${token}` } : {}) } });
    if (res.status === 403 || res.status === 429) {
      const reset = Number(res.headers.get("x-ratelimit-reset")) * 1000;
      const retryAfter = Number(res.headers.get("retry-after")) * 1000;
      const wait = retryAfter || (reset ? reset - Date.now() : 60000);
      if (wait > 120000) { stats.rateLimited = true; throw new Error("rate-limited"); }
      await sleep(Math.max(1000, wait) + 500);
      continue;
    }
    if (res.status >= 500) { await sleep(2000 * (attempt + 1)); continue; }
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return raw ? res.text() : res.json();
  }
  throw new Error(`giving up: ${url}`);
}

async function candidateRepos() {
  const found = new Map();
  const add = (r) => r && !r.fork && !r.archived && !r.private && found.set(r.full_name, r);
  for (const item of sources.repositories ?? []) {
    try { add(await gh(`https://api.github.com/repos/${item.repo}`)); } catch (e) { if (e.message === "rate-limited") throw e; }
  }
  for (const topic of sources.topics ?? []) {
    const data = await gh(`https://api.github.com/search/repositories?q=topic:${encodeURIComponent(topic)}&sort=updated&per_page=30`);
    data.items.forEach(add);
  }
  for (const user of sources.users ?? []) {
    const data = await gh(`https://api.github.com/users/${encodeURIComponent(user)}/repos?sort=pushed&per_page=30`);
    data.forEach(add);
  }
  const cutoff = Date.now() - limits.pushed_within_months * 30 * 864e5;
  return [...found.values()]
    .filter((r) => r.stargazers_count >= limits.min_stars && Date.parse(r.pushed_at) >= cutoff)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, limits.max_repos_per_run);
}

async function processRepo(repo) {
  const known = checkpoint.repos[repo.full_name];
  if (known?.pushed_at === repo.pushed_at) { stats.skipped += 1; return; }
  const branch = repo.default_branch;
  const tree = await gh(`https://api.github.com/repos/${repo.full_name}/git/trees/${encodeURIComponent(branch)}?recursive=1`);
  const sha = tree.sha;
  const dirs = tree.tree.filter((n) => n.type === "blob" && /(^|\/)SKILL\.md$/.test(n.path)).map((n) => n.path.replace(/\/?SKILL\.md$/, ""));
  let licence = repo.license?.spdx_id && repo.license.spdx_id !== "NOASSERTION" ? repo.license.spdx_id : null;
  for (const dir of dirs.slice(0, limits.max_skills_per_repo)) {
    if (stats.added >= limits.max_new_skills_per_run) break;
    const prefix = dir ? `${dir}/` : "";
    const blobs = tree.tree.filter((n) => n.type === "blob" && n.path.startsWith(prefix) && n.size <= 1024 * 1024);
    const skillMdNode = blobs.find((n) => n.path === `${prefix}SKILL.md`);
    if (!skillMdNode) continue;
    const text = await gh(`https://raw.githubusercontent.com/${repo.full_name}/${sha}/${skillMdNode.path}`, { raw: true });
    const parsed = parseSkillMd(text);
    if ("error" in parsed || !isSkillName(parsed.name)) { stats.rejected += 1; continue; }
    const id = parsed.name;
    // Hybrid updates must use the migration/review pipeline, which retains snapshots and the Vietnamese layer.
    const hybrid = await readJson(path.join(root, 'skills', id, 'manifest.json'), null);
    if (hybrid) { console.log(`Hybrid update requires curation: ${id} at ${sha}`); continue; }
    const files = [];
    for (const n of blobs.slice(0, 200)) {
      const rel = n.path.slice(prefix.length);
      // nested skills belong to their own folder
      if (rel !== "SKILL.md" && /(^|\/)SKILL\.md$/.test(rel)) continue;
      const body = n.path === skillMdNode.path ? text : await gh(`https://raw.githubusercontent.com/${repo.full_name}/${sha}/${n.path}`, { raw: true });
      files.push({ path: rel, text: body, size: n.size });
    }
    const scan = scanSkill(files);
    const area = scan.status === "quarantined" ? "quarantine" : "skills";
    const other = area === "skills" ? "quarantine" : "skills";
    const target = path.join(root, area, id);
    const existing = await readJson(path.join(root, "skills", id, "_hub.json"), null) ?? await readJson(path.join(root, "quarantine", id, "_hub.json"), null);
    if (existing && existing.repository !== repo.full_name) continue; // first source keeps the name
    if (dry) { console.log(`[dry] ${area}/${id} ← ${repo.full_name}/${dir}`); continue; }
    await rm(path.join(root, other, id), { recursive: true, force: true });
    await rm(target, { recursive: true, force: true });
    for (const f of files) {
      const dest = path.join(target, f.path);
      if (!dest.startsWith(target + path.sep)) continue; // traversal guard
      await mkdir(path.dirname(dest), { recursive: true });
      await writeFile(dest, f.text);
    }
    await writeFile(path.join(target, "_hub.json"), JSON.stringify({
      repository: repo.full_name, commit: sha, path: dir, license: licence, stars: repo.stargazers_count, pushedAt: repo.pushed_at,
      language: "en", version: sha.slice(0, 7), last_checked: new Date().toISOString(),
    }, null, 2) + "\n");
    if (area === "quarantine") stats.quarantined += 1; else stats.added += 1;
  }
  checkpoint.repos[repo.full_name] = { pushed_at: repo.pushed_at, commit: sha };
  if (!dry) await writeFile(checkpointFile, JSON.stringify(checkpoint, null, 2) + "\n"); // resume point after a stop
}

try {
  const repos = await candidateRepos();
  for (const repo of repos) {
    stats.repos += 1;
    try { await processRepo(repo); } catch (e) { if (e.message === "rate-limited") throw e; console.log(`  ! ${repo.full_name}: ${e.message}`); }
  }
} catch (e) {
  if (e.message !== "rate-limited") throw e;
  console.log("Rate limit reached; checkpoint saved, the next run continues.");
}
console.log(JSON.stringify(stats));
