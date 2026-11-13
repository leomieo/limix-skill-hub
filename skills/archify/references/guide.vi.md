# archify — hướng dẫn tiếng Việt

Tạo sơ đồ kiến trúc, workflow, sequence, data-flow, trạng thái, ERD, class, cây và timeline tương tác dưới dạng HTML độc lập; hỗ trợ Mermaid và báo cáo giải thích một trang. Core chính thức giữ nguyên tiếng Anh. Gói hiện bị giới hạn dung lượng, chưa đủ runtime để kích hoạt.

## Cách dùng

- Gọi kỹ năng bằng tên gốc `archify` hoặc mô tả yêu cầu bằng tiếng Việt.
- Ví dụ: “Dùng archify cho tác vụ của tôi; giải thích kết quả bằng tiếng Việt.”
- Cung cấp đầu vào và kết quả mong muốn. Các điều kiện, giới hạn và bước duyệt tuân theo `SKILL.md` gốc.

## Ngôn ngữ và giới hạn

Tài liệu này chỉ giải thích cho người dùng; không thay đổi quy trình thực thi. Agent đọc `SKILL.md` khi kích hoạt, chỉ đọc reference phù hợp khi cần. Không nạp đồng thời bản dịch đầy đủ. Giữ nguyên tên Tool, API, MCP, CLI, tham số, mã nguồn và đường dẫn.

Trạng thái: **review-required**. Chưa chạy thử script hoặc dịch vụ ngoài. Việc quét tĩnh không bảo đảm an toàn; quyền sử dụng do Limix Bot và chủ bot quyết định.

Nguồn: https://github.com/tt-a1i/archify — commit `e37848822238e3a61b12739185cdadd49843a620`.

## Công cụ và giới hạn gói

Cần Node.js để chạy CLI .mjs và trình duyệt để xem HTML. Bản cài đầy đủ phải có renderer, schema, reference, asset, package.json và các thông báo bản quyền tương ứng. Xem [requirements.en.md](requirements.en.md).

**Gói trong Hub chưa đầy đủ:** 120 đường dẫn bị loại vì giới hạn đóng gói, gồm các module runtime cần thiết. Không kích hoạt bản này. Danh sách chính xác nằm trong _hub.source.json. Bản gốc đầy đủ: https://github.com/tt-a1i/archify/tree/e37848822238e3a61b12739185cdadd49843a620/archify. Chưa chạy script, preview hoặc export.
