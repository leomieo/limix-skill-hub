---
name: agent-autoloop
description: "Cấu hình trung tâm tự động hóa cho AI Agent: thiết lập quy tắc, tích hợp webhook sự kiện (GitHub, cảnh báo ops, hệ thống nội bộ), điều phối agent nền, định tuyến thông báo và thẻ tương tác phê duyệt (Feishu, DingTalk, QQ, desktop notification), theo dõi token và chi phí."
---

# agent-autoloop: Trung tâm tự động hóa cho AI Agent

Tự động hóa tác vụ ngầm cho AI Agent: nhận việc tự động, theo dõi tiến độ, xử lý sự kiện bất đồng bộ; bình thường âm thầm làm việc không làm phiền người dùng, chỉ đẩy thẻ tương tác khi gặp quyết định không chắc chắn hoặc cần phê duyệt.

Mã nguồn tại `~/.agent-autoloop/app`, tệp quy tắc tại `~/.agent-autoloop/rules.json`, tệp cấu hình tại `~/.agent-autoloop/config.json`.

## Xem trạng thái và phản hồi

- `agent-autoloop status`: Liệt kê agent nào đang online, đang chờ gì ở người dùng, đang làm gì, lịch sử xử lý, kèm thống kê số vòng chạy, lượng Token tiêu thụ (bao gồm tỷ lệ cache) và chi phí trong 7 ngày qua.
- `agent-autoloop status --json`: Xuất cấu trúc JSON nguyên bản phục vụ script hoặc dashboard theo dõi.
- `agent-autoloop answer <thẻ> <lựa-chọn>`: Trả lời câu hỏi trên thẻ tương tác của agent.
- `agent-autoloop resolve <thẻ> <kết-quả>`: Kết thúc một vụ việc.
- `agent-autoloop stop <vòng-thứ>`: Dừng khẩn cấp một phiên chạy của agent.

## Cấu trúc quy tắc (rules.json)

Mỗi quy tắc trong `rules.json` trả lời 5 câu hỏi cốt lõi:
1. **Sự kiện gì** (`when`): Lịch trình cron, webhook sự kiện GitHub, tín hiệu cảnh báo...
2. **Giao cho ai** (`to`): Tên agent xử lý (claude, codex, dsh, hermes...).
3. **Tại đâu** (`cwd`): Thư mục làm việc trên máy tính.
4. **Làm theo hướng dẫn nào** (`skill`, `prompt`): Kỹ năng hoặc câu lệnh giao việc.
5. **Có báo cho người dùng không** (`tell`): Mặc định chỉ thông báo khi có thẻ cần người dùng duyệt.

Ví dụ quy tắc:
```json
{ "name": "Xử lý issue GitHub", "when": { "source": "github", "types": ["issues.opened"] }, "to": "claude", "cwd": "~/code/app", "skill": "handle-issue", "parallel": 3 }
{ "name": "Báo cáo sáng", "when": { "cron": "0 9 * * *" }, "to": "codex", "cwd": "~/notes", "prompt": "Soạn báo cáo đầu ngày." }
```

## Cơ chế điều phối và song song

- **Chạy song song (`parallel`):** Cho phép xử lý độc lập nhiều sự kiện cùng lúc mà không phải chờ nhau, giới hạn bởi dung lượng tối đa `worker.capacity`.
- **Phân nhóm công việc (`group`):** Gom các tác vụ dài hơi vào nhóm `batch` với hạn ngạch song song nhỏ hơn `capacity`, chừa sẵn tài nguyên cho các hội thoại tin nhắn cần phản hồi tức thì.
- **Tiếp nối ngữ cảnh (`resume: true`):** Giữ nguyên phiên hội thoại trước đó cho cùng một đối tượng (ví dụ: các tin nhắn tiếp theo trong cùng một thread), thay vì mở mới một phiên từ đầu.
- **Quản lý quy tắc:** Tạm dừng một quy tắc bằng `agent-autoloop pause <tên-quy-tắc>`, khôi phục bằng `resume`, phát lại các sự kiện bị bỏ lỡ bằng `replay --since <thời-gian>`.

## Tích hợp nguồn sự kiện (Event Sources)

1. **HTTP trực tiếp:** Bên ngoài gọi `POST /v1/events` kèm API key do `agent-autoloop key new source <tên>` cấp.
2. **Webhook chuyên dụng:** Viết bộ adapter dịch webhook (ví dụ webhook từ GitHub, GitLab, Sentry) tại `plugins/<tên>/source.ts`.
3. **Polling định kỳ:** Chạy script thăm dò định kỳ (cron job) để kiểm tra trạng thái và phát sự kiện khi phát hiện dữ liệu mới.

## Kênh thông báo (Channels)

- **Thông báo Desktop:** Mặc định hỗ trợ khay hệ thống (System Tray) trên Windows (qua PowerShell), macOS (`osascript`) và Linux (`notify-send`).
- **Ứng dụng chat doanh nghiệp:** Tích hợp Lark/Feishu, DingTalk, WeChat Work qua thẻ card tương tác có nút bấm phản hồi một chạm.
