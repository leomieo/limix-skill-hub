---
name: answer-me-with-html
description: Skill trả lời câu hỏi khó bằng một trang HTML đọc được thay vì cả khối chữ — model chỉ viết nháp Markdown (khoảng 1/8 số token so với tự viết HTML), CLI đi kèm dựng trang hoàn chỉnh theo component (sequence, flow, state, er, class, api, tree, timeline, chart, annot, kv, callout, ask), có 3 theme (blueprint/shadcn/paper) sáng/tối, tự sửa lỗi nháp, nhúng code thật từ file dự án, kèm video giải thích kiểu 3b1b và chế độ always-on cho mọi kết luận.
license: MIT
compatibility: Claude Code, Codex, Cursor, OpenCode, Pi, DeepSeek Harness (bất kỳ agent nào chạy được lệnh shell; Node.js ≥ 20)
version: 2026-11-12
---

# Answer me with HTML (Việt hóa)

> Nguồn gốc: https://github.com/QingYunA/answer-me-with-html — MIT. Bản gốc tiếng Anh xem `SKILL.en.md`; phân tích chi tiết xem `PHAN-TICH.md`.

## Dùng để làm gì
Bạn hỏi khó, agent trả lời bằng **một trang HTML đọc được** thay vì "tường chữ":
- "Giải thích TCP three-way handshake" → diagram tuần tự + state diagram + bảng cờ.
- "Các module trong repo này ghép với nhau thế nào?" → cây thư mục + đồ thị gọi hàm.
- "Redis hay Memcached?" → bảng so sánh ✓/✗ rồi kết luận.

Điểm mấu chốt: **model chỉ viết nháp Markdown** (trung bình 612 token thay vì 4.893 token HTML tự viết — tiết kiệm ~8×, nhanh hơn 2,6× trong benchmark của repo). CLI xử lý toàn bộ phần còn lại: template, sắp panel, theme, vẽ flow bằng dagre, giãn sequence theo độ rộng nhãn.

## Cài đặt
- Yêu cầu Node.js ≥ 20, không cần `npm install` (CLI nằm sẵn trong skill).
```bash
npx skills add QingYunA/answer-me-with-html
# hoặc plugin trong Claude Code:
/plugin marketplace add QingYunA/answer-me-with-html
/plugin install answer-me-with-html@answer-me-with-html
```
- Cài thủ công: copy `skills/answer-me-with-html` vào `~/.claude/skills/` (Claude Code), `~/.codex/skills/` (Codex), `~/.cursor/skills/` (Cursor), `~/.config/opencode/skill/` (OpenCode).

## Cách dùng
Hỏi như bình thường; agent tự quyết khi nào đáng ra trang (nhiều khái niệm liên quan, luồng nhiều bước, so sánh nhiều phương án). Câu hỏi 1 dòng thì vẫn trả lời 1 dòng.

**Component chọn theo hình dạng thông tin:**
| Component | Dùng cho |
|---|---|
| `flow` | Kiến trúc, chuỗi gọi hàm, nhánh quyết định (tự canh layout) |
| `state` | Máy trạng thái |
| `er` / `class` | Mô hình dữ liệu / UML |
| `api` | Hợp đồng HTTP/RPC: tham số, trường, mã trạng thái |
| `sequence` | Đối thoại qua lại giữa nhiều bên theo thời gian |
| `tree` / `timeline` | Cấu trúc thư mục, phân loại / lịch sử, giai đoạn |
| `chart` | Cột, đường, tròn từ bảng số |
| `annot` | Chú thích từng từ trong câu |
| `ask` | Quyết định bạn chọn ngay trên trang (không có gì được chọn sẵn) |
| Code block | Code **thật** trích từ file dự án (`src=` `lines=`) — từ chối file ngoài thư mục và file chứa key |

**Tính năng đáng chú ý:** tự sửa lỗi nháp (CLI trả về số dòng + ví dụ đúng), 3 theme (blueprint / shadcn / paper, sáng+tối), mỗi trang là 1 file `.html` **không CDN, không web font** — mở offline được, nhúng lại Markdown nguồn, kiểm tra văn phong theo ASD-STE100 (chỉ cảnh báo), chế độ **always-on** (mọi kết luận/plans/so sánh đều kèm trang nhỏ 2–4 panel, không mở cửa sổ).

**Video giải thích:** "make a 3b1b-style video on the TCP handshake" → `am video` dựng player theo nháp có lời bình luận từng beat, có dải chương, nút tốc độ, xuất video ngay trong trình duyệt (`--webm` không cần ffmpeg, `--mp4` cần ffmpeg). Tiết kiệm ~18× token so với viết tay.

## Cài đặt cấu hình
`/answer-me-with-html config open off` (hoặc `am config set ...`): tùy `open`, `theme`, `mode`, `style`, `scale`, `voice`... Trang lưu ở `~/.answer-me-with-html/pages/`, dọn bằng `am clean`.

## Điểm mạnh
- Tốc độ + chi phí: ít token hơn hẳn, câu trả lời khó trở thành tài liệu đọc được, dễ chia sẻ (1 file HTML độc lập).
- Layout tính bằng code — không còn mũi tên trỏ vào hư không, nhãn bị cắt.
- Có phân tích so sánh với Archify/GenUI; benchmark token được công khai (`bench/corpus/`).
- Hoạt động với ~70 agent qua installer, có bản plugin Claude Code.

## Điểm yếu
- Cần Node.js ≥ 20 ở máy chạy agent.
- Phần video 3b1b phụ thuộc TTS hệ thống/chrome; e2e video test cần ffmpeg.
- Bảng tiếng Việt: nút và font chỉ tối ưu cho Tiếng Trung, Anh, Nhật — tiếng Việt dùng nút tiếng Anh.

## Phù hợp với Limix Bot
Rất phù hợp: Limix Bot thường phải giải thích kỹ thuật, so sánh phương án, báo cáo phân tích — skill này biến các trả lời đó thành trang HTML đẹp, giá rẻ, nhúng được vào chat/tệp đính kèm. Chế độ always-on phù hợp "Answer-first" của Limix Bot nhưng nên tắt `open` để không mở cửa sổ đột ngột. Skill này **nền tảng tốt cho dạng báo cáo HTML** của bot.

## An toàn
Kèm CLI script (Node, bundle 2 dependency marked + dagre chạy cục bộ); không gọi API trả phí; code trích từ file có chặn file chứa key. Theo quy tắc hub: **kèm tool → review-required**.
