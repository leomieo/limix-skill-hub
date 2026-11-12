# Phân tích: earshot (Leonxlnx/earshot)

## Thông tin (đo qua GitHub API ngày 12/11/2026, lần chạy 5/30)
- **Repo gốc:** https://github.com/Leonxlnx/earshot
- **Sao:** 4.601 | **Ngày tạo:** 15/10/2026 | **Push gần nhất:** 06/11/2026
- **Giấy phép:** MIT | **Tác giả:** Leon Lin (Leonxlnx)

## Lý do chọn
- 4.601★ sau ~3 tuần ra mắt; giải quyết một "điểm mù vật lý" cố hữu của AI Agent: **AI không có tai để nghe âm thanh**.
- Trước đây, khi được giao việc dựng clip, chọn nhạc nền hay kiểm tra hiệu ứng âm thanh, agent chỉ có thể đọc tên file và bịa ra cảm nhận ("bản nhạc này nghe rất truyền cảm"). earshot mang lại "đôi tai số học" đích thực: chuyển đổi âm thanh thành các chỉ số khoa học kiểm chứng được (LUFS, dBTP, p_real, z-score độ tương đồng phổ âm, độ trễ sync millisecond).
- Tích hợp công cụ xuất phổ âm kết hợp khung hình video (`sheet.png`) cho phép agent dùng chính năng lực thị giác (vision) để "nhìn thấy" âm thanh.

## Làm gì
- Bộ công cụ phân tích và thẩm định âm thanh chuyên sâu:
  - Loop 1: Tìm kiếm, lọc xếp hạng và cắt tỉa khoảnh khắc sạch nhất của hiệu ứng SFX.
  - Loop 2: Đánh giá âm thanh video/phim (phát hiện lệch tiếng-hình, đo LUFS chuẩn phát hành, bảng kiểm critique).
  - Loop 3: So sánh đối đầu A/B giữa 2 bản thu/mix.
  - Loop 4: Thuật toán tổng hợp âm thanh bằng code (procedural synthesis forge).
  - Loop 5: Kho soundbank hiệu ứng âm thanh miễn phí đính kèm.

## Điểm mạnh
- Kiến trúc khoa học vững chắc: ứng dụng mô hình CLAP, AudioSet kết hợp thuật toán âm học chuẩn phát thanh EBU R128.
- Chạy 100% cục bộ trên CPU máy tính, bảo mật tuyệt đối dữ liệu âm thanh của người dùng.
- Cung cấp đầy đủ giao diện MCP Server, CLI và Python API. Giấy phép MIT.

## Điểm yếu / rủi ro
- Lần đầu tiên nạp mô hình CLAP/AST vào RAM trên CPU mất khoảng 20–40 giây.
- Đòi hỏi máy có sẵn Python và ffmpeg.

## Độ phù hợp với Limix Bot
Cực kỳ cao: Limix Bot hỗ trợ người dùng sản xuất nội dung số (video, podcast, thuyết trình). Khi kết hợp cùng `rea-video`, `ffmpeg-skill` hay `huashu-art-motion`, earshot là mảnh ghép hoàn hảo để kiểm định chất lượng âm thanh chuyên nghiệp. Trạng thái: review-required (có script Python).
