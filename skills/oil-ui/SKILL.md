---
name: oil-ui
description: Skill thiết kế giao diện cho AI agent — hiểu sản phẩm là gì trước khi vẽ, biến các từ kiểu "cao cấp"/"gọn gàng" thành quyết định hiển thị thật (typeface, khoảng trắng, tỷ lệ dùng màu), khởi tạo mỗi hướng từ thứ cụ thể (chất liệu, khung cảnh, ngôn ngữ thị giác của lĩnh vực khác), so sánh nhiều hướng khác biệt thật sự, để lại một khoảnh khắc đáng nhớ, và luôn kiểm tra trên ảnh chụp màn hình desktop + mobile trước khi giao. Mặc định đề xuất 1 hướng để duyệt; yêu cầu so sánh thì xếp preview lên một trang so để bạn chọn. Dùng cho website, app, dashboard, component — khi người dùng cần UI/UX cho sản phẩm hoặc trang của bot.
license: MIT
compatibility: Mọi agent hỗ trợ Agent Skill (Claude Code, Codex...) | check_update: POSIX shell hoặc Python 3.10+ (không cài gì thêm)
version: 2026-11-12
---

# Oil UI (Việt hóa)

> Nguồn gốc: https://github.com/oil-oil/oil-ui — MIT. SKILL.md gốc của repo viết bằng tiếng Trung; `SKILL.en.md` là trích faithfully từ README tiếng Anh của repo. Phân tích chi tiết xem `PHAN-TICH.md`.

## Dùng để làm gì
Thiết kế giao diện cho agent: **đề xuất một hướng rồi tinh chỉnh theo ảnh chụp màn hình thật**, hoặc khám phá nhiều hướng song song khi bạn yêu cầu so sánh. Dùng cho website, app, dashboard, component. Có gallery tại ui.oiloil.org.

## Cách nó thiết kế
1. **Hiểu sản phẩm là gì trước.** Trước khi vẽ, nó đặt tên danh mục sản phẩm, tìm 2-3 đối thủ có phong cách đặc trưng nhất, xem họ làm gì và vì sao; rồi quyết định giữ gì, thay gì.
2. **Biến "cao cấp"/"gọn gàng" thành quyết định thật.** Ai cũng dùng những từ đó nhưng chúng không bảo bạn đặt gì lên màn hình. Nó đặt tông từ chủ thể, khán giả và giọng thương hiệu (sôi nổi hay trầm, bóng bẩy hay thô, dày đặc hay thoáng), rồi quy tông thành lựa chọn hiển thị: typeface nào, bao nhiêu khoảng trắng, bao nhiêu phần trang dùng màu.
3. **Khởi tạo mỗi hướng từ thứ cụ thể.** Có thể là một chất liệu trong bối cảnh, một khung cảnh, một nhân vật, hay ngôn ngữ thị giác của một lĩnh vực khác. Ý tưởng đến từ chính sản phẩm, không từ tính từ "minimal"/"bold".
4. **Quyết định màn hình đầu tiên phục vụ ai.** Ở trang để xem, mua hoặc làm việc, màn đầu phải là nội dung. Chỉ trang nhằm thuyết phục mới cần bố cục mở được thiết kế, chốt trước khi viết chữ.
5. **So sánh phải khác biệt thật.** Yêu cầu nhiều hướng thì bố cục, typography, màu và hình ảnh chủ đạo — hai hướng bất kỳ được phép dùng chung tối đa một trong bốn thứ. Có preview rồi, nó xếp cạnh nhau và "nheo mắt" nhìn hình sáng/tối của từng màn đầu. Hai cái giống nhau → đổi bố cục, không chỉ đổi màu.
6. **Để lại một khoảnh khắc đáng nhớ.** Thay vì đẩy mọi phần trang, nó làm 1-2 chi tiết xuất sắc (phản ứng chạm, thanh toán thành công, khoảnh khắc AI làm việc, trang 404). Mọi thứ khác giữ im lặng.
7. **Bạn quyết định cái nào đúng.** Mặc định nó đề xuất một hướng để duyệt. Yêu cầu so sánh thì preview lên một trang so; bạn chọn và nói thích/giết gì, nó siết thiết kế quanh phản hồi trước khi đi tiếp.
8. **Tin màn hình thật.** Trang xong thì mở ở desktop và mobile, kiểm tra bằng screenshot. Có thể thêm reviewer chưa xem từ đầu. Cuối cùng một vòng trừ bớt: mỗi trang một điểm nhắm, không chữ/kẻ/hộp nào không giúp người đọc hiểu.

## Cài đặt / dùng thế nào
Cài như Agent Skill thông thường (copy thư mục skill vào `~/.claude/skills/` của Claude Code hoặc tương đương với Codex). Mỗi phiên làm nó chạy kiểm tra cập nhật bằng `scripts/check_update.sh` (hoặc `check_update.py` với Python 3); có thể tắt bằng biến `OIL_NO_UPDATE_CHECK=1`. Mặc định khuyến nghị 1 hướng chờ duyệt; muốn so sánh thì yêu cầu rõ số hướng.

## Điểm mạnh
- 8 nguyên tắc là **câu lệnh không mơ hồ** (giới hạn dùng chung tối đa 1 yếu tố giữa hai hướng, "nheo mắt" so sánh hình khối sáng/tối) — agent khác nhau chạy ra kết quả nhất quán hơn.
- Đúng triết lý hub: duyệt trước bằng preview, tin ảnh chụp thật thay vì lời mô tả.
- Có gallery công khai (ui.oiloil.org) với nhiều phân loại sản phẩm làm chuẩn tham chiếu.

## Điểm yếu / rủi ro
- SKILL.md gốc viết bằng tiếng Trung — bản Việt hóa dịch từ nội dung tiếng Trung + README tiếng Anh; một số ví dụ tham chiếu với văn hóa thiết kế Trung có thể cần chỉnh khi dùng.
- Script `check_update.sh` gọi mạng lần đầu chạy — theo quy tắc hub là review-required; tắt được bằng `OIL_NO_UPDATE_CHECK=1`.
- Không có phiên bản Pro trong repo (image ideation bằng `oiloil-image.mjs` cần cấu hình thêm).

## Độ phù hợp với Limix Bot
Cao: bot thường xuyên dựng trang/demo cho Leo; 8 nguyên tắc + quy trình duyệt-preview giúp kết quả UI ít "AI slop" hơn. Skill kèm script nhẹ (check_update) → review-required.
