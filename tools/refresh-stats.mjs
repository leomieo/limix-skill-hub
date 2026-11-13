#!/usr/bin/env node
// Refreshes source facts for every skill folder: repository, stars, creation and last push dates (GitHub API).
// The repository comes from _hub.json, else from the first github.com/<owner>/<repo> link in PHAN-TICH.md,
// SKILL.en.md or SKILL.md. Writes only _hub.json; never touches the skill's own files.
//   GITHUB_TOKEN=... node tools/refresh-stats.mjs [--root <dir>]
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const root = args.includes("--root") ? path.resolve(args[args.indexOf("--root") + 1]) : fileURLToPath(new URL("..", import.meta.url));
const token = process.env.GITHUB_TOKEN ?? "";
const readText = (file) => readFile(file, "utf8").catch(() => "");
const REPO_LINK = /github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+?)(?:\.git)?(?=[\s)\]"'#/?]|$)/;

let updated = 0;
let failed = 0;
for (const area of ["skills", "quarantine"]) {
  let ids = [];
  try { ids = (await readdir(path.join(root, area), { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name); } catch { continue; }
  for (const id of ids) {
    const dir = path.join(root, area, id);
    const metaFile = path.join(dir, "_hub.json");
    let meta = {};
    try { meta = JSON.parse(await readText(metaFile) || "{}"); } catch { meta = {}; }
    let repo = meta.repository;
    if (!repo) {
      for (const name of ["PHAN-TICH.md", "SKILL.en.md", "SKILL.md"]) {
        const match = REPO_LINK.exec(await readText(path.join(dir, name)));
        if (match) { repo = `${match[1]}/${match[2]}`; break; }
      }
    }
    if (!repo) continue;
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { "User-Agent": "limix-skill-hub", Accept: "application/vnd.github+json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    });
    if (!res.ok) { failed += 1; console.log(`  ! ${id}: ${repo} ${res.status}`); continue; }
    const data = await res.json();
    const next = {
      ...meta,
      repository: data.full_name,
      stars: data.stargazers_count,
      createdAt: data.created_at,
      pushedAt: data.pushed_at,
      statsCheckedAt: new Date().toISOString().slice(0, 10),
      ...(meta.license ? {} : data.license?.spdx_id && data.license.spdx_id !== "NOASSERTION" ? { license: data.license.spdx_id } : {}),
    };
    await writeFile(metaFile, JSON.stringify(next, null, 2) + "\n");
    updated += 1;
  }
}
console.log(`stats: ${updated} updated, ${failed} failed`);
