<!-- Legacy curator commentary; not execution instructions. Facts may be stale. -->

# Phân tích: teardown (elvarofficial/teardown)

## Thông tin (đo qua GitHub API ngày 12/11/2026, lần chạy 3/30)
- **Repo gốc:** https://github.com/elvarofficial/teardown
- **Sao:** 3.272 | **Ngày tạo:** 30/10/2026 | **Push gần nhất:** 31/10/2026
- **Giấy phép:** MIT | **Tác giả:** elvarofficial (xây trên whaleyxbt/claude-motion, MIT)

## Lý do chọn
- 3.272★ chỉ sau ~13 ngày — một trong các repo mới tăng nhanh nhất còn lại sau khi loại trừ các skill đã chọn.
- Ngay trên đỉnh `answer-me-with-html` (lần 1) và `stack-diagram` (lần 1): cùng dòng "trả lời bằng sản phẩm trình bày", nhưng chiều mới — giải thích **cách một cỗ máy vận hành** bằng mô phỏng 3D tháo được.
- 3 cỗ máy mẫu hoàn chỉnh (V8, càng đáp Cessna 337, Strandbeest) là tài liệu học quy trình đáng kể.

## Làm gì
Một skill duy nhất: dựng mô phỏng 3D tương tác của một cỗ máy/cơ cấu thật thành một trang HTML offline — các panel đọc số thật từ model, nút mở từng phân hệ, cắt tầng, auto-tour; rồi render film 60 fps từng khung với nhạc procedural (−14 LUFS) đồng bộ timeline.

## Điểm mạnh
- Tính đúng đắn cơ học có thật trong ví dụ: slider-crank chính xác, liên kết Jansen giải bằng giao điểm đường tròn, thứ tự bắn V8 chuẩn.
- Quy trình có vòng review vật chất: capture.mjs render review sheets để agent nhìn sản phẩm của chính mình và sửa.
- Chuẩn sản phẩm rõ ràng: một file HTML offline, không server, font/three.js nhúng.

## Điểm yếu / rủi ro
- Yêu cầu hạ tầng cục bộ (npm, Playwright chromium, ffmpeg, Python 3) — hub không tự cài, bot phải bật tay từng cái.
- Chất lượng đầu ra phụ thuộc chủ đề: cơ cấu ít tài liệu tham khảo dễ bịa số — luôn cưỡng agent tra số thật trước.
- Dự án còn rất trẻ (push 1 ngày sau tạo), chưa thấy chu kỳ bảo trì.

## Độ phù hợp với Limix Bot
Trung bình: hợp làm "visual explainer 3D" cho câu hỏi kỹ thuật của Leo; các binary phụ thuộc phải cài sẵn trong máy. Skill kèm script (npm/playwright/ffmpeg) → review-required.
