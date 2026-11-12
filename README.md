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

## Skill đã Việt hóa

Mỗi thư mục `skills/<id>/` gồm `SKILL.md` (Việt hóa, frontmatter chuẩn hub), `SKILL.en.md` (trích bản gốc tiếng Anh) và `PHAN-TICH.md` (phân tích: sao, ngày tạo, lý do chọn, mức phù hợp). Số sao đo tại thời điểm chạy.

| Skill | Nguồn | Sao | Tạo | Chạy | Phù hợp Limix Bot |
|---|---|---:|---|---|---|
| [anatomy](skills/anatomy/SKILL.md) | [wheresryan22/anatomy](https://github.com/wheresryan22/anatomy) | 26.861 | 2026-10-08 | 2026-11-12 (lần 1/30) | Minh họa kỹ thuật tương tác cho explainer/docs |
| [unslop](skills/unslop/SKILL.md) | [heydamir/unslop](https://github.com/heydamir/unslop) | 14.847 | 2026-10-29 | 2026-11-12 (lần 1/30) | Duyệt thẩm mỹ UI do agent tự dựng |
| [geo-sleuth](skills/geo-sleuth/SKILL.md) | [Oldcircle/geo-sleuth](https://github.com/Oldcircle/geo-sleuth) | 6.894 | 2026-09-18 | 2026-11-12 (lần 1/30) | Xác minh nơi chụp ảnh (dùng có điều kiện) |
| [answer-me-with-html](skills/answer-me-with-html/SKILL.md) | [QingYunA/answer-me-with-html](https://github.com/QingYunA/answer-me-with-html) | 6.264 | 2026-10-02 | 2026-11-12 (lần 1/30) | Báo cáo/giải thích dạng trang HTML |
| [stack-diagram](skills/stack-diagram/SKILL.md) | [caru-ini/stack-diagram](https://github.com/caru-ini/stack-diagram) | 2.435 | 2026-11-01 | 2026-11-12 (lần 1/30) | Sơ đồ kiến trúc có logo chính hãng |
| [universal-modder](skills/universal-modder/SKILL.md) | [rehan-remade/universal-modder](https://github.com/rehan-remade/universal-modder) | 9.634 | 2026-09-30 | 2026-11-12 (lần 2/30) | Mod game PC bằng agent (13 skill + CLI `um`) |
| [replica-skill](skills/replica-skill/SKILL.md) | [Jakeschincariol/replica-skill](https://github.com/Jakeschincariol/replica-skill) | 9.041 | 2026-10-03 | 2026-11-12 (lần 2/30) | Clone sạch (clean-room) một app, từ recon đến deploy |
| [pixelfx](skills/pixelfx/SKILL.md) | [patch-gg/pixelfx](https://github.com/patch-gg/pixelfx) | 7.103 | 2026-10-30 | 2026-11-12 (lần 2/30) | 244 hiệu ứng pixel art bằng code, xuất sprite sheet |
| [janestreet-agent-skills](skills/janestreet-agent-skills/SKILL.md) | [janestreet/agent_skills](https://github.com/janestreet/agent_skills) | 6.983 | 2026-11-03 | 2026-11-12 (lần 2/30) | Gia sư Socratic có cấu trúc (skill chính thức Jane Street) |
| [logo-design-skill](skills/logo-design-skill/SKILL.md) | [kaankiziltug/logo-design-skill](https://github.com/kaankiziltug/logo-design-skill) | 6.703 | 2026-09-26 | 2026-11-12 (lần 2/30) | Thiết kế logo/brand có checkpoint + thư viện 1.400+ SVG |

## Việt hóa và chấm thử
Do một bot chạy trên máy chủ bot (Limix Bot của chủ kho) thực hiện, rồi ghi `_hub.review.json` và `SKILL.vi.md` vào repo này. Hub không giữ khóa AI nào.

## Chạy thử
```
npm test
node tools/build-catalog.mjs
GITHUB_TOKEN=... node tools/discover.mjs --dry
```
