# Phân tích: unslop

- **Nguồn:** https://github.com/heydamir/unslop
- **Số sao:** 14.847 (đo ngày 2026-11-12) — xếp nhì về tăng trưởng trong nhóm skill UI.
- **Ngày tạo repo:** 2026-10-29 · lần push cuối 2026-11-08 · giấy phép CC BY 4.0.
- **Loại skill:** chủ yếu là hướng dẫn văn bản; phụ tùy chọn Playwright/ffmpeg (chụp màn hình, story video).

## Lý do chọn
- Cực mới (chưa đầy 2 tuần) mà đã ~14.8k★, push cập nhật tuần vừa rồi — đúng tiêu chí "tăng độ quan tâm nhanh".
- Giải bài toán phổ quát của mọi bot lập trình UI: output nhìn như AI. Có skill này, Limix Bot có thể tự "duyệt thẩm mỹ" sản phẩm web của mình trước khi giao cho người dùng.
- Tác giả là designer thật (heydamir), có series "Unslopping" trên X làm căn cứ phương pháp.

## Ước lượng theo thang điểm hub (tự đánh giá, chưa chạy thử)
- Chức năng & tài liệu: tốt (audit → direction → 9 passes, có ví dụ trong `examples/`).
- Bảo mật: tốt — không gọi dịch vụ trả phí mặc định; sinh ảnh luôn hỏi trước.
- Tương thích: 3 agent (Claude Code, Codex, Antigravity).
- Chạy thử thật: chưa chạy — review-required.
- Bảo trì: tác giả rất hoạt động.
- Trừ điểm giấy phép: CC BY 4.0 (không phải MIT) — ghi công bắt buộc khi dùng thương mại.

## Phù hợp Limix Bot
Nên đưa vào quy trình xuất UI của Limix Bot: sau khi agent dựng dashboard/landing, chạy `/unslop` để audit + tinh chỉnh. Dùng chế độ audit trước, sửa sau, để chủ bot chốt hướng.
