---
name: linkedin-agent-skill
description: "Bộ 11 kỹ năng toàn diện cho AI agent vận hành tài khoản LinkedIn: viết bài từ ý tưởng thô theo 21 công thức hook đã được kiểm chứng, linter khử văn phong AI (loại bỏ em dash, từ sáo rỗng, ký tự ẩn watermark), chấm điểm hồ sơ cá nhân theo thang điểm 100, lập kế hoạch nội dung tuần và tối ưu tương tác bình luận."
license: MIT
---

# LinkedIn Agent Skill

Bộ kỹ năng vận hành tài khoản LinkedIn chuyên nghiệp, loại bỏ hoàn toàn dấu vết máy móc (AI slop) và tối ưu hóa mức độ gắn kết tự nhiên.

## Bộ 11 Kỹ năng Thành phần

1. **`li-post` (Soạn thảo Bài đăng Chuẩn thuật toán):**
   - Biến một ý tưởng thô thành bài đăng hoàn chỉnh mang giọng văn chân thực của tác giả.
   - Cung cấp 3 phương án mở đầu (hook) dựa trên 21 công thức hook đã qua kiểm chứng thực tế.
   - Định dạng ngắn gọn, tối ưu để hiển thị trọn vẹn trước nút "Xem thêm..." (khoảng 140 ký tự trên điện thoại).

2. **`li-human` (Khử Dấu vết AI - Humanizer Linter):**
   - Loại bỏ triệt để các dấu hiệu đặc trưng của văn bản AI: dấu gạch nối dài (em dash `—`), danh sách gạch đầu dòng tràn lan, các từ vựng sáo rỗng (*tapestry, delve, testament, multifaceted, game-changer*...).
   - Quét và xóa các ký tự khoảng trắng ẩn (zero-width spaces/watermark).
   - Chấm điểm bài viết qua bộ 5 bài kiểm tra phát hiện văn phong nhân tạo trước khi gửi người dùng.

3. **`li-profile` (Tối ưu Hóa Hồ sơ Cá nhân):**
   - Chấm điểm trang cá nhân thang điểm 100 dựa trên: Headline, Tiêu đề phụ, Mục About (Giới thiệu), Kinh nghiệm và Bằng chứng xã hội.
   - Đưa ra phiên bản viết lại cụ thể cho từng phần bị trừ điểm.

4. **`li-comment` & `li-reply` (Chiến lược Tương tác):**
   - Soạn bình luận mang hàm lượng kiến thức cao dưới bài của các chuyên gia trong ngành.
   - Duy trì chuỗi hội thoại thông minh dưới bài viết của mình để thuật toán phân phối bài tốt hơn.

5. **`li-plan` (Lên Lịch Nội dung Hàng tuần):**
   - Phân bổ 3-5 bài đăng mỗi tuần theo ma trận nội dung: Câu chuyện bài học, Hướng dẫn thực chiến, Ý kiến phản biện và Kết nối cộng đồng.

## Nguyên tắc Vận hành Bắt buộc

- **Người dùng giữ quyền xuất bản:** AI chỉ đóng vai trò trợ lý soạn thảo, tinh chỉnh và đề xuất; tuyệt đối không tự động bấm nút đăng bài nếu chưa có sự xác nhận của người dùng.
- **Hồ sơ giọng văn (`voice.md`):** Luôn tham chiếu hoặc khởi tạo tệp giọng văn cá nhân từ các bài viết cũ của người dùng để bài viết luôn giữ được phong cách tự nhiên nhất.
