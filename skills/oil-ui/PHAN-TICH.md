# Phân tích: oil-ui (oil-oil/oil-ui)

## Thông tin (đo qua GitHub API ngày 12/11/2026, lần chạy 3/30)
- **Repo gốc:** https://github.com/oil-oil/oil-ui
- **Sao:** 3.193 | **Ngày tạo:** 30/09/2026 | **Push gần nhất:** 11/11/2026
- **Giấy phép:** MIT | **Tác giả:** oil-oil (bản zh-CN gốc, có README EN/JA; có bản Pro trả phí ở ui.oiloil.org)

## Lý do chọn
- 3.193★ sau ~6 tuần, push lại ngày 11/11 — đang được cộng đồng dùng và bảo trì thật.
- Đọc cùng `unslop` (lần 1) và `logo-design-skill` (lần 2): mảnh cuối của bộ chất lượng trình bày — **UI/UX cho sản phẩm**, đúng việc bot làm nhiều nhất.
- 8 nguyên tắc thiết kế viết như luật kiểm chứng được, khác hẳn loại skill chỉ gợi ý.

## Làm gì
Skill thiết kế giao diện: hiểu sản phẩm → đặt tông → khởi tạo hướng từ thứ cụ thể → so sánh nhiều hướng khác biệt thật (tối đa dùng chung 1 trong 4 yếu tố) → 1 khoảnh khắc đáng nhớ → duyệt người dùng → kiểm tra screenshot desktop/mobile → vòng trừ bớt. Mặc định đề xuất 1 hướng chờ duyệt; có chế độ so sánh nhiều hướng trên một trang.

## Điểm mạnh
- Quy trình có bước chốt tay ở đúng chỗ: preview trước khi đi sâu, phản hồi của người dùng siết thiết kế.
- "Nheo mắt" so sánh hình khối sáng/tối là heuristic cụ thể, agent tự kiểm được.
- Duy trì chủ động: version 0.33.4, check_update tích hợp, gallery sản phẩm để đối chiếu.

## Điểm yếu / rủi ro
- SKILL.md gốc tiếng Trung — cần bản dịch cẩn thận, một số tham chiếu thẩm mỹ thiên về thị trường Trung.
- Script check_update gọi mạng — review-required, tắt được bằng `OIL_NO_UPDATE_CHECK=1`.
- Phần Pro (image ideation `oiloil-image.mjs`) cần cấu hình ngoài repo.

## Độ phù hợp với Limix Bot
Cao: "bot dựng trang cho người dùng" là nhu cầu lặp lại chính; skill cho quy trình thiết kế kỷ luật thay vì vibe-coding. Skill kèm script nhẹ → review-required.
