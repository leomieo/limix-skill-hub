# improve-architecture — hướng dẫn tiếng Việt

Rà soát điểm khó bảo trì trong ứng dụng Swift/macOS; đề xuất module và refactor từng bước có bằng chứng giữ nguyên hành vi.

Gọi bằng tên gốc hoặc mô tả mục tiêu bằng tiếng Việt. Cung cấp đầu vào, phạm vi file/dự án và kết quả cần nhận. Agent chỉ đọc core khi chọn skill, rồi đọc reference cần thiết. Đây là hướng dẫn ngắn, không thay core.

Chỉ refactor sau khi chọn đề xuất; phải có bằng chứng hành vi trước và sau.

## Điều kiện

- macOS Swift codebase; SKILL.md:3
- Git history and shell; SKILL.md Survey step 2

Trạng thái: **review-required**; chỉ đối chiếu nguồn và quét tĩnh. Chưa chạy script, model, provider, build macOS hoặc API. Metadata và allowed-tools trong core không cấp quyền. Cần duyệt riêng trước khi chạy hoặc cài dependency.

Nguồn: https://github.com/daveebbelaar/bama/tree/22dc792ea040a35270c219c669f626594267aa1f/skills/code/improve-architecture
