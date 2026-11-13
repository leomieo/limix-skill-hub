<!-- Legacy curator commentary; not execution instructions. Facts may be stale. -->

# Phân tích: arena (Jakeschincariol/arena-skill)

## Thông tin (đo qua GitHub API ngày 13/11/2026, lần chạy 8/30)
- **Repo gốc:** https://github.com/Jakeschincariol/arena-skill
- **Sao:** 1.458 | **Ngày tạo:** 27/09/2026 | **Push gần nhất:** 26/09/2026
- **Giấy phép:** MIT | **Tác giả:** Jakeschincariol

## Lý do chọn
- Giải quyết bài toán nan giải trong tương tác với AI: khi một agent đưa ra câu trả lời kém hoặc bế tắc, việc chỉ bảo "thử lại" trong cùng context thường dẫn đến lặp lại sai lầm cũ do thiên kiến ngữ cảnh.
- Mô hình đấu loại tournament cực kỳ khoa học: chia nhánh đấu loại trực tiếp (single-elimination bracket), bắt buộc đa dạng hóa cách tiếp cận (lên tới 100 thẻ chiến lược reasoning khác nhau), tổ chức phản biện chéo (cross-examination) và chấm điểm mù theo rubric.
- Cung cấp cơ chế phân xử khách quan và lưu trữ trạng thái đấu loại rõ ràng trong thư mục `.arena/`.

## Làm gì
Bộ kỹ năng điều phối giải đấu sinh tồn đa tác tử:
1. `ARENA plan`: Lên kế hoạch kích thước giải đấu (chế độ `--agents 100` hoặc chế độ thường nhật `--quick` với 16 tác tử), tính toán số vòng và số lượt gọi sub-agent.
2. `ARENA init`: Khởi tạo môi trường đấu, cô lập bài toán vào `.arena/task.md` (sub-agent không thấy hội thoại chính để tránh bị ảnh hưởng), chia thẻ chiến lược độc lập không trùng lặp và bốc thăm vòng 1.
3. Vòng thi đấu (Tournament Bracket):
   - Phase sản sinh: N tác tử độc lập giải quyết bài toán theo thẻ chiến lược riêng.
   - Phase tấn công: Các tác tử trong từng cặp đấu phản biện, chỉ ra điểm mù, lỗi logic hoặc điểm yếu của đối thủ.
   - Phase phòng thủ & cải tiến: Mỗi tác tử tiếp thu phản biện, nộp bản sửa đổi hoàn thiện hơn.
   - Phase phân xử: Trọng tài độc lập chấm điểm theo bảng tiêu chí định lượng (rubric) để chọn tác tử đi tiếp.
4. Vòng chung kết: Tác tử vô địch đối đầu với giải pháp cơ sở ban đầu (baseline) để chứng minh sự vượt trội trước khi trả kết quả cho người dùng.

## Điểm mạnh
- Khử sạch thiên kiến xác nhận (confirmation bias), khai phá không gian lời giải phong phú vượt xa cách prompt thông thường.
- Quy trình ghi nhận trạng thái minh bạch, người dùng có thể kiểm tra từng vòng đấu tại `.arena/<run>/`.
- Tách bạch vai trò: Agent điều phối chính không bao giờ tự thi đấu hay tự làm trọng tài.

## Điểm yếu / rủi ro
- Tiêu tốn lượt gọi token nếu chạy bản đầy đủ 100 tác tử (khoảng 595 lượt gọi sub-agent). Khuyên dùng cờ `--quick` (16 tác tử, 91 lượt gọi) cho các tác vụ hàng ngày.
- Yêu cầu môi trường có cài đặt Python 3 để chạy kịch bản quản lý bảng đấu `bracket.py`.

## Độ phù hợp với Limix Bot
Cực kỳ cao: Limix Bot hỗ trợ điều phối đa tác tử (Chief of Staff, Dev, Ada, Lin, Pixel). Kỹ năng này cung cấp một framework cạnh tranh giải thuật và chiến lược hoàn hảo khi đội ngũ kỹ thuật đối mặt với các bài toán kiến trúc hóc búa.
