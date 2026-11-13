# Phân tích: motionmaxxing (Tejashmakwana/motionmaxxing)

## Thông tin (đo qua GitHub API ngày 13/11/2026, lần chạy 8/30)
- **Repo gốc:** https://github.com/Tejashmakwana/motionmaxxing
- **Sao:** 1.568 | **Ngày tạo:** 06/10/2026 | **Push gần nhất:** 06/10/2026
- **Giấy phép:** MIT | **Tác giả:** Tejash Makwana

## Lý do chọn
- Thị trường video và hoạt họa do AI tạo ra đang bùng nổ mạnh mẽ, nhưng đại đa số sản phẩm bị cộng đồng coi là "AI slop" (rác trí tuệ nhân tạo): chuyển động giả tạo, chữ giật cục, bố cục slide thuyết trình vô hồn, hiệu ứng quá đà thiếu thẩm mỹ.
- `motionmaxxing` giải quyết căn cơ bài toán này: xây dựng một hệ thống thẩm mỹ chuẩn mực của một Senior Motion Designer, kết hợp bộ luật "Never Ship" (11 điều cấm tuyệt đối) và bộ thư viện hơn 4.300 chuyển động đo đạc thực tế từ 53 video thương mại đỉnh cao thế giới.
- Cho phép xây dựng video hoàn toàn bằng code (HTML, CSS, GSAP, Three.js) giúp người dùng và agent có thể chỉnh sửa chính xác từng frame thay vì render video đen không thể can thiệp.

## Làm gì
Bộ kỹ năng toàn diện cho quy trình đạo diễn và lập trình video quảng bá sản phẩm:
1. `Brand Discovery`: Quét URL website sản phẩm để bóc tách bản sắc thương hiệu: bảng màu chính thống, phông chữ, logo SVG chuẩn, ngôn từ và triết lý sản phẩm.
2. `Visual World & Craft Laws`: Thiết lập thế giới thị giác có chiều sâu:
   - Quy luật ý tưởng: Phải thuộc về thương hiệu, nếu che logo đi thì đối thủ không thể dùng được.
   - Nhịp điệu và thời gian: Biết dừng trước điểm nhấn, không dàn trải hiệu ứng, kết thúc lắng đọng.
   - Âm thanh đồng điệu: Đồng bộ chuẩn xác giọng đọc voice-over với khoảnh khắc hình ảnh.
3. `Never Ship Checklist`: Tự động loại bỏ 11 kiểu lỗi AI slop điển hình:
   - Cấm giao diện HUD / góc đóng khung vô nghĩa.
   - Cấm bố cục kiểu slide PowerPoint (tiêu đề bên trái, hình bên phải).
   - Cấm thẻ component web bo tròn nhạt nhẽo trên nền đen vô tận.
   - Cấm slogan sáo rỗng ba từ ("Unlock", "Meet X", "Not just X. It's Y.").
   - Cấm số liệu tự chế và biểu đồ ảo.
4. `GSAP Seek-safe Runtime`: Sử dụng runtime GSAP chuẩn hóa với các đường cong easing đo đạc từ thực tế, hỗ trợ tua tới bất kỳ thời điểm nào mà không bị lệch trạng thái.
5. `Automated Review Gates`: Kiểm định chất lượng bằng kịch bản `look.py` và `lint.mjs` đo lường số liệu khách quan thay vì tự khen ngợi sản phẩm.

## Điểm mạnh
- Định hướng thẩm mỹ sâu sắc và khắt khe nhất hiện nay trong cộng đồng AI agent sáng tạo nội dung.
- Dựng video bằng mã nguồn mở (HTML/Canvas/GSAP), xuất video chất lượng cao mà không tốn chi phí GPU đắt đỏ từ các dịch vụ video sinh tạo đám mây.
- Bổ sung hoàn hảo cho các công cụ thiết kế web và animation có sẵn trong hub.

## Điểm yếu / rủi ro
- Đòi hỏi người dùng hoặc agent tuân thủ quy trình nghiêm ngặt, không thể làm tắt bằng các prompt chung chung.

## Độ phù hợp với Limix Bot
Cực kỳ cao: Kết hợp hoàn hảo với `bang-motion` và `motionsites-web-builder` trong Limix Skill Hub, giúp người dùng sản xuất video giới thiệu tính năng, video ra mắt sản phẩm và quảng cáo mạng xã hội đẳng cấp cao.
