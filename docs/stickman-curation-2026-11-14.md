# Cập nhật Stickman Video Director — 14/11/2026

Mục cũ `stickman-video-director` là wrapper chưa xác minh. Thay bằng tên nguyên gốc `directing-stickman-videos`, giữ tên cũ trong aliases và giữ lịch sử phiên bản cũ trong registry. Số skill vẫn là 51; 50 mục khác giữ nguyên dữ liệu catalog. README vẫn có 10 mục.

## Nguồn và giới hạn gói

- Repo: https://github.com/kaomei/stickman-video-director
- Commit ghim: `b0866bcfd49d1121cd235c2445fa3d8cce307f53`.
- Entry: `skills/directing-stickman-videos/SKILL.md`.
- SHA-256 core: `e627f4ce8df64d72f8cdefb0aa517d554bcd8b6ee09cee5b0bd07f9f637775fe`.
- 196 file upstream, tổng 4.036.000 byte, đối chiếu byte trực tiếp với Git blob ở commit ghim. Không dịch hoặc sửa core/script/license. Giữ MIT và các notice/attribution văn bản; không coi MIT của repo là giấy phép mới cho giọng đọc hay nhãn hiệu bên thứ ba.
- 518 đường dẫn loại khỏi gói: showcase/phông và media nhị phân chưa duyệt, đường dẫn không phù hợp hoặc vượt hạn mức 200 file/16 MB của Hub. Danh sách đầy đủ trong `_hub.source.json`; không chuyển các file thiếu thành dependency npm/pip.
- Trạng thái `quarantined`, compatibility `incompatible`. Bộ quét còn gắn cờ prompt-injection trong ba reference và base64 trong hai SVG; đây là quy tắc tĩnh, cần duyệt nội dung, không tự kết luận độc hại hay an toàn.

## Requirements có bằng chứng

| Yêu cầu | Bằng chứng / phạm vi |
|---|---|
| Node.js >=20 | `package.json:7`, engines |
| @napi-rs/canvas 0.1.100, sharp 0.35.5 | `package.json:8`, dependencies; lockfile giữ nguyên |
| FFmpeg, FFprobe | `references/autopilot.md:31`, yêu cầu Autopilot; catalog giữ installer ID ffmpeg |
| Python >=3.9 cho kiểm tra B6 | `scripts/autopilot.mjs:21`; chưa kiểm tra máy đích |
| numpy==2.0.2, Pillow==11.3.0, opencv-python-headless==4.13.0.92 | `assets/b6/hong-kong-v90/requirements.txt:1–3`, ví dụ V90; không mặc định mọi tuyến cần cả ba |
| Image/video/TTS theo tuyến | `references/autopilot.md:31–43`; cần công cụ/provider/quota thật, không có thuê bao kèm gói |

Manifest có `requiredCapabilities` và quyền shell, filesystem-read, filesystem-write, network. Catalog có `requirements.detected` kèm file/dòng, trạng thái declared/import-hint/mention-hint; tên import Python không tự biến thành tên distribution. Các gợi ý React/Rust hoặc công cụ thay thế không chứng minh phải cài cho mọi tác vụ. Không tự cài đặt (`autoInstall=false`), môi trường `not-tested`. App có thể chưa đọc phần mở rộng requirements; chưa kiểm thử nhập/quét trong app. Không sửa mã nguồn ứng dụng Limix Bot.

## Bằng chứng kiểm tra

- `npm run catalog`: `requirements: 0 local manifests updated`; `catalog: 51 skills, 0 problems` sau khi dữ liệu ổn định.
- `npm test`: 24 tests, 24 pass, 0 fail, 0 skipped.
- Đối chiếu trực tiếp 196 file với upstream Git blobs: PASS, gồm core/script/license.
- Chạy lại declare-requirements + build-catalog: manifest/catalog/checksums/versions không đổi, PASS idempotence.
- Catalog giữ nguyên 50 mục khác; không còn mục wrapper trùng; README đúng 10 hàng: PASS.
- Sao lưu Git bundle trước cập nhật: `git bundle verify` PASS. Khôi phục bản sao thư mục cũ vào thư mục kiểm tra độc lập và đối chiếu file với HEAD trước sửa: PASS.
- Sau staging chạy `node tools/verify-git-bytes.mjs` để xác minh cả byte trong index và executable flags trước commit.

Một lần gọi npm ở thư mục tác vụ thay vì thư mục repo đã lỗi ENOENT do không có package.json; đã chạy lại trong repo và các lệnh trên trả exit 0. Một lần đọc blob qua `git show SHA:path` gặp giới hạn đường dẫn Windows; chuyển sang `git cat-file blob <object-id>` và đã đối chiếu đầy đủ.

Không chạy script/test upstream, npm ci, pip install, doctor, renderer, provider hoặc dịch vụ tính phí. Các kiểm tra trên chỉ chứng minh đóng gói/metadata/integrity tĩnh, chưa chứng minh sản xuất MP4 hoặc mức tương thích runtime.

## Khôi phục

Trước sửa đã lưu `rollback-before-stickman.bundle` và `rollback-stickman-original/` bên ngoài checkout, trong thư mục tác vụ hiện tại. Bản nguồn mới có cache và inventory theo SHA; lịch sử bản cũ vẫn trong Git. Nếu cần hoàn tác bản đã công bố, dùng `git revert <commit-cập-nhật-này>` để khôi phục cả tên thư mục, manifest, README và registry; không reset/force push. Bản sao khôi phục độc lập đã được kiểm tra; chưa thực hiện revert trên nhánh dùng chung.
