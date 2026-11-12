---
name: youtube-agent-skill
description: "Vận hành kênh YouTube toàn diện cho AI Agent: viết kịch bản video từ ý tưởng thô với 21 công thức hook chấm điểm tự động, kiểm duyệt ghép đôi tiêu đề và thumbnail tránh trùng lặp/cắt cụt, đọc tệp xuất retention để tìm điểm rơi người xem, tạo bảng quyết định dựng (EDL) từ bản ghi âm, tự động phát hiện và cắt Shorts từ video dài, cùng linter SEO chuẩn YouTube."
---

# youtube-agent-skill: Bộ kỹ năng vận hành kênh YouTube cho Agent

Bộ kỹ năng gồm 11 module chuyên sâu và 6 công cụ Python chạy cục bộ không cần API bên ngoài, hỗ trợ sáng tạo và tối ưu hóa nội dung YouTube từ kịch bản đến đóng gói.

## Các module chức năng

1. **Kịch bản & Hook (`/yt-script`):**
   - Chuyển ý tưởng thô thành kịch bản hoàn chỉnh.
   - Sinh 5 lựa chọn hook mở đầu dựa trên 21 công thức tâm lý học đã được kiểm chứng.
   - Chấm điểm hook tự động bằng công cụ `hookscore.py` (đo thang điểm 5 tiêu chí: tò mò, tốc độ, tính cụ thể, độ cản trở, lời hứa hẹn).

2. **Đóng gói Tiêu đề & Thumbnail (`/yt-package`):**
   - Đánh giá tiêu đề và hình thu nhỏ (thumbnail) như một cặp bài trùng duy nhất.
   - Kiểm tra lỗi cắt chữ trên thiết bị di động, lỗi lặp từ giữa chữ trên ảnh và tiêu đề, cảnh báo tính mơ hồ.

3. **Biên tập & Dựng phim (`/yt-edit`):**
   - Phân tích tệp phụ đề/bản ghi âm (`.srt`) để trích xuất Edit Decision List (EDL).
   - Phát hiện khoảng lặng thừa (dead air), từ đệm lặp lại, các đoạn quay lỗi cần cắt bỏ kèm mã thời gian (timecode).

4. **Phân tích Giữ chân Người xem (`/yt-retention`):**
   - Đọc dữ liệu giữ chân (`retention.csv`) từ YouTube Studio.
   - Chỉ ra chính xác giây người xem rời đi, nội dung đang nói tại thời điểm đó và nguyên nhân (sụt giảm hook, vách đá cliff, trượt dốc slide).

5. **Khai thác Video ngắn (`/yt-shorts`):**
   - Tự động dò tìm các phân đoạn đắt giá trong video dài có khả năng viral độc lập.
   - Viết lại câu mở đầu cuốn hút riêng cho từng clip ngắn.

6. **Chiến lược Kênh (`/yt-plan`, `/yt-viral`, `/yt-audit`):**
   - Lập lịch phát hành hàng tuần phù hợp quỹ thời gian thực tế.
   - Quét xu hướng nội dung trong ngách thị trường, xếp hạng video đột phá theo tỷ lệ vượt trội so với trung bình kênh gốc.
   - Kiểm toán toàn diện kênh để đưa ra DUY NHẤT một giải pháp trọng tâm cải thiện hiệu suất.

## Nguyên tắc an toàn
- Agent chỉ tạo nội dung, kịch bản và dữ liệu phân tích. Quyền tải lên và xuất bản do người dùng trực tiếp thực hiện.
- Công cụ chỉ đọc dữ liệu cục bộ hoặc công khai, không yêu cầu mật khẩu hay khóa tài khoản.
