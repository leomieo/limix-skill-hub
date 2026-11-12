# Phân tích: stack-diagram

- **Nguồn:** https://github.com/caru-ini/stack-diagram
- **Số sao:** 2.435 (đo ngày 2026-11-12).
- **Ngày tạo repo:** 2026-11-01 · lần push cuối 2026-11-12 (đang cập nhật trong ngày) · giấy phép MIT.
- **Loại skill:** text + script Python cục bộ; tải logo từ nguồn công khai.

## Lý do chọn
- Repo **mới nhất** trong lần chọn hôm nay (tạo đúng đầu tháng 11/2026) nhưng đã ~2.4k★ sau 11 ngày — đà tăng rất nhanh.
- Đúng nhu cầu của Limix Bot: diễn giải kiến trúc hệ thống multi-agent (Agent Desktop, Windows-MCP, MCP servers) thành sơ đồ có logo chính hãng, dùng cho wiki/thuyết trình.
- Có cơ chế an toàn rõ (không recolor logo, gallery cần đồng ý kép, prompt không bị gửi).

## Ước lượng theo thang điểm hub (tự đánh giá, chưa chạy thử)
- Chức năng & tài liệu: tốt (README với nhiều ví dụ AWS/GCP/Azure/tooling/AI, dark+light).
- Bảo mật: khá — script cục bộ; phụ thuộc tải logo qua mạng từ nguồn công khai.
- Tương thích: chuẩn Agent Skill, đa agent; cần Python ≥ 3.9.
- Chạy thử thật: chưa chạy — review-required.
- Bảo trì: push hôm nay, có release, có site gallery riêng.

## Phù hợp Limix Bot
Dùng cho tài liệu kiến trúc, sơ đồ thuyết minh trong báo cáo, README dự án. Lưu ý mạng + Playwright chỉ cần khi xuất PNG; bản HTML tự chứa là mặc định nhẹ nhất. Không dùng chức năng gallery khi sơ đồ chứa stack nội bộ.
