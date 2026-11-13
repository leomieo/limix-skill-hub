# arena — hướng dẫn tiếng Việt

Cho 100 phiên bản Claude/Agent thi đấu sinh tồn để giải một bài toán hóc búa. Khởi tạo N sub-agent (mặc định 100, --quick cho 16), mỗi agent nhận cùng một nhiệm vụ kèm thẻ chiến lược khác nhau (chế độ tư duy, workflow, kỹ thuật), sau đó chạy vòng đấu loại trực tiếp (single-elimination bracket): các agent phản biện, tấn công giải pháp của nhau, tự bào chữa và cải tiến, trọng tài chấm điểm theo rubric cho đến khi còn lại phương án tối ưu nhất. Dùng khi người dùng chưa hài lòng với kết quả, chê câu trả lời kém, yêu cầu thử lại hoặc muốn các agent cạnh tranh công bằng.

## Cách dùng

- Gọi kỹ năng bằng tên gốc `arena` hoặc mô tả yêu cầu bằng tiếng Việt.
- Ví dụ: “Dùng arena cho tác vụ của tôi; giải thích kết quả bằng tiếng Việt.”
- Cung cấp đầu vào và kết quả mong muốn. Các điều kiện, giới hạn và bước duyệt tuân theo `SKILL.md` gốc.

## Ngôn ngữ và giới hạn

Tài liệu này chỉ giải thích cho người dùng; không thay đổi quy trình thực thi. Agent đọc `SKILL.md` khi kích hoạt, chỉ đọc reference phù hợp khi cần. Không nạp đồng thời bản dịch đầy đủ. Giữ nguyên tên Tool, API, MCP, CLI, tham số, mã nguồn và đường dẫn.

Trạng thái: **review-required**. Chưa chạy thử script hoặc dịch vụ ngoài. Việc quét tĩnh không bảo đảm an toàn; quyền sử dụng do Limix Bot và chủ bot quyết định.

Nguồn: https://github.com/Jakeschincariol/arena-skill — commit `df07b8e518e10cdecd8cd7712d9958b6f396250e`.

Phân tích đã lưu: [analysis.vi.md](analysis.vi.md) — nhận xét tham khảo, số liệu có thể cũ.
