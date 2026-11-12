---
name: teardown
description: Xây mô phỏng 3D tương tác của một cỗ máy hay cơ cấu thật (động cơ, càng đáp, liên kết đi bộ, bơm, hộp số) thành một trang HTML offline có thể tháo rời — mọi bảng quanh mô hình đọc số thật từ chính model làm các chi tiết chuyển động, mỗi phân hệ một nút mở phần đang làm việc, có cắt tầng, góc máy và chuyến tham quan tự động khi không ai chạm; rồi quay lại từng khung thành video 60 fps có nhạc quy trình hóa đồng bộ trên cùng timeline. Cần Node.js 20+, ffmpeg cho video, Python 3 cho âm thanh. Dùng khi ai đó hỏi "cái máy này hoạt động thế nào", muốn visual explainer, simulator, cutaway, exploded view hoặc bài học 3D tương tác.
license: MIT
compatibility: Node.js 20+ | Playwright chromium (cài 1 lần) | ffmpeg (video) | Python 3 (âm thanh) | Claude Code và mọi agent đọc SKILL.md
version: 2026-11-12
---

# Teardown (Việt hóa)

> Nguồn gốc: https://github.com/elvarofficial/teardown — MIT. Bản gốc tiếng Anh xem `SKILL.en.md` (chép nguyên `SKILL.md` của repo gốc); phân tích chi tiết xem `PHAN-TICH.md`.

## Dùng để làm gì
Hỏi "cái này hoạt động ra sao?" — agent dựng nó thành **một trang HTML offline chạy cỗ máy ở giữa**: bấm nút thì phần đang làm việc mở ra, các bảng đồng thời đọc con số thật (không phải số trang trí), còn khi không ai chạm thì trang tự đi tham quan bằng con trỏ. Cùng bộ code quay lại film chuyến tham quan từng khung, 60 fps, có nhạc procedural dựng trên cùng timeline.

## Cài đặt / dùng thế nào
```
npx skills add elvarofficial/teardown -g -a claude-code
```
Rồi, một lần trong thư mục cài đặt:
```
npm install && npx playwright install chromium
```
Cần Node.js 20+. Video cần `ffmpeg`, âm thanh cần Python 3 (chỉ thư viện chuẩn). Đặt `FFMPEG`, `PYTHON`, `CHROMIUM` để trỏ binary khác.

Dùng bằng cách ra lệnh bằng lời thường:
> Dựng cho tôi mô phỏng động cơ xe máy 4 kỳ mà tháo được.

> Đồng hồ cơ giữ giờ thế nào? Xem như mô phỏng đi.

> Làm teardown của càng đáp thủy lực và quay video 20 giây.

Hoặc dựng một trong 3 ví dụ có sẵn:
```
node sims/build.mjs v8-live          # teardown-out/dist/v8-live.html
node sims/build.mjs cessna-live
node sims/build.mjs strandbeest-live
```

## Cấu trúc
| | |
|---|---|
| `SKILL.md` | Những gì agent đọc: cỗ máy được dựng thế nào, luật làm nó trông đúng, vòng lặp review. |
| `sims/kit/` | Runtime, stage, shader warm-up. |
| `sims/v8-*`, `sims/cessna-*`, `sims/strandbeest-*` | 3 cỗ máy hoàn chỉnh. `-shared` là máy, `-live` là trang bạn điều khiển, `-film` là bản quay. |
| `sims/build.mjs` | Gói một cỗ máy thành một file HTML, three.js và font nhúng sẵn. |
| `sims/capture.mjs` | Render film từng khung thành mp4 60 fps, hoặc ảnh review. |
| `sfx/`, `run_sfx.py` | Âm thanh procedural theo timeline phim, mastering −14 LUFS. |

## Điểm mạnh
- Mô hình vật lý/động cơ học thật trong ví dụ: V8 theo thứ tự bắn 1-8-4-3-6-5-7-2 và mô hình áp suất buồng đốt; Strandbeest giải liên kết Jansen chính xác trong 67 dòng.
- Bảng điều khiển đọc số **từ chính model chuyển động** — không phải số trang trí, nên explainer không bịa.
- Đầu ra là một file HTML offline (~800 KB) — mở được mọi nơi, không cần server.

## Điểm yếu / rủi ro
- Phải `npm install` + Playwright chromium một lần; video cần ffmpeg — bot phải có shell và các binary này.
- Mỗi cỗ máy mới là một dự án front-end đáng kể: chất lượng phụ thuộc vòng review (có review sheets render sẵn cho agent tự chấm).
- Bán hoạt tính cao (3D + film) — chỉ dùng khi yêu cầu thật sự cần mô phỏng tương tác, không chạy cho task đơn giản.

## Độ phù hợp với Limix Bot
Trung bình: rất hợp các câu hỏi "cách X hoạt động?" của Leo khi muốn explainer 3D; nhưng bot cần Playwright + ffmpeg cài sẵn để chạy trọn video. Skill kèm script (npm/playwright) → review-required.
