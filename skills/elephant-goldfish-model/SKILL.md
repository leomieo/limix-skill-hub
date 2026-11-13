---
name: elephant-goldfish-model
description: "Mô hình thiết kế và thẩm định kiến trúc phần mềm đa tác tử của Google: Elephant lưu giữ toàn diện ngữ cảnh dự án để soạn thảo tài liệu thiết kế (design draft/spec); Goldfish được sinh ra trong phiên làm việc độc lập hoàn toàn không có lịch sử hội thoại cũ để thẩm định khách quan, bóc tách điểm mù và giả định ngầm. Quy trình gồm 5 pha review chuyên sâu: Initial Zoom Out, Comprehension, Design Critique, Intermediate Zoom Out và Implementation Readiness."
license: Apache-2.0
---

# Elephant-Goldfish Model (EGM)

Phương pháp luận thiết kế kiến trúc phần mềm bằng trí nhớ sâu (Elephant) và thẩm định độc lập bằng góc nhìn mới tinh (Goldfish), phát triển bởi Google DeepMind & Google Open Source.

## Nguyên lý Cốt lõi

1. **Elephant (Chú Voi nhớ lâu):**
   - Nắm giữ toàn bộ bối cảnh dự án, các cuộc trao đổi yêu cầu với người dùng và các quyết định kỹ thuật trước đó.
   - Chịu trách nhiệm cấu trúc hóa và soạn thảo tài liệu thiết kế chi tiết (`design_draft.md`).

2. **Goldfish (Cá Vàng bộ nhớ mới):**
   - Luôn chạy trong một phiên subagent hoàn toàn mới, **tuyệt đối không mang theo lịch sử trò chuyện cũ**.
   - Đọc trực tiếp bản thảo thiết kế và mã nguồn tham chiếu như một kỹ sư bên ngoài mới tiếp cận dự án.
   - Bóc trần các điểm mù, các giả định ngầm chưa được chứng minh và sự thiên lệch đồng thuận (confirmation bias).

## 5 Pha Thẩm định của Goldfish (`egm-review`)

1. **Initial Zoom Out Review:**
   - Đánh giá tổng quan: Bài toán này có thực sự cần giải quyết không? Giải pháp đề xuất có đúng tầm mức (over-engineering hay under-engineering) không?
2. **Comprehension Review:**
   - Kiểm tra tính dễ hiểu: Một kỹ sư mới vào đội có thể hiểu và làm theo tài liệu này mà không cần tác giả giải thích thêm không?
3. **Design Critique:**
   - Phản biện chuyên sâu: Đánh giá các đánh đổi (trade-offs) về hiệu năng, tính mở rộng, độ trễ, tính nhất quán dữ liệu và rủi ro bảo mật.
4. **Intermediate Zoom Out Review:**
   - Đối soát đối chiếu: Sau khi chỉnh sửa các điểm phản biện, kiến trúc có bị lệch khỏi mục tiêu kinh doanh ban đầu không?
5. **Implementation Readiness:**
   - Sẵn sàng triển khai: Các giao diện (APIs), cấu trúc dữ liệu, kế hoạch di chuyển (migration plan) và kịch bản rollback đã rõ ràng từng bước chưa?

## Quy định Thực thi Bắt buộc (Artifact-First)

- **Không xuất bản thảo lớn ra màn hình chat:** Mọi đề xuất, tóm tắt thảo luận và bản thảo thiết kế **bắt buộc** phải được ghi thành tệp tài liệu cụ thể trong thư mục làm việc (`design_draft.md`).
- **Ngôn ngữ chuẩn mực:** Tránh dùng các từ hoa mỹ vô căn cứ (như *seamless*, *robust*, *blazingly fast*), tập trung mô tả cơ chế hoạt động kỹ thuật cụ thể.
