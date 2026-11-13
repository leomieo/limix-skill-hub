---
name: arena
description: Cho 100 phiên bản Claude/Agent thi đấu sinh tồn để giải một bài toán hóc búa. Khởi tạo N sub-agent (mặc định 100, --quick cho 16), mỗi agent nhận cùng một nhiệm vụ kèm thẻ chiến lược khác nhau (chế độ tư duy, workflow, kỹ thuật), sau đó chạy vòng đấu loại trực tiếp (single-elimination bracket): các agent phản biện, tấn công giải pháp của nhau, tự bào chữa và cải tiến, trọng tài chấm điểm theo rubric cho đến khi còn lại phương án tối ưu nhất. Dùng khi người dùng chưa hài lòng với kết quả, chê câu trả lời kém, yêu cầu thử lại hoặc muốn các agent cạnh tranh công bằng.
argument-hint: "[--agents N | --quick] [--seed S] <nhiệm vụ>"
---

# arena

Dành cho những lúc mô hình liên tục đưa ra câu trả lời kém hoặc bế tắc. Thay vì yêu cầu thử lại trong vô vọng, kỹ năng này vận hành một giải đấu thực thụ:
N sub-agent nhận cùng một nhiệm vụ chính xác, mỗi bên tiếp cận bài toán bằng chế độ tư duy, quy trình làm việc và chiến lược khác nhau, sau đó tấn công giải pháp của nhau trong bảng đấu loại trực tiếp cho đến khi tìm ra phương án tối ưu cuối cùng. Bạn là người điều phối giải đấu. Bạn không bao giờ tự thi đấu và không bao giờ tự làm trọng tài.

Nội dung người dùng nhập sau `/arena`: `$ARGUMENTS`

Nếu phần này để trống hoặc mang giá trị placeholder, hãy lấy nhiệm vụ từ ngữ cảnh gần nhất của cuộc hội thoại.

## Công cụ quản lý

Mọi thao tác quản lý trạng thái bảng đấu được xử lý qua `bracket.py` nằm trong thư mục của kỹ năng:

```bash
python3 "${CLAUDE_SKILL_DIR}/bracket.py" <command>
```

Dưới đây, `ARENA` đại diện cho chính xác lệnh trên. Trạng thái giải đấu được lưu tại `.arena/<run>/arena.json` trong thư mục hiện tại, và mọi lệnh sau `init` sẽ tìm thấy nó thông qua `.arena/LATEST`.

## Bước 1: Xác định quy mô và xin xác nhận nếu cần

Đọc các cờ (flags) từ yêu cầu. Những phần không phải cờ chính là nội dung nhiệm vụ:

| Cờ (flag) | Ý nghĩa |
| --- | --- |
| `--agents N` | N đấu thủ cạnh tranh. Mặc định 100. |
| `--quick` | 16 đấu thủ cạnh tranh. Cấu hình khuyên dùng hàng ngày. |
| `--seed S` | Ghim bộ thẻ chiến lược và các cặp đấu. Mặc định: ngẫu nhiên và được ghi lại. |
| `--wave W` | Số sub-agent chạy đồng thời mỗi đợt. Mặc định 10. |

Nếu không có văn bản nhiệm vụ: nhiệm vụ chính là yêu cầu gần nhất của người dùng trong cuộc hội thoại này, và câu trả lời trước đó của bạn là mốc chuẩn (baseline) cần bị đánh bại.

Chạy `ARENA plan --agents N` (hoặc `--quick`) để in ra số vòng đấu, số lượt gọi sub-agent và số đợt thi đấu.

- **Người dùng chủ động yêu cầu arena** (gõ `/arena`, nói "arena", hoặc bảo cho các bot cạnh tranh): báo cáo trong 1 dòng về quy mô (ví dụ: "100 tác tử, 7 vòng đấu, 595 lượt gọi sub-agent") và bắt đầu.
- **Kỹ năng được kích hoạt do người dùng thất vọng** ("sai rồi", "làm lại đi", "câu trả lời dở tệ") và chưa từng nhắc đến arena: hỏi người dùng một lần trước khi tiêu tốn tài nguyên. Đưa ra 3 lựa chọn: giải đấu đầy đủ (100 tác tử, 595 lượt gọi), `--quick` (16 tác tử, 91 lượt gọi), hoặc thử lại thông thường. Chờ người dùng quyết định.

Sub-agent ghi nhận kết quả vào `.arena/` trong thư mục hiện tại. Trước khi khởi chạy, khuyến nghị người dùng chế độ tự động chấp nhận chỉnh sửa tệp để tránh phải bấm duyệt hàng trăm lần.

## Bước 2: Viết tệp mô tả nhiệm vụ (Task File)

Đây là bước quyết định chất lượng kết quả. **Các sub-agent không thấy cuộc trò chuyện này.** Mọi đấu thủ, bên phản biện và trọng tài chỉ biết những gì có trong tệp nhiệm vụ, vì vậy tệp `.arena/task.md` phải hoàn toàn độc lập và tự giải nghĩa:

- Yêu cầu bài toán, giữ nguyên từ ngữ của người dùng ở mức tối đa.
- Mọi ràng buộc người dùng đã nêu: đối tượng thụ hưởng, độ dài, định dạng, văn phong, công nghệ sử dụng, thời hạn, những gì không được phép thay đổi.
- Ngữ cảnh cần thiết: đường dẫn tuyệt đối của các tệp quan trọng, dữ liệu đính kèm, mô tả sản phẩm, quy ước mã nguồn.
- Tiêu chí hoàn thành (định nghĩa "done") nếu người dùng đã chỉ rõ.
- Nếu có câu trả lời cũ cần đánh bại: ghi rõ người dùng không thích điểm nào ở câu trả lời đó.

Tuyệt đối không tự bịa thêm yêu cầu mà người dùng không đưa ra. Không viết quan điểm cá nhân về lời giải vào tệp này để tránh định hướng 100 tác tử theo cùng một lối mòn.

Nếu có câu trả lời trước đó khiến người dùng chưa hài lòng, hãy sao chép nguyên văn vào `.arena/baseline.md`.

## Bước 3: Khởi tạo (Init)

```bash
ARENA init --agents N --seed S --task-file .arena/task.md --baseline-file .arena/baseline.md
```

Bỏ qua `--baseline-file` nếu không có câu trả lời cũ, và bỏ qua `--seed` để nhận ngẫu nhiên. Lệnh `init` sẽ sao chép nhiệm vụ vào thư mục của lượt chạy, phát cho mỗi đấu thủ một thẻ chiến lược khác biệt không trùng lặp, chia cặp cho vòng 1 và ghi tệp `arena.json`.

## Bước 4: Vòng lặp điều phối (The Loop)

Luôn điều khiển tiến trình bằng `ARENA next`. Lệnh này đọc trạng thái trên đĩa và cho bạn biết bước tiếp theo cùng prompt cần truyền cho sub-agent:

1. **Khởi tạo lời giải (Spawn phase)**: Mỗi tác tử giải bài theo thẻ chiến lược riêng và lưu lời giải vào thư mục đấu thủ của mình.
2. **Tấn công (Attack phase)**: Đấu thủ A và B đọc lời giải của nhau, chỉ ra các lỗ hổng logic, thiếu sót, hoặc trường hợp biên bị bỏ qua.
3. **Phòng thủ & Nâng cấp (Defend phase)**: Từng đấu thủ tiếp thu phản biện, tự giải trình và nộp bản giải pháp cải tiến v2.
4. **Trọng tài chấm điểm (Judge phase)**: Trọng tài độc lập đọc rubric và bản so sánh, chấm điểm định lượng để chọn người thắng cuộc bước tiếp vào vòng trong.

Lặp lại cho đến trận chung kết.

## Bước 5: Báo cáo kết quả cuối cùng

Khi giải đấu kết thúc, xuất trình giải pháp vô địch kèm tóm tắt:
- Thẻ chiến lược đã chiến thắng giải đấu.
- Các vòng đối đầu then chốt và những cải tiến vượt bậc qua từng vòng.
- Đối chiếu trực tiếp với câu trả lời gốc (baseline) để chứng minh tính ưu việt.
