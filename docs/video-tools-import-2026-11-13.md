# Bổ sung Hyperframes, Remotion, Three.js và FFmpeg

Yêu cầu trực tiếp của Leo ngày 13/11/2026. Phạm vi là kho Skills và tài liệu tích hợp, không cài phần mềm hoặc chạy media/render.

| Mục mới | Commit upstream đã ghim | Nguồn core trong kho |
|---|---|---|
| `hyperframes` | `d208281091b1c00db1724a2ee3db0055955eb41b` | Skill chính thức ở `skills/hyperframes`; 81 file gồm core, reference, script, assets và Apache license được đối chiếu Git blob/SHA-256 |
| `remotion-integration` | `bc7b1c44215249948356d070b43ae6e58a6adde3` | Adapter tham chiếu do Hub biên soạn; core chính thức chỉ được dẫn link, chưa phân phối lại |
| `threejs-development` | `acf77e4c7ea413a0a9638baacef3d78e254b2cac` | Adapter do Hub biên soạn; ba file README, LICENSE và package.json nguyên byte từ upstream |
| `ffmpeg-cli` | `88c46fce27e311c73772d9b83db4047dd83b1294` | Adapter do Hub biên soạn; bảy file README/license/CLI nguyên byte từ upstream |

Mỗi mục có `manifest.json`, aliases/keywords tiếng Việt, `references/guide.vi.md`, nguồn/commit/hash và inventory `_hub.source.json`. `upstreamPath` và `origin` phân biệt file chính thức với nội dung Hub tự viết. `originalCoreVerified` chỉ true cho Hyperframes; không gắn nhãn skill chính thức cho Three.js hoặc FFmpeg vì không có SKILL.md trong toàn bộ Git tree đã kiểm tra.

## Trạng thái và giới hạn

- Hyperframes giữ nguyên yêu cầu telemetry trong core. Chưa gửi beacon hoặc gọi npx. Core tham chiếu các skill bổ trợ `hyperframes-cli`, `hyperframes-registry`, `media-use`; chúng chưa được nhập trong gói này. Mục được cách ly để xem cả telemetry và dependency trước khi dùng; không gọi đây là bộ plugin hoàn chỉnh.
- Remotion có `remotion-best-practices` chính thức. Đã xác định entrypoint và hash, nhưng repository dùng giấy phép riêng, chưa xác minh quyền phân phối lại bộ skill vào Hub. Chỉ phát hành một wrapper tham chiếu do Hub tự viết và liên kết nguồn. Bản tải để kiểm tra nằm trong cache cục bộ không commit; không tự cài hoặc bật Remotion. Mục được cách ly.
- Three.js và FFmpeg là công cụ/thư viện. Hai core hướng dẫn do Hub tự viết không phải bản dịch hay bản gốc upstream. Bản README/license/reference được giữ nguyên byte; không đóng gói toàn bộ mã nguồn, binary hoặc dependency. Chúng chờ duyệt, chưa có xác nhận runtime.
- FFmpeg có điều kiện giấy phép theo thành phần và cấu hình build; giữ LICENSE.md cùng COPYING files. Nhãn license mặc định không đại diện mọi binary phân phối. Mục `ffmpeg-skill` cũ không bị thay đổi.

## Kiểm chứng

Kiểm tra toàn bộ 45 mục bằng `tools/verify-hybrid.mjs`; dựng lại catalog/checksums/versions; chạy `npm test`; kiểm tra byte trong Git index bằng `tools/verify-git-bytes.mjs`. Kết quả máy đọc ở [hybrid-verification.json](../migration-reports/hybrid-verification.json).

Kết quả thực tế: 45/45 mục qua kiểm tra hash/schema; 19/19 kiểm thử tự động PASS; 2.273/2.273 file đã stage khớp hash phát hành. Toàn bộ 41 entry trước đó giữ nguyên checksum; catalog có 45 tên duy nhất và dựng lại không đổi nội dung. Các con số này không phải kết quả chạy video hoặc benchmark model.

Không script upstream, package installer, provider, Studio, trình duyệt render hoặc FFmpeg nào được thực thi. Task success, tool selection, token, latency và runtime security: **NOT_TESTED**. Quét tĩnh không bảo đảm an toàn.

Các entry mới chỉ được thêm khi tên đích chưa tồn tại. Không xóa hoặc ghi đè entry cũ. Có thể rollback phần bổ sung qua lịch sử Git; cache source bất biến nằm cục bộ trong `source-cache/`.
