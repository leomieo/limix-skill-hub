# Phân tích: stickman-video-director (kaomei/stickman-video-director)

## Thông tin (đo ngày 13/11/2026, cập nhật theo yêu cầu người dùng)
- **Repo gốc:** https://github.com/kaomei/stickman-video-director
- **Sao:** 3.820★ | **Ngày tạo:** 03/08/2026 | **Push gần nhất:** 13/11/2026
- **Giấy phép:** MIT | **Tác giả:** kaomei

## Lý do chọn
- Giải quyết trực diện nhu cầu sản xuất video hoạt hình tự động, tối ưu chi phí và thời gian cho các nhà sáng tạo nội dung không lộ mặt (faceless channels) trên YouTube Shorts, TikTok và Instagram Reels.
- Cấu trúc kiến trúc cực kỳ hoàn thiện với hai chế độ rõ rệt: chế độ Đạo diễn (Director Mode) dành cho AI sinh prompt theo phân cảnh, và chế độ Tự hành (Autopilot Mode) tích hợp render trực tiếp video MP4 có sẵn giọng đọc TTS và phụ đề động.
- Sở hữu tới 11 phong cách thị giác riêng biệt (từ nét vẽ tay tối giản, hài kịch thời tiền sử, truyện hoạt hình chữa lành, phong cách Nhật Bản thời Edo, đến thể loại giật gân kịch tính và diễn giả góc màn hình).
- Động cơ nhịp tim 5 giai đoạn (5-Stage High-Completion Heartbeat Engine) đúc kết các quy luật tâm lý học và giữ chân người xem video ngắn hiệu quả bậc nhất hiện nay.

## Làm gì
Bộ kỹ năng toàn diện cho quy trình sản xuất video hoạt hình que:
1. **Chế độ Đạo diễn (Director Mode):**
   - Tiếp nhận nội dung thô, cấu trúc thành kịch bản 5 nhịp: Móc câu vàng (Golden Hook) → Bẻ gãy định kiến (Disrupting Assumptions) → Bóc trần bí mật nội bộ (Unveiling Insider Secrets) → Khải thị chân lý (Ultimate Truth Revelation) → Nâng tầm & Thảo luận (Interactive Discussion).
   - Xuất chuỗi prompt độc lập chuẩn xác cho từng clip ~10 giây tương thích với các mô hình sinh video AI (Gemini Omni Flash, Runway Gen-3, Luma Dream Machine, Kling AI).
   - Khóa cứng nhân vật (Character Anchor Freeze) và giọng đọc (Voice Continuity) xuyên suốt mọi phân cảnh để tránh hiện tượng nhân vật bị biến dạng hoặc nhảy nét giữa các clip.
2. **Chế độ Tự hành (Autopilot Mode):**
   - Quy trình CLI khép kín: khởi tạo (`init`), kiểm định (`validate`), xem trước (`preview`), render (`render`).
   - Tự động đồng bộ hóa giọng đọc thuyết minh (TTS qua ElevenLabs hoặc mô hình cục bộ), phụ đề động ngữ nghĩa từng dòng và hiệu ứng âm thanh SFX đồng bộ khung hình.
   - Hỗ trợ đầy đủ hai tỷ lệ khung hình chuẩn: ngang `16:9` và dọc `9:16`.

## Điểm mạnh
- **Độ hoàn thiện cao:** Tài liệu và mã nguồn cực kỳ chi tiết, kèm theo bộ thư viện assets, mẫu thử và test tự động đồ sộ.
- **Khử sạch biến dạng AI:** Quy định nghiêm ngặt về cấm sinh chữ/số ngẫu nhiên trên khung hình của mô hình AI video, phân tách rõ ràng giữa hình ảnh và phụ đề hậu kỳ.
- **Đa dạng phong cách:** 11 phong cách thị giác đáp ứng từ video khoa học, tâm lý học tối, kinh doanh, truyện cười đến phim hoạt hình ngắn.
- **Giấy phép MIT:** Hoàn toàn mở, an toàn để tích hợp và mở rộng trong các hệ thống tự động hóa.

## Điểm yếu / rủi ro
- Chế độ Autopilot cục bộ yêu cầu môi trường Node.js (>=20) cùng các thư viện đồ họa hệ thống như `@napi-rs/canvas` và `sharp` nếu muốn tự render file MP4 trên máy.
- Với chế độ Director Mode, chất lượng video cuối cùng vẫn phụ thuộc vào mô hình sinh video AI mà người dùng kết nối (ví dụ Gemini Omni Flash hoặc Runway).

## Độ phù hợp với Limix Bot
Cực kỳ cao: Limix Bot có khả năng điều phối tác vụ sinh nội dung kịch bản, kết hợp với các công cụ tạo video và quản lý truyền thông mạng xã hội. Kỹ năng này cung cấp một khuôn mẫu sản xuất video hoạt hình chuyên nghiệp và hoàn chỉnh nhất hiện nay trên GitHub.
