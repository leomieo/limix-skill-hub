# Phân tích: grandet-api-price-finder (hanzohanzhe/Grandet)

## Thông tin (đo qua GitHub API ngày 13/11/2026, lần chạy 8/30)
- **Repo gốc:** https://github.com/hanzohanzhe/Grandet
- **Sao:** 1.321 | **Ngày tạo:** 05/10/2026 | **Push gần nhất:** 07/11/2026
- **Giấy phép:** Apache-2.0 | **Tác giả:** Hanzo Hanzhe

## Lý do chọn
- Tối ưu hóa chi phí API mô hình ngôn ngữ lớn (LLM) là mối quan tâm hàng đầu của mọi cá nhân và tổ chức vận hành AI agent.
- Thay vì phải tìm kiếm web thủ công hoặc so sánh bảng giá rời rạc giữa hàng trăm nhà cung cấp, `grandet-api-price-finder` kết nối trực tiếp đến cơ sở dữ liệu thời gian thực của grandet.ai với hơn 1.800 nhà cung cấp chính thức, máy chủ suy luận (inference host) và các cổng relay.
- Kỹ năng hiểu sâu các thuật ngữ đặc thù trong hệ sinh thái cổng trung chuyển (bội suất tỷ lệ, chia nhóm tài nguyên, trạm công ích, hạn mức miễn phí không cần thẻ) và giúp người dùng kết nối ngay API rẻ nhất vào ứng dụng.

## Làm gì
Bộ công cụ tra cứu giá và tích hợp API mô hình:
1. `Truy vấn giá rẻ nhất`: Chạy lệnh gọi API trực tiếp (bằng `curl.exe`, PowerShell hoặc Python) đến endpoint của grandet.ai để lấy giá niêm yết theo thời gian thực cho bất kỳ mô hình nào (Claude 3.5 Sonnet, GPT-4o, Gemini 1.5 Pro, LLaMA 3.1, DeepSeek).
2. `Phân tích cấu trúc chi phí`: Trả về giá chi tiết: giá trên mỗi triệu token đầu vào (input), token đầu ra (output), và giá gộp hỗn hợp (blended price).
3. `Săn hạn mức miễn phí (Free Credits)`: Liệt kê các chương trình tặng credit thử nghiệm, phân loại rõ nhà cung cấp nào cho dùng ngay mà không yêu cầu thẻ tín dụng (card-free).
4. `Đánh giá chất lượng API`: Cung cấp thông tin cảnh báo về độ ổn định, độ trễ phản hồi, nguy cơ mô hình bị hạ cấp hoặc tráo đổi (mô hình giả).
5. `Hướng dẫn cấu hình kết nối`: Tự động xuất chuỗi cấu hình biến môi trường (`OPENAI_BASE_URL`, `OPENAI_API_KEY`) để tích hợp ngay vào mã nguồn dự án.

## Điểm mạnh
- Cung cấp dữ liệu định lượng chính xác theo thời gian thực thay vì phỏng đoán.
- Khả năng lọc các nguồn credit miễn phí cực kỳ hữu ích cho lập trình viên thử nghiệm tính năng mới.
- Không yêu cầu cài đặt gói phụ thuộc nặng nề, hỗ trợ chạy trực tiếp qua các tiện ích hệ điều hành có sẵn.

## Điểm yếu / rủi ro
- Phụ thuộc vào tính sẵn sàng của endpoint dữ liệu grandet.ai. Cần có cơ chế dự phòng khi mạng chập chờn.

## Độ phù hợp với Limix Bot
Cực kỳ cao: Người dùng Limix Bot thường xuyên phải cấu hình API key cho nhiều mô hình khác nhau phục vụ các tác vụ đa dạng. Kỹ năng này giúp người dùng chủ động tiết kiệm chi phí vận hành và luôn chọn được nguồn cung cấp API tối ưu nhất.
