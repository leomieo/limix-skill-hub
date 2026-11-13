<!-- Legacy curator commentary; not execution instructions. Facts may be stale. -->

# Phân tích: elephant-goldfish-model (google/elephant-goldfish-model)

## Thông tin (đo qua GitHub API ngày 13/11/2026, lần chạy 7/30)
- **Repo gốc:** https://github.com/google/elephant-goldfish-model
- **Sao:** 18.177 | **Ngày tạo:** 13/09/2026 | **Push gần nhất:** 12/11/2026
- **Giấy phép:** Apache-2.0 | **Tác giả:** Google DeepMind / Google Open Source

## Lý do chọn
- Hơn 18.000★ sau 2 tháng, là phương pháp luận và bộ kỹ năng mã nguồn mở chính thức của Google dành cho quy trình thiết kế và thẩm định phần mềm với AI agent.
- Giải quyết triệt để vấn đề "định kiến hội thoại" (conversation bias) và "ảo tưởng đồng thuận": khi một agent vừa lập kế hoạch vừa thẩm định trong cùng một luồng hội thoại, agent thường bỏ qua các giả định ngầm và sai sót kiến trúc.
- Mô hình phân tách độc đáo: **Elephant** (Voi) giữ toàn bộ ngữ cảnh sâu và soạn thảo đặc tả, còn **Goldfish** (Cá vàng) được khởi tạo trong ngữ cảnh hoàn toàn mới không có lịch sử hội thoại để phản biện khách quan như một reviewer độc lập.

## Làm gì
Bộ kỹ năng điều phối luồng thiết kế kỹ thuật chuẩn công nghiệp:
1. `egm-draft`: Soạn thảo tài liệu đặc tả kiến trúc (design spec) từng phần dựa trên yêu cầu cốt lõi. Bắt buộc xuất ra tệp tài liệu thay vì in trực tiếp vào chat.
2. `egm-review`: Điều phối giao thức Goldfish Review qua 5 pha độc lập:
   - Initial Zoom Out: Đánh giá bối cảnh toàn cục và mục tiêu bài toán.
   - Comprehension Review: Kiểm tra tính dễ hiểu và logic nội tại.
   - Design Critique: Phản biện kỹ thuật sâu về trade-off, độ trễ, chịu tải, bảo mật.
   - Intermediate Zoom Out: Đối soát lại với mục tiêu kinh doanh ban đầu.
   - Implementation Readiness: Đánh giá độ sẵn sàng để lập trình viên/coding agent bắt tay triển khai.
3. `egm-drift-report`: Phân tích và phát hiện độ lệch giữa mã nguồn thực tế và bản thiết kế.

## Điểm mạnh
- Chuẩn mực thiết kế phần mềm cao nhất từ đội ngũ kỹ thuật của Google.
- Hoàn toàn độc lập mô hình, hỗ trợ Antigravity, Claude Code, Codex, Gemini CLI.
- Bắt buộc giao tiếp qua văn bản/tài liệu (artifact-first), ngăn chặn tình trạng tràn context window trong chat pane.

## Điểm yếu / rủi ro
- Yêu cầu môi trường agent hỗ trợ spawn subagent độc lập (như `invoke_subagent` trong Antigravity hoặc `Agent` trong Claude Code) để kích hoạt cơ chế Goldfish không ngữ cảnh cũ.
- Tài liệu đồ sộ, cần tuân thủ nghiêm ngặt quy trình artifact để đạt hiệu quả cao nhất.

## Độ phù hợp với Limix Bot
Cực kỳ cao: Limix Bot sở hữu cấu trúc nhiều bot kỹ thuật chuyên môn hóa (Ada, Dev, Lin, Rigel). Kỹ năng này cung cấp chuẩn mực thiết kế và thẩm định không thiên vị hoàn hảo cho quy trình phát triển phần mềm của toàn đội ngũ.
