# Phân tích: geo-sleuth

- **Nguồn:** https://github.com/Oldcircle/geo-sleuth
- **Số sao:** 6.894 (đo ngày 2026-11-12).
- **Ngày tạo repo:** 2026-09-18 · lần push cuối 2026-11-09 · giấy phép MIT.
- **Loại skill:** text + ~20 script Python; dùng dịch vụ công khai (OSM, tile, street view, reverse search) + model ML (CLIP, DINOv2).

## Lý do chọn
- Độc nhất trong top kết quả: không phải skill tạo nội dung mà là skill **truy vết dữ liệu** — đa dạng hóa danh mục hub.
- Phương pháp "scripts rank, model judges" đúng triết lý chống ảo tưởng mà hub đánh giá cao; benchmark và case chạy mù có số đo cụ thể (±2 m, 87 m, 3 m).
- Đã xuất hiện trong cả 3 truy vấn tìm kiếm (agent skill, claude skills, topic) — đang được cộng đồng quan tâm liên tục; push 2026-11-09.

## Ước lượng theo thang điểm hub (tự đánh giá, chưa chạy thử)
- Chức năng & tài liệu: rất cao (README dài nhưng có cấu trúc, data-sources.md, benchmark theo script, hướng dẫn reproduce từng case).
- Bảo mật: cần thận trọng — gọi nhiều dịch vụ ngoài, chạy model nặng, có reverse search; tuy nhiên quy trình có `doctor.py`, chặn rõ responsible-use. **Không cài cho mục đích giám sát người khác.**
- Tương thích: 6 agent, chuẩn Agent Skill.
- Chạy thử thật: chưa chạy — review-required.
- Bảo trì: tác giả hoạt động, roadmap rõ (Lens, CI, blind-test set).

## Phù hợp Limix Bot
Chọn giữ danh mục đa dạng (không phải skill tạo nội dung). Trường hợp dùng hợp lệ: người dùng nhờ xác minh nơi chụp của ảnh chính họ. Không phù hợp tự động hóa nội bộ; xem như skill "chuyên dụng, kích hoạt có điều kiện".
