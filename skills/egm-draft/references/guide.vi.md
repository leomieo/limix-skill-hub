# egm-draft — hướng dẫn tiếng Việt

Mô hình thiết kế và thẩm định kiến trúc phần mềm đa tác tử của Google: Elephant lưu giữ toàn diện ngữ cảnh dự án để soạn thảo tài liệu thiết kế (design draft/spec); Goldfish được sinh ra trong phiên làm việc độc lập hoàn toàn không có lịch sử hội thoại cũ để thẩm định khách quan, bóc tách điểm mù và giả định ngầm. Quy trình gồm 5 pha review chuyên sâu: Initial Zoom Out, Comprehension, Design Critique, Intermediate Zoom Out và Implementation Readiness.

## Cách dùng

- Gọi kỹ năng bằng tên gốc `egm-draft` hoặc mô tả yêu cầu bằng tiếng Việt.
- Ví dụ: “Dùng egm-draft cho tác vụ của tôi; giải thích kết quả bằng tiếng Việt.”
- Cung cấp đầu vào và kết quả mong muốn. Các điều kiện, giới hạn và bước duyệt tuân theo `SKILL.md` gốc.

## Ngôn ngữ và giới hạn

Tài liệu này chỉ giải thích cho người dùng; không thay đổi quy trình thực thi. Agent đọc `SKILL.md` khi kích hoạt, chỉ đọc reference phù hợp khi cần. Không nạp đồng thời bản dịch đầy đủ. Giữ nguyên tên Tool, API, MCP, CLI, tham số, mã nguồn và đường dẫn.

Trạng thái: **review-required**. Chưa chạy thử script hoặc dịch vụ ngoài. Việc quét tĩnh không bảo đảm an toàn; quyền sử dụng do Limix Bot và chủ bot quyết định.

Nguồn: https://github.com/google/elephant-goldfish-model — commit `270b10326bf366d823bc76fd662cf83808d5781e`.

Phân tích đã lưu: [analysis.vi.md](analysis.vi.md) — nhận xét tham khảo, số liệu có thể cũ.
