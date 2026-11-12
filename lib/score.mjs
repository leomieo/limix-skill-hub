// 100-point score. Static part is computed here; "tested" and "localization" come from the curator bot (review.json)
// and default to 0 until a real run / translation exists. Nothing is invented: missing evidence scores zero.
//   25 function + docs · 25 security/permissions · 20 compatibility · 15 real testing · 10 maintenance/provenance · 5 localization

export const GRADES = [
  { min: 90, id: "excellent", label: "Xuất sắc" },
  { min: 80, id: "recommended", label: "Khuyên dùng" },
  { min: 65, id: "review", label: "Cần xem xét" },
  { min: 0, id: "rejected", label: "Từ chối" },
];

const OPEN_LICENSES = /^(mit|apache-2\.0|bsd-[23]-clause|isc|mpl-2\.0|cc0-1\.0|unlicense|cc-by-4\.0)$/i;

export function scoreSkill({ parsed, scan, classification, meta = {}, review = {} }) {
  const parts = {};
  const notes = [];

  // 1. Function + docs (25)
  let fn = 0;
  const desc = parsed.description ?? "";
  if (desc.length >= 40) fn += 8; else if (desc.length >= 15) fn += 4;
  if (/\b(use when|when to use|khi nào|dùng khi|trigger)/i.test(desc + parsed.body)) fn += 4;
  const bodyLen = parsed.body.trim().length;
  if (bodyLen >= 800) fn += 8; else if (bodyLen >= 300) fn += 5; else if (bodyLen >= 80) fn += 2;
  if (/^#{1,3}\s/m.test(parsed.body)) fn += 3;
  if (/```/.test(parsed.body)) fn += 2;
  parts.function = Math.min(25, fn);

  // 2. Security + permissions (25)
  let sec = 25 - scan.high * 25 - scan.medium * 6;
  if (classification.kind === "skill-with-tools") sec -= 4;
  if (classification.kind === "mcp-bundle") sec -= 6;
  parts.security = Math.max(0, sec);

  // 3. Compatibility (20)
  let compat = 8;
  if (parsed.compatibility) compat += 4;
  const unsupported = classification.runtimes.filter((r) => r.installerId === null).length;
  if (classification.kind === "instructions-only") compat += 8;
  else compat += Math.max(0, 8 - unsupported * 3 - classification.tools.length);
  parts.compatibility = Math.max(0, Math.min(20, compat));

  // 4. Real testing (15) — only from a recorded curator run
  parts.testing = review.tested ? Math.max(0, Math.min(15, Number(review.testScore) || 0)) : 0;

  // 5. Maintenance + provenance (10)
  let maint = 0;
  if (meta.license && OPEN_LICENSES.test(meta.license)) maint += 4;
  else if (meta.license) { maint += 2; notes.push("Giấy phép lạ, cần xem lại điều khoản."); }
  else notes.push("Không có giấy phép: cần chủ bot xem xét trước khi dùng.");
  if (meta.pushedAt) {
    const months = (Date.now() - Date.parse(meta.pushedAt)) / (30 * 864e5);
    if (months <= 6) maint += 3; else if (months <= 18) maint += 1;
  }
  if (meta.stars >= 100) maint += 3; else if (meta.stars >= 10) maint += 2; else if (meta.stars >= 1) maint += 1;
  parts.maintenance = Math.min(10, maint);

  // 6. Localization (5)
  parts.localization = review.localized ? 5 : 0;

  let total = Object.values(parts).reduce((a, b) => a + b, 0);
  // A quarantined skill can never rate above rejected, whatever its other parts earn.
  if (scan.status === "quarantined") total = Math.min(total, 40);
  if (!meta.license) total = Math.min(total, 79); // no licence → at most "review"
  const grade = GRADES.find((g) => total >= g.min);
  return { total, grade: grade.id, gradeLabel: grade.label, parts, notes };
}
