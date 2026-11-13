# Chuyển kho sang Hybrid — 13/11/2026

Đã chuyển cấu trúc cho toàn bộ 41 mục. Đây là nâng cấp kho nội dung và quy trình bot quản lý kho; không phải triển khai lại ứng dụng Limix Bot.

| Bằng chứng | Kết quả |
|---|---|
| Metadata Hybrid + kiểm tra hash từng file giữ lại | 41/41 PASS |
| Core đối chiếu được bản GitHub theo commit | 35/41 VERIFIED |
| File nguồn trong các inventory | 2.045 file; giữ byte, chưa chạy code |
| Gói kèm script/tool/MCP được phân loại | 23 |
| Chạy lại chuyển đổi | 41 unchanged, 0 errors |
| Catalog | 41 mục, 0 problems |
| Kiểm thử tự động của công cụ kho | 19/19 PASS |
| Byte trong Git index so với hash phát hành | 2.167/2.167 PASS; giữ cờ executable của script nguồn |
| Cách ly | 26 mục; 15 mục còn lại vẫn review-required |
| Model/provider thật, task success, tool selection, token, latency | NOT_TESTED |

## Thay đổi

- Từng skill: core gốc hoặc extract tiếng Anh cũ có đánh dấu chưa xác minh, `manifest.json`, inventory `_hub.source.json`, metadata `_hub.json`, hướng dẫn tiếng Việt riêng. Giữ script/file nguồn tải được dưới dạng inert bytes. Không tạo bản dịch đầy đủ thứ hai.
- `lib/hybrid.mjs`: lấy nguồn theo commit, đối chiếu Git blob, schema, hash từng file, sao lưu, stage/rename khi chuyển, cache bất biến, đồng bộ idempotent và rollback.
- `lib/skill-md.mjs`: đọc block scalar YAML cần cho các core gốc, không viết lại core.
- `lib/pack.mjs`: giới hạn 200 file và 16 MB phù hợp bundle.
- `tools/migrate-hybrid.mjs`, `finalize-hybrid.mjs`, `verify-hybrid.mjs`, `rollback-hybrid.mjs`: công cụ chuyển đổi/kiểm tra/phục hồi.
- `tools/build-catalog.mjs`: metadata song ngữ, kiểm tra core và script hash, fail closed và giữ catalog trước nếu có lỗi, giữ lịch sử versions.
- `tools/discover.mjs`: không xóa mục Hybrid khi phát hiện cập nhật; chuyển qua curation. Sửa đường dẫn Windows cùng `refresh-stats.mjs`.
- `.gitattributes`: không đổi line ending của file skill, tránh Git làm sai hash byte nguồn.
- `tools/verify-git-bytes.mjs`: đối chiếu trực tiếp blob đã stage với catalog và inventory trước khi phát hành.
- README, catalog, checksums và versions cập nhật theo cấu trúc mới; link cũ được chuyển sang tên core gốc, tên cũ còn trong aliases.
- Bot Update skills đã lưu quy trình riêng và nguyên tắc Hybrid; lịch 8:00 giờ Việt Nam dùng quy trình mới, không chạy thêm đợt khi ứng dụng khởi động lại.

## Giới hạn cần giữ rõ

Sáu mục chưa tìm được entrypoint tương thích đúng tên/frontmatter tại commit nguồn: `beautiful-rust`, `founder-skill`, `instagram-agent-skill`, `reanimate`, `stickman-video-director`, `youtube-agent-skill`. Chúng giữ extract tiếng Anh cũ, đánh dấu `originalCoreVerified:false`, `quarantined` và `incompatible`. Extract không có frontmatter được bọc metadata cục bộ, không được tuyên bố là core GitHub đã xác minh.

14 gói có file loại trừ do giới hạn đường dẫn, nested skill, LFS, dung lượng hoặc số file. Danh sách chính xác ở `_hub.source.json` và báo cáo JSON. Các gói này được cách ly và đánh dấu không tương thích, dù core có thể đã đối chiếu byte thành công. Không đồng nghĩa toàn bộ tool/asset của các repo này đã được đóng gói đầy đủ.

Thiếu bằng chứng license độc lập cũng dẫn đến cách ly. Nhãn license cũ trong metadata chưa đủ để xác nhận quyền sử dụng; cần xem điều khoản của từng nguồn. Scanner là quét tĩnh và có thể báo nhầm/bỏ sót. Không script bên thứ ba nào được thực thi, không quyền nào tự cấp hoặc tự bật.

Chưa đo benchmark bằng model thật và chưa kiểm tra giao diện ứng dụng, sandbox hay runtime/provider. Metadata hỗ trợ progressive loading, nhưng kho không tự áp đặt cách ứng dụng đưa tài liệu vào context. Không có kết luận tiết kiệm token hoặc tăng tốc.

## Sao lưu

Backup trước chuyển đổi: `migration-backups/2026-11-13/`; cache: `source-cache/`. Cả hai được giữ tại bản làm việc, không nhân đôi lên GitHub. Phiên bản trước vẫn nằm trong lịch sử Git. Các lần cập nhật Hybrid tiếp theo giữ `version-backups/`; rollback cũng giữ bundle vừa thay thế.

Chi tiết thao tác: [hybrid-maintenance.md](hybrid-maintenance.md). Kết quả từng mục: [hybrid-verification.json](../migration-reports/hybrid-verification.json).
