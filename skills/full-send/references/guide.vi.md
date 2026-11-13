# full-send — hướng dẫn tiếng Việt

Bộ skill làm việc với pull request hằng ngày của Theo (T3) — "full send" đưa một thay đổi đến PR được merge không cần ai trông; "council" lấy review từ 3 model của 3 nhà cung cấp khác nhau và lặp đến khi cả ba đồng ý; "sol loop" review vòng lặp hai agent; "file a PR" viết PR ngắn mở đầu bằng vấn đề; "takeover" nhận tiếp PR/branch/thread của người khác và giữ credit; "babysit" trông PR xuyên qua CI và review bot rồi sửa finding thật; "modernize" rebase PR cũ và quyết định nó còn đáng sống không. Chạy trong Claude Code và Codex; cần `gh` đã đăng nhập và python3. Dùng khi người dùng nói "full send", "council", "file a PR", "babysit", "take over", "modernize".

## Cách dùng

- Gọi kỹ năng bằng tên gốc `full-send` hoặc mô tả yêu cầu bằng tiếng Việt.
- Ví dụ: “Dùng full-send cho tác vụ của tôi; giải thích kết quả bằng tiếng Việt.”
- Cung cấp đầu vào và kết quả mong muốn. Các điều kiện, giới hạn và bước duyệt tuân theo `SKILL.md` gốc.

## Ngôn ngữ và giới hạn

Tài liệu này chỉ giải thích cho người dùng; không thay đổi quy trình thực thi. Agent đọc `SKILL.md` khi kích hoạt, chỉ đọc reference phù hợp khi cần. Không nạp đồng thời bản dịch đầy đủ. Giữ nguyên tên Tool, API, MCP, CLI, tham số, mã nguồn và đường dẫn.

Trạng thái: **review-required**. Chưa chạy thử script hoặc dịch vụ ngoài. Việc quét tĩnh không bảo đảm an toàn; quyền sử dụng do Limix Bot và chủ bot quyết định.

Nguồn: https://github.com/t3dotgg/tstack — commit `11e37a74d0a6868c121cd0910ab2b3bd9873b92a`.

Phân tích đã lưu: [analysis.vi.md](analysis.vi.md) — nhận xét tham khảo, số liệu có thể cũ.
