# Bảo trì Hybrid Skills

Phạm vi: kho nội dung limix-skill-hub và công cụ bảo trì kho. Không thay mã nguồn, Skill Loader, giao diện hoặc sandbox đang chạy của Limix Bot.

## Cấu trúc

- `SKILL.md`: core kỹ thuật từ commit nguồn, giữ nguyên byte khi nguồn đã xác minh. Tên/API/CLI/script/đường dẫn không được dịch.
- `references/guide.vi.md`: hướng dẫn tiếng Việt ngắn. Không chứa bản dịch đầy đủ core.
- `references/analysis.vi.md`: phân tích cũ được giữ lại nếu có, chỉ là bình luận; số liệu có thể cũ.
- `manifest.json`: metadata tương thích Hybrid, aliases/keywords tiếng Việt, hash và trạng thái. Metadata không cấp quyền thực thi.
- `_hub.source.json`: danh sách hash của từng file nguồn đã giữ, các file loại trừ và vị trí backup. `verified:false` không được coi là bản gốc.
- `_hub.json`: số liệu và định danh tương thích với catalog hiện có.

Khi tìm chỉ nạp metadata ngắn. Khi kích hoạt mới đọc core của skill được chọn. Chỉ đọc reference cần thiết. Không tự động nạp cả hai bản tài liệu đầy đủ.

## Đồng bộ và kiểm tra

Chạy từ thư mục repo, Node >=20:

```sh
node tools/migrate-hybrid.mjs
node tools/finalize-hybrid.mjs
node tools/verify-hybrid.mjs
node tools/build-catalog.mjs
npm test
```

Lần chạy lại kiểm tra hash của core và mọi script/file nguồn trước khi trả `unchanged`; không tải lại skill đã chuyển. Chỉ dùng `--update` khi chủ động lấy phiên bản nguồn mới; không tự kích hoạt cập nhật. Bản tiếng Việt được giữ nếu core hash không đổi.

`tools/discover.mjs` giữ nguyên mục Hybrid đã có, báo cần qua quy trình curation thay vì xóa lớp tiếng Việt. Quy trình hằng ngày của bot chịu trách nhiệm chuẩn bị, quét và kiểm tra trước khi phát hành catalog. Đây không phải hệ thống tự thực thi script từ GitHub.

## Sao lưu và rollback

Backup tại `migration-backups/2026-11-13/<id-cũ>/`, cache nguồn bất biến tại `source-cache/<id>/<commit>/`. Các thư mục này được giữ trên máy làm việc và bỏ qua khi commit để không nhân đôi toàn bộ kho. Khi clone mới, có thể đối chiếu nguồn bằng commit và hash đã phát hành; rollback về phiên bản cũ bằng lịch sử Git.

Trên máy có backup, phục hồi chính xác trước chuyển đổi bằng:

```sh
node tools/rollback-hybrid.mjs <skill-id>
node tools/build-catalog.mjs
```

Bản Hybrid vừa thay thế được giữ trong `rollback-snapshots/`. Công cụ từ chối nếu tên đích đã tồn tại. Không dùng rollback trên thư viện đang có người khác chỉnh sửa.

Cập nhật các phiên bản Hybrid lưu bản trước trong `version-backups/<id>/<commit>/`; dùng `node tools/rollback-hybrid.mjs <skill-id> --commit <SHA-40-ký-tự>` để phục hồi chính xác phiên bản đã lưu. Các bản lưu này cũng chỉ nằm trên máy làm việc.

## Giới hạn bằng chứng

Đối chiếu commit/hash chỉ chứng minh nguồn gốc byte. Quét tĩnh có thể bỏ sót nguy cơ và báo nhầm; mọi gói cần duyệt, gói chưa xác minh hoặc có nguy cơ cao phải cách ly. File bị loại do giới hạn đường dẫn, binary lớn, LFS, nested skill hoặc kích thước được ghi rõ; gói thiếu không được xem là tương thích.

Chưa đo task success, tool selection, token, latency, lỗi thực thi hay vi phạm quyền bằng model/provider thật. Không suy ra hiệu năng hoặc an toàn runtime từ kiểm tra nội dung. Kho không áp đặt được sandbox của ứng dụng sử dụng nó.

Nguồn quy trình: yêu cầu Hybrid Skills và lời làm rõ của Leo ngày 13/11/2026, trong cuộc trò chuyện với bot Update skills.
