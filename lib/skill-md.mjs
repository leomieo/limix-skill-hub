// SKILL.md reading, the same rules as Limix Bot (shared/skill-md.ts): name = lowercase words joined by single hyphens,
// at most 64 characters; description required, at most 1024 characters. Not a YAML engine on purpose.
export const SKILL_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const DESCRIPTION_MAX = 1024;
export const SKILL_FILE_MAX_BYTES = 256 * 1024;

export const isSkillName = (name) => typeof name === "string" && name.length >= 1 && name.length <= 64 && SKILL_NAME.test(name);

function unquote(raw) {
  const v = raw.trim();
  if (v.length >= 2 && v[0] === '"' && v.at(-1) === '"') return v.slice(1, -1).replace(/\\(["\\n])/g, (_, c) => (c === "n" ? "\n" : c));
  if (v.length >= 2 && v[0] === "'" && v.at(-1) === "'") return v.slice(1, -1).replace(/''/g, "'");
  return v;
}

export function readFrontmatter(raw) {
  if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return null;
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (kv) fields[kv[1].toLowerCase()] = unquote(kv[2]);
  }
  return { fields, frontmatter: match[1], body: match[2] ?? "" };
}

export function parseSkillMd(raw) {
  const fm = readFrontmatter(raw);
  if (!fm) return { error: "SKILL.md không có khối YAML frontmatter (---) ở đầu" };
  const name = fm.fields.name ?? "";
  const description = fm.fields.description ?? "";
  if (!isSkillName(name)) return { error: `tên kỹ năng ${JSON.stringify(name)} không hợp lệ` };
  if (!description || description.length > DESCRIPTION_MAX) return { error: "thiếu description hoặc dài quá 1024 ký tự" };
  return { name, description, license: fm.fields.license || undefined, compatibility: fm.fields.compatibility || undefined, version: fm.fields.version || undefined, body: fm.body, frontmatter: fm.frontmatter };
}

/** A valid skill id from any text: "My Skill!" -> "my-skill". */
export function slug(text) {
  return String(text).toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 64).replace(/-+$/, "") || "skill";
}
