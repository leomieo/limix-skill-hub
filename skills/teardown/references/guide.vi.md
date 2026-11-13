# teardown — hướng dẫn tiếng Việt

Xây mô phỏng 3D tương tác của một cỗ máy hay cơ cấu thật (động cơ, càng đáp, liên kết đi bộ, bơm, hộp số) thành một trang HTML offline có thể tháo rời — mọi bảng quanh mô hình đọc số thật từ chính model làm các chi tiết chuyển động, mỗi phân hệ một nút mở phần đang làm việc, có cắt tầng, góc máy và chuyến tham quan tự động khi không ai chạm; rồi quay lại từng khung thành video 60 fps có nhạc quy trình hóa đồng bộ trên cùng timeline. Cần Node.js 20+, ffmpeg cho video, Python 3 cho âm thanh. Dùng khi ai đó hỏi "cái máy này hoạt động thế nào", muốn visual explainer, simulator, cutaway, exploded view hoặc bài học 3D tương tác.

## Cách dùng

- Gọi kỹ năng bằng tên gốc `teardown` hoặc mô tả yêu cầu bằng tiếng Việt.
- Ví dụ: “Dùng teardown cho tác vụ của tôi; giải thích kết quả bằng tiếng Việt.”
- Cung cấp đầu vào và kết quả mong muốn. Các điều kiện, giới hạn và bước duyệt tuân theo `SKILL.md` gốc.

## Ngôn ngữ và giới hạn

Tài liệu này chỉ giải thích cho người dùng; không thay đổi quy trình thực thi. Agent đọc `SKILL.md` khi kích hoạt, chỉ đọc reference phù hợp khi cần. Không nạp đồng thời bản dịch đầy đủ. Giữ nguyên tên Tool, API, MCP, CLI, tham số, mã nguồn và đường dẫn.

Trạng thái: **review-required**. Chưa chạy thử script hoặc dịch vụ ngoài. Việc quét tĩnh không bảo đảm an toàn; quyền sử dụng do Limix Bot và chủ bot quyết định.

Nguồn: https://github.com/elvarofficial/teardown — commit `a91262ac1109051e014662d42ecb0b7bc1f113b1`.

Phân tích đã lưu: [analysis.vi.md](analysis.vi.md) — nhận xét tham khảo, số liệu có thể cũ.
