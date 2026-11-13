# digital-human-koubo — hướng dẫn tiếng Việt

Sản xuất video người ảo (digital human) dạng nói chuyện (talking head) chuyên nghiệp từ ảnh chân dung: tích hợp Renoise MCP sinh chuyển động và khẩu hình, 5 phong cách dựng biên tập (giải thích kiểu Tiểu Lâm, video ngắn hoa tự, bản tin phát hành, hướng dẫn chi tiết, đa ngôn ngữ), 48 linh kiện đồ họa đóng gói chuẩn creator (chữ chìm sau người, bằng chứng ảnh chụp, bản đồ, bình luận, đinh số hook), cắt đoạn 15s tự động, sửa phát âm không mất khẩu hình và tự tạo ảnh bìa tích hợp khung đầu.

## Cách dùng

- Gọi kỹ năng bằng tên gốc `digital-human-koubo` hoặc mô tả yêu cầu bằng tiếng Việt.
- Ví dụ: “Dùng digital-human-koubo cho tác vụ của tôi; giải thích kết quả bằng tiếng Việt.”
- Cung cấp đầu vào và kết quả mong muốn. Các điều kiện, giới hạn và bước duyệt tuân theo `SKILL.md` gốc.

## Ngôn ngữ và giới hạn

Tài liệu này chỉ giải thích cho người dùng; không thay đổi quy trình thực thi. Agent đọc `SKILL.md` khi kích hoạt, chỉ đọc reference phù hợp khi cần. Không nạp đồng thời bản dịch đầy đủ. Giữ nguyên tên Tool, API, MCP, CLI, tham số, mã nguồn và đường dẫn.

Trạng thái: **quarantined**. Chưa chạy thử script hoặc dịch vụ ngoài. Việc quét tĩnh không bảo đảm an toàn; quyền sử dụng do Limix Bot và chủ bot quyết định.

Nguồn: https://github.com/andyhuo520/digital-human-koubo — commit `f661a6c047bb74ea306ef58aeb1d461a52c01871`.

## Phân tích đã lưu (nhận xét cũ)

Nhận xét tham khảo, số liệu có thể cũ.

# Phân tích: digital-human-koubo (andyhuo520/digital-human-koubo)

## Thông tin (đo qua GitHub API ngày 13/11/2026, lần chạy 6/30)
- **Repo gốc:** https://github.com/andyhuo520/digital-human-koubo
- **Sao:** 1.952 | **Ngày tạo:** 26/10/2026 | **Push gần nhất:** 31/10/2026
- **Giấy phép:** MIT | **Tác giả:** andyhuo520

## Lý do chọn
- Gần 2.000★ chỉ sau 2 tuần công bố, giải quyết trọn vẹn điểm nghẽn lớn nhất của video AI nói chuyện (talking head): video AI thô thường rất buồn ngủ và đơn điệu. digital-human-koubo biến video chân dung tĩnh thành tác phẩm truyền thông cuốn hút ngang tầm các YouTuber triệu view (MrBeast, Vox, Tiểu Lâm).
- Sở hữu bộ sưu tập 48 thành phần đóng gói đồ họa (packaging components) thực chiến: chữ chìm sau lưng (depth text), đinh neo số liệu, bằng chứng pop-up, thẻ tóm tắt, bản đồ động...
- Cơ chế vá lỗi thông minh: khi AI đọc nhầm một chữ, thay vì phải chi hàng nghìn credit để render lại cả đoạn, skill này có công cụ vá cục bộ (voice patch) khớp chính xác độ dài câu và giữ nguyên khẩu hình.

## Làm gì
Bộ giải pháp sản xuất video người ảo AI hoàn chỉnh:
1. Lập kịch bản phân đoạn 15 giây tối ưu cho mô hình sinh video.
2. Điều khiển công cụ sinh chuyển động khuôn mặt và đồng bộ môi.
3. Hậu kỳ tự động hóa qua Remotion: phụ đề chạy chữ, hiệu ứng đồ họa bao bì, âm thanh sfx và nhạc nền ducking.
4. Tự động sinh ảnh thumbnail bắt mắt gắn làm frame đầu video.

## Điểm mạnh
- Quy trình tự động hóa khép kín từ khâu viết kịch bản đến video thành phẩm sẵn sàng đăng tải.
- Cơ chế kiểm soát chi phí và báo giá minh bạch trước khi chạy lệnh sinh video.
- Giấy phép MIT mở.

## Điểm yếu / rủi ro
- Cần Python 3, Node.js và ffmpeg trên máy; cần tài khoản dịch vụ sinh video (như Renoise/Grok) nếu muốn kết xuất avatar chuyển động thật.
- Trạng thái: review-required (do có bộ kịch bản và template Remotion).

## Độ phù hợp với Limix Bot
Rất cao: Limix Bot hỗ trợ người dùng xây dựng các kênh truyền thông, đại diện thương hiệu số và đào tạo trực tuyến. Kỹ năng này mở ra năng lực sản xuất video người ảo chuẩn studio ngay trên máy.
