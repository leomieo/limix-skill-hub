---
name: anatomy
description: Skill tạo hình minh họa đẳng trục (isometric) tương tác để giải thích một ý tưởng kỹ thuật: agent "phát minh" một vật thể cơ khí mà cơ chế hoạt động của nó chính là khái niệm cần giải thích, dựng hàng chục chi tiết nhỏ bằng SVG + WebGL (tùy chọn 3D beta), đóng khung thẻ có tiêu đề, số liệu trực tiếp và chuyển động mượt theo con trỏ/bàn phím, rồi tự kiểm tra hình bằng audit hình học và ảnh chụp headless Chrome. Xuất HTML độc lập, SVG đơn hoặc component React/Next.js.
license: MIT
compatibility: Claude Code, Antigravity, OpenCode, Codex, MiniMax Code (định dạng Agent Skill chuẩn SKILL.md)
version: 2026-11-12
---

# Anatomy (Việt hóa)

> Nguồn gốc: https://github.com/wheresryan22/anatomy — MIT © 2026 Ryan. Bản gốc tiếng Anh xem `SKILL.en.md` trong thư mục này; phân tích chi tiết xem `PHAN-TICH.md`.

## Dùng để làm gì
Giải thích một ý tưởng kỹ thuật bằng cách **xây nó thành một vật thể thật, chạy được**: cache key trở thành ổ khóa chốt chốt chỉ xoay khi mọi chốt khớp; một GPU context phục vụ nhiều canvas trở thành giàn in 1 đầu in ghé thăm 16 giếng. Kết quả là hình đẳng trục (isometric) gồm nhiều chi tiết nhỏ vững vàng, tô bóng bốn tông, đặt trong thẻ có tiêu đề, gợi ý và chỉ số đọc trực tiếp, chuyển động nhẹ nhàng theo con trỏ và bàn phím.

Ba loại hình (dùng chung một kit, một camera, một bộ luật craft):
| Loại | Là gì |
|---|---|
| **SVG** | Cốt lõi. Chi tiết đẳng trục đặc, tô 4 tông, vẽ từ sau ra trước, trong thẻ có số liệu trực tiếp. Xuất HTML độc lập, `.svg` nhúng CSS, hoặc React/Next.js. |
| **SVG + WebGL** | Cho thứ nét vẽ không thể: lửa, khí xả, nước, caustics, đèn, glow, hơi nước. Shader chạy trong canvas xen giữa SVG sau và SVG trước, cùng camera đẳng trục. |
| **3D (beta)** | Chi tiết xoay thật 3D: số xoay, ngón tay gập, mảnh rơi tự do. Phần còn lại là nghệ tĩnh. |

## Cài đặt
```sh
npx skills add wheresryan22/anatomy -g
# hoặc -a claude-code / -a antigravity / -a opencode / -a codex / -a minimax-code
```
- Cài vào `~/.claude/skills/anatomy` (Claude Code), `~/.config/opencode/skills/anatomy` (OpenCode), `~/.agents/skills/anatomy` (Codex), v.v. Hoặc `git clone` repo thẳng vào thư mục skill.
- Yêu cầu: Node.js ≥ 20.10 (chỉ dùng module dựng sẵn, **0 dependency**), Chrome/Chromium cho phần tự kiểm tra (headless, tìm ở đường dẫn chuẩn hoặc đặt `CHROME_PATH`). React 18+ chỉ cần cho đầu ra React.

## Cách dùng
```text
/anatomy explain how a token bucket rate limiter works, interactive
```
- Không cần gọi tên skill: hỏi về "hình minh họa isometric", "figure giải thích cho docs/blog/landing page" là agent tự kích hoạt. Codex dùng `$anatomy`.
- 3 thói quen cho hình tốt: (1) **nói ý tưởng, không mô tả bản vẽ**, kèm số liệu thật (kích thước, số lượng, tốc độ, ngưỡng); (2) hoặc gọi tên vật thể nếu đã biết (máy pha espresso, đèn Bunsen, ổ khóa) và nói cái gì chuyển động; (3) nói hình sống ở đâu (HTML / SVG / React, sáng hay tối).
- Có thể yêu cầu bản in: `node scripts/print.mjs sheet.mjs --format all` viết PDF A4 (poster, bản vẽ kỹ thuật, explainer 2 trang).

## Quy trình nội bộ của skill
1. Thu thập số liệu thật → 2. phát minh vật thể → 3. liệt kê parts → 4. dựng hình học một lần bằng kit → 5. tô từ sau ra trước → 6. đóng khung → 7. làm sống động → 8. **tự kiểm tra như một nhà phê bình**: audit hình học (`build.mjs --audit`: không gì xuyên qua gì, mọi đầu gắn đúng chỗ, chồng lấn đúng thứ tự sâu), chụp headless Chrome (`capture.mjs`, `drive.mjs`), kiểm tra đường nét đứt lơ lửng (`lines.mjs`), kiểm tra 3D (`turn-check.mjs`). Agent phải đọc mọi PNG nó tạo ra.

## Điểm mạnh
- Chất lượng hình rất cao, có hệ thống kiểm chứng riêng (audit + capture + contact sheet) — hiếm skill minh họa nào có vòng tự kiểm tra thật.
- Không dependency, không cần API key; kit Node dựng sẵn.
- Hỗ trợ 5 agent CLI (Claude Code, Antigravity, OpenCode, Codex, MiniMax Code) bằng chuẩn Agent Skill.
- Có examples hoàn chỉnh trong repo, trang web gallery cộng đồng, xuất poster PDF.

## Điểm yếu
- Chậm một cách có chủ đích: một figure là cả một session dài (dựng parts, audit, chụp cận cảnh 2 theme). Build Raptor mất vài phút; audit 3D 15–20 phút cho 30 parts.
- Không phải thư viện biểu đồ: không có trục, series, plot dữ liệu.
- Chỉ vẽ máy móc, dụng cụ, đồ nội thất — không vẽ người, không bản đồ chính xác; ý tưởng không có "cơ chế" sẽ ra hình yếu.
- Mode 3D còn beta; shader cần WebGL (không có WebGL thì SVG vẫn đọc được).

## Phù hợp với Limix Bot
Khá phù hợp khi cần **giải thích khái niệm kỹ thuật bằng hình tương tác** cho tài liệu, báo cáo, trang explainer (chung hướng với skill `answer-me-with-html` trong hub). Không phù hợp cho trả lời nhanh hay phân tích số — đúng hơn là "vũ khí kể chuyện" cho sản phẩm nội dung. Lưu ý thời gian build dài, nên dùng trong task riêng một thread, không trộn vào chat thường.

## An toàn
Skill thuần hướng dẫn + kèm script Node chạy cục bộ (build/audit/capture). Script chỉ dựng HTML/SVG/PDF, không gọi dịch vụ ngoài khi build; phần kiểm tra tự chạy headless Chrome cục bộ. Theo quy tắc hub: **kèm tool → trạng thái review, chủ bot duyệt trước khi bật**.
