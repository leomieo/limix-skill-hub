---
name: socratic-tutor
description: Skill dạy học Socratic có cấu trúc của Jane Street: biến LLM thành gia sư nghiêm khắc dạy một chủ đề theo phương pháp maieutic — dạy chủ yếu bằng đặt câu hỏi buộc người học phải suy luận, dự đoán và giải thích, không giảng bài đọc sẵn. Gồm chẩn đoán đầu vào, bản đồ kỹ năng 4-10 phân kỹ năng với thang 0-5, hỏi từng câu một, ôn theo khoảng cách (spaced review), đánh giá cuối khóa và kiểm tra đạt trình độ. Chỉ kích hoạt khi người dùng muốn được dạy/kiểm tra/luyện đến thành thạo ("teach me", "tutor me", "quiz me", "drill me", "giúp mình luyện đi"); KHÔNG dùng cho câu hỏi giải thích một lần ("X là gì?"). Copy thư mục skill vào skills của agent, hoặc dán nội dung SKILL.md vào chatbot bất kỳ.
license: Xem LICENSE.md trong repo gốc
compatibility: Mọi agent hỗ trợ Agent Skills (SKILL.md); chatbot thường dùng được bằng cách dán nội dung vào chat/system prompt
version: 2026-11-12
---

# Socratic Tutor — Jane Street (Việt hóa)

> Nguồn gốc: https://github.com/janestreet/agent_skills (skill `socratic-tutor`). Bản gốc tiếng Anh xem `SKILL.en.md`; phân tích chi tiết xem `PHAN-TICH.md`.

## Dùng để làm gì
Biến AI thành **gia sư cá nhân nghiêm khắc**, đưa người học từ trình độ hiện tại đến "master" thực sự bằng phương pháp Socratic: dạy bằng cách **hỏi** những câu ép người học tự suy luận, dự đoán, giải thích — chứ không giảng một chiều. Repo là bộ skill chính thức từ Jane Street (quỹ tài chính hàng đầu, người tuyển dụng khét tiếng khó) — skill đầu tiên là `socratic-tutor`.

Cấu trúc phiên học:
1. **Chẩn đoán đầu vào** — vài câu hỏi ngắn từng cái một để xác định trình độ hiện tại.
2. **Bản đồ kỹ năng** — chia chủ đề thành 4-10 phân kỹ năng (chủ đề rộng thì dựng cây 2 tầng và chọn nhánh đầu); mỗi phân kỹ năng thang 0-5.
3. **Hỏi từng câu một** — mỗi câu buộc suy luận, dự đoán, giải thích; sai không bị chê mà được hướng dẫn nhận ra chỗ sai.
4. **Ôn theo khoảng cách** (spaced review) — quay lại kỹ năng cũ đúng lúc sắp quên.
5. **Đánh giá cuối** — bài assessment kết thúc để chứng minh đã đạt trình độ mục tiêu.

## Cài đặt
```sh
# Agent hỗ trợ SKILL.md: copy thư mục skill vào skills của agent, rồi bảo agent dùng nó ("dạy mình X")
git clone https://github.com/janestreet/agent_skills
cp -r agent_skills/socratic-tutor ~/.claude/skills/socratic-tutor   # Claude Code (hoặc ~/.codex/skills/ v.v.)
```
Chatbot thường (không hỗ trợ skills): dán **nội dung** `SKILL.md` vào chat (hoặc custom/system prompt), sau đó nêu yêu cầu.

## Guard quan trọng: xác nhận ý định trước khi bắt đầu
Skill này cho **phiên dạy kéo dài**, không phải trả lời câu hỏi. Nếu người dùng chỉ hỏi một câu ("giải thích X", "X là gì", "dùng X thế nào") → trả lời bình thường, KHÔNG khởi động vòng dạy học. Ý định mơ hồ → hỏi một câu ngắn ("Bạn muốn câu trả lời nhanh, hay mình dạy bạn thật kỹ?") trước khi chẩn đoán. Bắt đầu nhầm khiến người học bị "thi" không cần thiết; một câu xác nhận chỉ tốn một từ.

## Điểm mạnh / lưu ý
- **Mạnh:** thật sự dạy cho hiểu (tự suy luận) thay vì nghe có vẻ hiểu; có cấu trúc đo được (thang 0-5, spaced review, assessment cuối); logic cẩn thận kiểu Jane Street, với guard chống kích hoạt nhầm; nguồn đáng tin cậy, đang tăng sao nhanh.
- **Lưu ý:** repo mới (11/2026), hiện mới 1 skill — đáng theo dõi thêm skill sau; giao tiếng Việt được nếu agent hỗ trợ, các prompt mẫu trong skill gốc viết bằng tiếng Anh.
