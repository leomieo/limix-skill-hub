# Limix Skill Hub

Kho kỹ năng (skill) trung tâm cho Limix Bot: tìm, quét an toàn, chấm điểm, cách ly, việt hóa và phát hành danh mục để ứng dụng tự đồng bộ.

## Cấu trúc
- `skills/<id>/` skill đã qua quét (chưa hẳn đã duyệt: xem `approval_status` trong `registry/catalog.json`)
- `quarantine/<id>/` skill có mã nguy hiểm, **không bao giờ cài được**
- `registry/catalog.json`, `versions.json`, `checksums.json` danh mục, các phiên bản và SHA-256 từng skill
- `discovery/sources.json` nguồn tìm kiếm (topic, repo, user), giới hạn mỗi lần chạy
- `lib/` quét bảo mật, phân loại (skill thuần / skill kèm tool / gói MCP), chấm điểm
- `tools/discover.mjs` tìm hằng ngày; `tools/build-catalog.mjs` dựng lại danh mục
- `.github/workflows/daily-discovery.yml` chạy 03:00 giờ Việt Nam (20:00 UTC)

## Quy tắc
- Không bao giờ chạy mã tải về. Hub chỉ đọc file dưới dạng văn bản và băm SHA-256.
- Mỗi skill được ghim vào một commit nguồn; ứng dụng kiểm tra lại checksum trước khi cài.
- Skill kèm script/MCP luôn ở trạng thái `review-required`; tool không tự cài, chủ bot bật tay.
- Không có giấy phép: tối đa 79 điểm, cần chủ bot xem xét.
- Điểm 100: 25 chức năng và tài liệu, 25 bảo mật, 20 tương thích, 15 chạy thử thật, 10 bảo trì và nguồn gốc, 5 bản dịch.
  Từ 90 xuất sắc, 80-89 khuyên dùng, 65-79 cần xem xét, dưới 65 từ chối.
- `_hub.json` (nguồn) và `_hub.review.json` (bot quản lý: bản dịch `description_vi`, điểm chạy thử, `approval`) nằm trong từng thư mục skill và không được cài vào máy.

## Việt hóa và chấm thử
Do một bot chạy trên máy chủ bot (Limix Bot của chủ kho) thực hiện, rồi ghi `_hub.review.json` và `SKILL.vi.md` vào repo này. Hub không giữ khóa AI nào.

## Chạy thử
```
npm test
node tools/build-catalog.mjs
GITHUB_TOKEN=... node tools/discover.mjs --dry
```
