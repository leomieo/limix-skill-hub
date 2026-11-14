# ux-design — hướng dẫn tiếng Việt

Rà soát UX một tính năng macOS: tên gọi, luồng thao tác, cách mở giao diện, trạng thái, câu chữ và khả năng tiếp cận.

Gọi bằng tên gốc hoặc mô tả mục tiêu bằng tiếng Việt. Cung cấp đầu vào, phạm vi file/dự án và kết quả cần nhận. Agent chỉ đọc core khi chọn skill, rồi đọc reference cần thiết. Đây là hướng dẫn ngắn, không thay core.

Đầu ra là UX block và glossary; chưa kiểm tra VoiceOver hoặc giao diện thật.

## Điều kiện

- macOS SwiftUI project for implementation; SKILL.md:3
- VoiceOver and Accessibility Inspector for runtime audit; SKILL.md accessibility section

Trạng thái: **review-required**; chỉ đối chiếu nguồn và quét tĩnh. Chưa chạy script, model, provider, build macOS hoặc API. Metadata và allowed-tools trong core không cấp quyền. Cần duyệt riêng trước khi chạy hoặc cài dependency.

Nguồn: https://github.com/daveebbelaar/bama/tree/22dc792ea040a35270c219c669f626594267aa1f/skills/design/ux-design
