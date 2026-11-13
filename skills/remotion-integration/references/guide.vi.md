# remotion-integration — hướng dẫn tiếng Việt

Hướng dẫn tích hợp Remotion để tạo video bằng React; dẫn đến skill remotion-best-practices chính thức theo commit. Mục tham chiếu đang chờ xem xét giấy phép, chưa sao chép bộ skill của Remotion vào kho.

## Cách dùng và giới hạn

Đây là mục tham chiếu do Limix Skill Hub biên soạn, không phải bản sao skill chính thức. Remotion cung cấp `remotion-best-practices` trong repository của họ. Bản nguồn đã được xác định theo commit và hash để đối chiếu, nhưng chưa phân phối lại core/reference/script trong kho vì giấy phép riêng cần được xem xét.

Dùng liên kết nguồn trong `references/source.en.md` để đọc tài liệu chính thức. Chưa cài Remotion, chưa mở Studio hoặc render. Không tự chọn gói trả phí hay coi giấy phép phần mềm là giấy phép của mọi tài sản media.

## Tool/Framework cần chuẩn bị

| Phạm vi | Yêu cầu |
|---|---|
| Cơ bản | Node.js, một package manager, React + React DOM, `remotion`, `@remotion/cli` |
| Render local | Chrome/Chrome Headless Shell tương thích và binary compositor/FFmpeg/ffprobe của Remotion; v4 không mặc định cần cài FFmpeg toàn máy |
| Render qua Node API | Thêm `@remotion/renderer`, `@remotion/bundler` |
| Player trên website | Thêm `@remotion/player`; không đồng nghĩa đã xuất được video |
| 3D | Chỉ khi cần: `@remotion/three`, `three`, `@react-three/fiber` và WebGL |
| Cloud, AI, phụ đề, font, hiệu ứng | Chỉ thêm gói/provider tương ứng với tác vụ; không bắt buộc cho mọi video |

Tất cả gói `remotion`/`@remotion/*` trong dự án phải cùng phiên bản chính xác. Tôn trọng lockfile và peer dependencies của template. Tài liệu chính thức nêu Node tối thiểu 16, nhưng template/gói được chọn có thể yêu cầu cao hơn; dùng LTS còn hỗ trợ đáp ứng yêu cầu thực tế. Next.js, Tailwind, Three.js, tài khoản cloud và dịch vụ AI không phải yêu cầu mặc định.

Xem [requirements.en.md](requirements.en.md) để có đầy đủ yêu cầu nền tảng, gói bắt buộc/tùy chọn, lệnh cài đặt tham khảo và bước kiểm chứng render. Chỉ tải reference này khi chuẩn bị môi trường hoặc xử lý lỗi; chưa chạy các lệnh đó trên máy nào.

## Ví dụ tác vụ

- Dùng Remotion dựng video giới thiệu sản phẩm bằng React.
- Tìm hướng dẫn chính thức về composition và render Remotion.

## Tải tài liệu theo nhu cầu

Tìm bằng tên/mô tả/aliases trong manifest. Khi kích hoạt mới đọc SKILL.md; reference chỉ đọc khi cần. Không nạp hai bản tài liệu đầy đủ trùng nội dung. Không dịch API, tên Tool, CLI, biến hay đường dẫn.

Trạng thái: **quarantined**. Chưa tự bật skill/tool hoặc chạy script từ nguồn. Nguồn: https://github.com/remotion-dev/remotion/tree/bc7b1c44215249948356d070b43ae6e58a6adde3.
