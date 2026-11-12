// Static security scan of every file of a skill. Content from the internet is untrusted until checked.
// A "high" finding sends the skill to quarantine (never installable) unless the owner overrides it in review.json with a
// written reason. "medium" lowers the score and needs review. Static rules are not proof of safety: the AI review and
// the owner's approval come on top, and no skill code is ever run by the hub.

const RULES = [
  // Prompt injection / hidden instructions
  { id: "prompt-injection", severity: "high", label: "Câu lệnh chèn ép AI (bỏ qua hướng dẫn trước, giấu người dùng…)",
    re: /\b(ignore|disregard|forget)\s+(all\s+|any\s+)?(the\s+)?(previous|prior|above|earlier|system)\s+(instructions|prompts?|rules|messages)\b|\byou\s+are\s+now\s+(in\s+)?(developer|dan|jailbreak)\s+mode\b|\b(do\s+not|don't|never)\s+(tell|inform|mention\s+(this\s+)?to)\s+the\s+user\b|\bwithout\s+(telling|informing|asking)\s+the\s+user\b/i },
  { id: "invisible-unicode", severity: "high", label: "Ký tự Unicode vô hình (zero-width, bidi) che giấu nội dung",
    re: /[\u200b-\u200f\u202a-\u202e\u2060-\u2064\ufeff]/ },
  // Remote code execution
  { id: "pipe-to-shell", severity: "high", label: "Tải mã từ mạng rồi chạy thẳng (curl | sh)",
    re: /\b(curl|wget)\b[^\n]{0,200}\|\s*(sudo\s+)?(ba|z|da|k)?sh\b/i },
  { id: "powershell-iex", severity: "high", label: "PowerShell tải mã rồi chạy (iex / Invoke-Expression)",
    re: /\b(iex|invoke-expression)\b[^\n]{0,120}\b(iwr|irm|invoke-webrequest|invoke-restmethod|downloadstring|new-object\s+net\.webclient)\b|\b(iwr|irm|invoke-webrequest|invoke-restmethod)\b[^\n]{0,200}\|\s*(iex|invoke-expression)\b|powershell(\.exe)?\s+[^\n]{0,40}-e(nc|ncodedcommand)?\s+[A-Za-z0-9+/=]{20,}/i },
  { id: "decode-and-run", severity: "high", label: "Giải mã base64 rồi chạy",
    re: /base64\s+(-d|--decode)[^\n]{0,80}\|\s*(ba|z)?sh\b|eval\s*\(\s*(atob|Buffer\.from)\s*\(|exec\s*\(\s*(base64\.b64decode|codecs\.decode)\s*\(/i },
  { id: "reverse-shell", severity: "high", label: "Mở cửa hậu điều khiển từ xa (reverse shell)",
    re: /\/dev\/tcp\/|\bnc(at)?\s+(-\w+\s+)*-e\s|\bbash\s+-i\s+>&|socket\.socket\([^)]*\)[\s\S]{0,200}subprocess|\bmkfifo\b[^\n]{0,80}\bnc\b/i },
  { id: "miner", severity: "high", label: "Dấu hiệu đào tiền ảo", re: /\bxmrig\b|stratum\+tcp:\/\/|\bcryptonight\b/i },
  // Destruction
  { id: "destructive", severity: "high", label: "Lệnh xóa/phá dữ liệu diện rộng",
    re: /\brm\s+-[a-z]*r[a-z]*f?[a-z]*\s+(--no-preserve-root\s+)?(\/|~|\$HOME|\/\*)(\s|$)|\bmkfs(\.\w+)?\s+\/dev\/|\bdd\s+[^\n]*of=\/dev\/(sd|nvme|hd)|\bformat\s+[a-z]:\s*\/[qy]|\b(del|erase)\s+\/[sq]\s+\/[sq]\s+[a-z]:\\(\s|$)|Remove-Item\s+[^\n]*-Recurse[^\n]*\s(C:\\|\$env:USERPROFILE)(\s|$)/i },
  // Credential theft / exfiltration
  { id: "credential-files", severity: "high", label: "Đọc file chứa mật khẩu/khóa (SSH, cookie trình duyệt, AWS…)",
    re: /~\/\.ssh\/id_|\.ssh[\\/]+id_(rsa|ed25519|ecdsa)|\.aws[\\/]+credentials|\.netrc\b|Login\s+Data|[\\/]Cookies\b[^\n]{0,40}(sqlite|chrome|edge)|Local\s+State[^\n]{0,60}encrypted_key|security\s+find-(generic|internet)-password|\.git-credentials|wallet\.dat/i },
  { id: "secret-exfiltration", severity: "high", label: "Gửi biến môi trường/khóa bí mật ra ngoài",
    re: /(curl|wget|fetch|axios|requests\.(post|get|put)|Invoke-(WebRequest|RestMethod)|http\.request)[^\n]{0,200}(\$\{?[A-Z_]*(API_KEY|TOKEN|SECRET|PASSWORD)\b|os\.environ|process\.env|\$env:[A-Z_]*(KEY|TOKEN|SECRET))|\b(env|printenv|set)\b\s*\|\s*(curl|nc|wget)\b/i },
  // Medium: obfuscation and risky setup
  { id: "base64-blob", severity: "medium", label: "Chuỗi base64 rất dài (có thể giấu nội dung)", re: /[A-Za-z0-9+/]{200,}={0,2}/ },
  { id: "hex-obfuscation", severity: "medium", label: "Mã bị làm rối (chuỗi \\x.. hoặc fromCharCode dài)", re: /(\\x[0-9a-f]{2}){24,}|String\.fromCharCode\((\s*\d+\s*,){20,}/i },
  { id: "install-hook", severity: "medium", label: "Tự chạy lệnh khi cài gói (preinstall/postinstall, cmdclass)", re: /"(pre|post)?install"\s*:\s*"[^"]+"|cmdclass\s*=\s*\{[^}]*install/i },
  { id: "privilege", severity: "medium", label: "Đòi quyền quản trị hoặc tắt bảo vệ hệ thống", re: /\bsudo\s+(?!-v\b)|chmod\s+(-R\s+)?777\b|Set-MpPreference\s+-Disable|reg(\.exe)?\s+add\s+HKLM|Start-Process[^\n]{0,80}-Verb\s+RunAs|setenforce\s+0/i },
  { id: "exe-download", severity: "medium", label: "Tải file chạy được (.exe/.ps1/.sh/.msi) từ mạng", re: /https?:\/\/[^\s"')]+\.(exe|msi|ps1|bat|cmd|scr|sh|dll)(\?[^\s"')]*)?(?=[\s"')]|$)/i },
];

const BINARY_EXT = /\.(exe|dll|so|dylib|bin|jar|class|pyc|scr|msi|com|apk|dex|node|wasm)$/i;

/** files: [{ path, text?, binary?, size }] → { status, findings, high, medium } */
export function scanSkill(files) {
  const findings = [];
  for (const file of files) {
    if (file.binary || BINARY_EXT.test(file.path)) {
      findings.push({ rule: "binary-file", severity: BINARY_EXT.test(file.path) ? "medium" : "low", label: "Có file nhị phân/chạy được trong kỹ năng", file: file.path });
      continue;
    }
    const text = file.text ?? "";
    for (const rule of RULES) {
      const match = rule.re.exec(text);
      if (!match) continue;
      const line = text.slice(0, match.index).split("\n").length;
      findings.push({ rule: rule.id, severity: rule.severity, label: rule.label, file: file.path, line, excerpt: excerptOf(text, match.index) });
    }
  }
  const high = findings.filter((f) => f.severity === "high").length;
  const medium = findings.filter((f) => f.severity === "medium").length;
  return { status: high ? "quarantined" : medium ? "warning" : "clean", high, medium, findings };
}

function excerptOf(text, index) {
  const start = text.lastIndexOf("\n", index) + 1;
  const end = text.indexOf("\n", index);
  // Never echo invisible characters or long blobs back into reports.
  return text.slice(start, end === -1 ? undefined : end).replace(/[\u200b-\u200f\u202a-\u202e\u2060-\u2064\ufeff]/g, "�").slice(0, 160);
}

export const SECURITY_RULES = RULES.map(({ id, severity, label }) => ({ id, severity, label }));
