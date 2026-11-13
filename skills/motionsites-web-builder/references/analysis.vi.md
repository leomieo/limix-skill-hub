<!-- Legacy curator commentary; not execution instructions. Facts may be stale. -->

# Phân tích: motionsites-web-builder (Motionsites-AI/claude-skill)

## Thông tin (đo qua GitHub API ngày 13/11/2026, lần chạy 7/30)
- **Repo gốc:** https://github.com/Motionsites-AI/claude-skill
- **Sao:** 2.034 | **Ngày tạo:** 26/10/2026 | **Push gần nhất:** 26/10/2026
- **Giấy phép:** MIT | **Tác giả:** MotionSites AI

## Lý do chọn
- Đạt hơn 2.000★ chỉ sau 2-3 tuần, là kỹ năng tiên phong đưa thẩm mỹ thiết kế website cấp độ giải thưởng (Awwwards-level / FWA) vào các coding agent.
- Khắc phục 3 nguyên nhân cốt lõi khiến website do AI tạo ra thường đơn điệu và tầm thường: bản vẽ kế hoạch mơ hồ, thiếu tài nguyên đa phương tiện điện ảnh thực tế, và agent không tự kiểm tra lại thành phẩm thị giác.
- Cung cấp kho kỹ thuật hơn 55 hiệu ứng tương tác cao cấp (liquid glass, word-by-word blur, mouse-scrubbed video, Three.js 3D depth) kèm quy tắc số hóa khắt khe cho từng thông số typography, khoảng cách (clamp/spacing) và đường cong gia tốc chuyển động.

## Làm gì
Bộ quy trình thiết kế và xây dựng landing page đỉnh cao:
1. `Read & Decide`: Phân tích ngắn gọn 5 yếu tố cốt lõi (đối tượng, sắc thái cảm xúc qua 3 từ khóa, điểm nhấn signature, cấu trúc đầu ra, phạm vi).
2. `Study Examples`: Đối chiếu với 40 mẫu thiết kế thịnh hành nhất để học hỏi cấu trúc, thông số hex/HSL chính xác và nghệ thuật tiết chế.
3. `Media Shelf Integration`: Tận dụng kho video điện ảnh và các linh kiện đồ họa 3D trong suốt có sẵn từ MotionSites.
4. `Spec Writing`: Soạn thảo đặc tả kỹ thuật chi tiết với các con số cụ thể trước khi viết code (không dùng các tính từ mơ hồ như "hiệu ứng mượt mà").
5. `Screenshot & Look-and-Fix Loop`: Tự động chụp ảnh màn hình, kiểm tra lỗi vỡ layout trên thiết bị di động, kiểm tra video playback và tự động sửa đổi đến khi đạt chuẩn thẩm mỹ cao nhất.
6. Chế độ `Prompt Mode`: Tự động tinh chỉnh prompt tối ưu để đưa vào các nền tảng như Lovable, Bolt, v0, Cursor.

## Điểm mạnh
- Chuẩn mực thẩm mỹ vượt trội, nâng tầm giao diện web do AI dựng lên đẳng cấp thương mại cao cấp.
- Tài nguyên video và texture phong phú được lưu trữ công khai, sẵn sàng chèn trực tiếp.
- Cơ chế screenshot look-and-fix tạo vòng lặp tự hoàn thiện chất lượng visual thực sự.

## Điểm yếu / rủi ro
- Kỹ năng mã nguồn frontend web an toàn, không có rủi ro mã độc hệ thống.
- Cần màn hình hoặc công cụ chụp ảnh màn hình để agent phát huy tối đa vòng lặp look-and-fix.

## Độ phù hợp với Limix Bot
Rất cao: Hỗ trợ đắc lực cho Pixel (Frontend Engineer) và Dev trong việc tạo các landing page sản phẩm, giao diện giới thiệu tính năng và showcase dự án của Limix Bot với đẳng cấp thẩm mỹ vượt bậc.
