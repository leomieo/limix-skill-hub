# socratic-tutor — hướng dẫn tiếng Việt

Skill dạy học Socratic có cấu trúc của Jane Street: biến LLM thành gia sư nghiêm khắc dạy một chủ đề theo phương pháp maieutic — dạy chủ yếu bằng đặt câu hỏi buộc người học phải suy luận, dự đoán và giải thích, không giảng bài đọc sẵn. Gồm chẩn đoán đầu vào, bản đồ kỹ năng 4-10 phân kỹ năng với thang 0-5, hỏi từng câu một, ôn theo khoảng cách (spaced review), đánh giá cuối khóa và kiểm tra đạt trình độ. Chỉ kích hoạt khi người dùng muốn được dạy/kiểm tra/luyện đến thành thạo ("teach me", "tutor me", "quiz me", "drill me", "giúp mình luyện đi"); KHÔNG dùng cho câu hỏi giải thích một lần ("X là gì?"). Copy thư mục skill vào skills của agent, hoặc dán nội dung SKILL.md vào chatbot bất kỳ.

## Cách dùng

- Gọi kỹ năng bằng tên gốc `socratic-tutor` hoặc mô tả yêu cầu bằng tiếng Việt.
- Ví dụ: “Dùng socratic-tutor cho tác vụ của tôi; giải thích kết quả bằng tiếng Việt.”
- Cung cấp đầu vào và kết quả mong muốn. Các điều kiện, giới hạn và bước duyệt tuân theo `SKILL.md` gốc.

## Ngôn ngữ và giới hạn

Tài liệu này chỉ giải thích cho người dùng; không thay đổi quy trình thực thi. Agent đọc `SKILL.md` khi kích hoạt, chỉ đọc reference phù hợp khi cần. Không nạp đồng thời bản dịch đầy đủ. Giữ nguyên tên Tool, API, MCP, CLI, tham số, mã nguồn và đường dẫn.

Trạng thái: **review-required**. Chưa chạy thử script hoặc dịch vụ ngoài. Việc quét tĩnh không bảo đảm an toàn; quyền sử dụng do Limix Bot và chủ bot quyết định.

Nguồn: https://github.com/janestreet/agent_skills — commit `7c6715c29548a3b39d4a9545c698ee4fd17a7213`.

Phân tích đã lưu: [analysis.vi.md](analysis.vi.md) — nhận xét tham khảo, số liệu có thể cũ.
