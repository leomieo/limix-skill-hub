<!-- Legacy curator commentary; not execution instructions. Facts may be stale. -->

# Phân tích: day-trader-skill (Jakeschincariol/day-trader-skill)

## Thông tin (đo qua GitHub API ngày 12/11/2026, lần chạy 3/30)
- **Repo gốc:** https://github.com/Jakeschincariol/day-trader-skill
- **Sao:** 7.254 | **Ngày tạo:** 20/10/2026 | **Push gần nhất:** 20/10/2026
- **Giấy phép:** MIT | **Tác giả:** Jakeschincariol

## Lý do chọn
- Sao cao nhất trong số skill mới chưa có trong hub (7.254★ chỉ sau ~23 ngày).
- Cùng tác giả với replica-skill đã chọn ở lần 2 — bài toán ngược: replica xây sản phẩm, day-trader bảo vệ và định hình quyết định tài chính bằng số liệu thật.
- Dữ liệu 100% miễn phí công khai (Yahoo Finance, Nasdaq Trader, SEC EDGAR, House Clerk) — bot chạy được ngay không cần khóa nào.

## Làm gì
Bộ 11 skill cho day-trading: `/trader-scanner` (quét setup trên hàng nghìn biểu đồ), `/trader-news`, `/trader-entry`, `/trader-exit`, `/trader-timemachine` (10.000 phiên giả lập + thống kê quá khứ của setup), `/trader-risk`, `/trader-budget`, `/trader-broker` (mặc định paper trading), `/trader-alerts`, `/trader-analyst`, `/trader-pelosi` (theo dõi giao dịch của Quốc hội).

## Điểm mạnh
- Chuỗi đầy đủ từ quét → tin tức → vào/ra → rủi ro → ngân sách → lệnh, mỗi bước một skill riêng dễ gọi lẻ.
- "Cỗ máy thời gian" là điểm khác biệt thật: nói xác suất trung thực thay vì lời hứa lợi nhuận.
- Tuyên bố an toàn rõ ràng: không lệnh nào tự đặt, không API key, MIT.

## Điểm yếu / rủi ro
- Repo chưa push lại kể từ ngày tạo — không có phiên bản ổn định tiếp theo; nhưng toàn bộ là markdown + Python thuần nên ít hỏng theo thời gian.
- Rủi ro tài chính thật: giá setup không phải dự đoán; skill chỉ giúp đỡ lướt 5.000 biểu đồ bằng tay, không giúp né thua lỗ.
- `/trader-broker` là skill duy nhất chạm đến tiền thật — review-required theo quy tắc hub, chỉ dùng sau khi Leo xem xét và test paper trading.

## Độ phù hợp với Limix Bot
Trung bình-cao: phần scanner/news/analyst dùng được ngay khi Leo hỏi về thị trường; phần broker giữ mặc định paper và luôn chờ duyệt. Skill kèm script (Python thuần) → trạng thái review-required.
