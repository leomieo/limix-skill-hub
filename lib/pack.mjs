import { createHash } from "node:crypto";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

export const sha256 = (data) => createHash("sha256").update(data).digest("hex");

const TEXT_EXT = /\.(md|mdx|txt|json|ya?ml|toml|py|js|mjs|cjs|ts|sh|bash|zsh|ps1|bat|cmd|rb|pl|php|go|rs|html|css|csv|xml|ini|cfg)$/i;
const MAX_FILES = 200;
const MAX_TOTAL = 8 * 1024 * 1024;

/** Reads a skill folder → [{ path, size, sha256, text?, binary }] (sorted, posix paths; never follows links out). */
export async function readSkillDir(dir) {
  const out = [];
  let total = 0;
  async function walk(rel) {
    for (const entry of await readdir(path.join(dir, rel), { withFileTypes: true })) {
      if (entry.name === ".git" || entry.name.startsWith("_hub")) continue;
      const relPath = rel ? `${rel}/${entry.name}` : entry.name;
      if (entry.isSymbolicLink()) continue;
      if (entry.isDirectory()) { await walk(relPath); continue; }
      if (!entry.isFile()) continue;
      if (out.length >= MAX_FILES) throw new Error(`Skill has more than ${MAX_FILES} files`);
      const full = path.join(dir, relPath);
      const size = (await stat(full)).size;
      total += size;
      if (total > MAX_TOTAL) throw new Error("Skill is larger than 8 MB");
      const buf = await readFile(full);
      const binary = !TEXT_EXT.test(entry.name) || buf.includes(0);
      out.push({ path: relPath, size, sha256: sha256(buf), binary, text: binary ? undefined : buf.toString("utf8") });
    }
  }
  await walk("");
  return out.sort((a, b) => (a.path < b.path ? -1 : 1));
}

/** One digest for the whole folder: what the app pins and re-checks after download. */
export function folderChecksum(files) {
  return sha256(files.map((f) => `${f.path}\0${f.sha256}\n`).join(""));
}
