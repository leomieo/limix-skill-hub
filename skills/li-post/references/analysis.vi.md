<!-- Legacy curator commentary; not execution instructions. Facts may be stale. -->

# Phân tích: linkedin-agent-skill (Jakeschincariol/linkedin-agent-skill)

## Thông tin (đo qua GitHub API ngày 13/11/2026, lần chạy 7/30)
- **Repo gốc:** https://github.com/Jakeschincariol/linkedin-agent-skill
- **Sao:** 3.508 | **Ngày tạo:** 07/09/2026 | **Push gần nhất:** 17/09/2026
- **Giấy phép:** MIT | **Tác giả:** Jake Schincariol

## Lý do chọn
- Hơn 3.500★ sau thời gian ngắn, là bộ kỹ năng vận hành LinkedIn toàn diện nhất cho AI agent, cùng tác giả với `youtube-agent-skill` và `instagram-agent-skill`.
- Khắc phục triệt để vấn đề "bài viết AI sáo rỗng" (AI slop): tích hợp bộ lọc Humanizer chuyên dụng bóc tách dấu gạch ngang dài vô nghĩa (em dash), từ vựng máy móc, ký tự watermark ẩn và chấm điểm tính người qua 5 tầng kiểm tra.
- 21 công thức mở đầu (hook) đã được chứng minh hiệu quả thực tế nhằm tối ưu thời gian dừng mắt (dwell time), lượt lưu và bình luận.

## Làm gì
Bộ 11 kỹ năng chuyên sâu để quản trị và phát triển tài khoản LinkedIn:
1. `li-post`: Viết bài từ ý tưởng thô theo 21 công thức hook, thích ứng giọng văn người dùng (`voice.md`).
2. `li-human`: Linter thanh lọc văn phong AI, xóa watermark và kiểm thử tỷ lệ vượt máy quét AI.
3. `li-comment`: Tạo bình luận đóng góp giá trị cao trên bài đăng của người khác để mở rộng mạng lưới.
4. `li-reply`: Trả lời bình luận dưới bài viết cá nhân nhằm kích thích thảo luận liên tục.
5. `li-profile`: Chấm điểm trang cá nhân thang điểm 100, đề xuất viết lại headline và mục About.
6. `li-plan`: Lập kế hoạch nội dung hàng tuần (thời điểm đăng, nhóm chủ đề, đối tượng tương tác).
7. `li-carousel`: Soạn kịch bản trình chiếu nhiều slide ngắn gọn, súc tích.
8. `li-dm`: Soạn thư trực tiếp cá nhân hóa cao, không mang tính spam bán hàng.
9. `li-audit`: Rà soát hiệu suất toàn diện các bài viết cũ.

## Điểm mạnh
- Giấy phép MIT miễn phí hoàn toàn, không yêu cầu API key hay đăng nhập tài khoản bên ngoài.
- Nguyên tắc an toàn cao nhất: AI chỉ hỗ trợ soạn thảo và tối ưu, quyền đăng bài tuyệt đối thuộc về người dùng (không tự ý tự động post).
- Có hồ sơ giọng văn (`voice.md`) cá nhân hóa sâu theo phong cách thực tế của người dùng.

## Điểm yếu / rủi ro
- Là kỹ năng văn bản thuần túy, không có rủi ro thực thi mã độc.
- Cần người dùng cung cấp tối thiểu 3 bài viết mẫu trong quá khứ để bot học đúng giọng văn (nếu không bài viết sẽ mang giọng chuẩn mực).

## Độ phù hợp với Limix Bot
Rất cao: Hỗ trợ đắc lực cho cá nhân hóa thương hiệu (Personal Branding) của Leo và các thành viên đội ngũ trên LinkedIn.
