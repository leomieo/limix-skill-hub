<!-- Legacy curator commentary; not execution instructions. Facts may be stale. -->

# Phân tích: socratic-tutor (janestreet/agent_skills)

## Thông tin (đo qua GitHub API ngày 12/11/2026, lần chạy 2/30)
- **Repo gốc:** https://github.com/janestreet/agent_skills
- **Sao:** 6.983 | **Ngày tạo:** 03/11/2026 | **Push gần nhất:** 03/11/2026
- **Giấy phép:** có LICENSE.md trong repo | **Tác giả:** Jane Street (tổ chức chính thức)

## Lý do chọn
- Repo MỚI NHẤT trong chu kỳ này: tạo đúng 9 ngày trước, 6.983 sao — tốc độ tăng sao thuộc top tuyệt đối của tuần.
- Nguồn gốc chính thức từ Jane Street — thương hiệu kỹ thuật có uy tín cao, các skill sau sẽ đáng theo dõi.
- Skill thuần văn bản (SKILL.md duy nhất) → rất an toàn, dễ audit, dễ Việt hóa, không phụ thuộc môi trường.

## Làm gì
Skill `socratic-tutor` biến LLM thành gia sư Socratic nghiêm khắc: chẩn đoán đầu vào → bản đồ kỹ năng (4-10 phân kỹ năng, thang 0-5) → hỏi từng câu một buộc tự suy luận → ôn theo khoảng cách (spaced review) → đánh giá cuối. Chỉ kích hoạt khi người dùng muốn được dạy/luyện thật; guard chống nhầm với câu hỏi giải thích một lần.

## Điểm mạnh
- Phương pháp sư phạm thật sự (maieutic), có cấu trúc đo được, không "giảng nói lan man".
- Cận thận kiểu Jane Street: guard xác nhận ý định trước khi bắt đầu phiên dạy học.
- Thuần markdown, dùng được cả trong chatbot thường bằng cách dán nội dung vào prompt.

## Điểm yếu / rủi ro
- Mới có 1 skill — repo còn non, nhưng hướng phát triển của tổ chức lớn là điểm cộng dài hạn.
- Không có tool, không có test — phù hợp hơn như "cách làm" hơn là phần mềm.

## Độ phù hợp với Limix Bot
Cao và đa dụng: bot dạy/tutor cho người dùng là nhu cầu phổ biến (học ngoại ngữ, ôn thi, luyện interview). Không có script → có thể duyệt nhanh. Là skill thuần văn bản an toàn nhất trong 5 skill của lần chạy này.
