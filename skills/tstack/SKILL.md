---
name: tstack
description: Bộ skill làm việc với pull request hằng ngày của Theo (T3) — "full send" đưa một thay đổi đến PR được merge không cần ai trông; "council" lấy review từ 3 model của 3 nhà cung cấp khác nhau và lặp đến khi cả ba đồng ý; "sol loop" review vòng lặp hai agent; "file a PR" viết PR ngắn mở đầu bằng vấn đề; "takeover" nhận tiếp PR/branch/thread của người khác và giữ credit; "babysit" trông PR xuyên qua CI và review bot rồi sửa finding thật; "modernize" rebase PR cũ và quyết định nó còn đáng sống không. Chạy trong Claude Code và Codex; cần `gh` đã đăng nhập và python3. Dùng khi người dùng nói "full send", "council", "file a PR", "babysit", "take over", "modernize".
license: MIT
compatibility: Claude Code và Codex | cần GitHub CLI (`gh`) đã xác thực | python3 cho script `pr-wait` | council/sol-loop cần harness chạy subagent model khác nhà cung cấp
version: 2026-11-12
---

# Tstack (Việt hóa)

> Nguồn gốc: https://github.com/t3dotgg/tstack — MIT. Bản gốc tiếng Anh xem `SKILL.en.md` (trích nguyên `skills/full-send/SKILL.md`, skill lõi của bộ); phân tích chi tiết xem `PHAN-TICH.md`.

## Dùng để làm gì
Những skill Theo (t3dotgg — T3 Chat/t3 Code) dùng mỗi ngày, dọn sạch cho ai cũng dùng được. Toàn bộ xoay một công việc: **đưa thay đổi đi hết đường từ code đến merge mà không cần ai trông chừng**, cùng các bước phụ quanh nó (viết PR tử tế, review đa model, nhận tiếp việc của người khác).

## Cài đặt / dùng thế nào
```bash
git clone https://github.com/t3dotgg/tstack
cp -R tstack/skills/* ~/.claude/skills/   # Claude Code
cp -R tstack/skills/* ~/.codex/skills/    # Codex
```

## Bộ 9 skill
| Skill | Nói | Làm gì |
|---|---|---|
| `full-send` | "full send" | Đưa một thay đổi đến PR được merge không ai trông: chứng minh, review, file, trông CI, merge. |
| `full-stop` | "full stop" | Như `full-send` nhưng dừng khi PR sẵn sàng cho bạn merge. |
| `council` | "council" | Lấy review từ 3 model của 3 nhà cung cấp khác nhau, lặp đến khi họ đồng ý. |
| `sol-loop` | "sol loop" | Review một thay đổi với GPT Sol trong vòng lặp đến khi hai agent thống nhất. |
| `file-pr` | "file a PR" | Viết PR ngắn mở đầu bằng vấn đề, không phải danh mục thay đổi. |
| `takeover` | "take over" | Nhận tiếp PR/branch/thread agent của người khác và giữ credit của họ. |
| `babysit-pr` | "babysit" | Trông PR xuyên qua CI và review bot, sửa các finding thật. |
| `modernize` | "modernize" | Rebase PR cũ và quyết định nó còn nên tồn tại không. |
| `leaving-pr-comments` | (tự động) | Định dạng comment mà agent đăng thay bạn. |

Một số skill gọi skill khác — cài đủ những cái chúng cần:
- `full-send` dùng `sol-loop`, `file-pr` và `babysit-pr`.
- `full-stop` dùng `full-send`.
- `takeover` dùng `modernize`, `file-pr`, `babysit-pr` và `leaving-pr-comments`.
- `file-pr`, `babysit-pr` và `modernize` dùng `leaving-pr-comments`.

## Yêu cầu
- GitHub CLI (`gh`) đã xác thực.
- `python3` cho script `pr-wait` của `babysit-pr`.
- `council` và `sol-loop` cần subagent trên model của nhà cung cấp khác. T3 Code làm điều này bằng `delegate_task`; nếu không, bạn cần harness nào đó chạy được các model đó.

## Điểm mạnh
- Từ một người dùng nặng thật (tác giả T3 Chat) — quy trình đã lọc qua hàng nghìn PR thực, không phải lý thuyết.
- `council` = review đa nhà cung cấp lặp đến đồng thuận: một trong những cách chống "agent tự khen mình" tốt và đơn giản nhất.
- Văn phong rõ ràng: "PR dẫn bằng vấn đề, không phải danh mục thay đổi".

## Điểm yếu / rủi ro
- `full-send` merge PR **không chờ người duyệt** — tuyệt đối chỉ dùng cho thay đổi rủi ro thấp của riêng bạn; theo quy tắc hub phải review-required trước khi bật tự động.
- `council`/`sol-loop` cần tài khoản/thông tin các model khác (OpenAI v.v.) — ở bot khác cần cấu hình thêm.
- Dựa vào `gh` — bot cần quyền shell + gh đã đăng nhập.

## Độ phù hợp với Limix Bot
Trung bình-cao: `file-pr`, `babysit-pr`, `council` dùng được trực tiếp cho các task repo của Leo (kể cả hub này); `full-send` giữ chế độ có người duyệt. Skill kèm script (`pr-wait`) → review-required.
