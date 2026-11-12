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

Mỗi thư mục `skills/<id>/` gồm `SKILL.md` (Việt hóa, frontmatter chuẩn hub), `SKILL.en.md` (trích bản gốc tiếng Anh) và `PHAN-TICH.md` (phân tích: sao, ngày tạo, lý do chọn, mức phù hợp). Cột **Sao** dùng badge động tự cập nhật theo GitHub thời gian thực; số đo gần nhất ghi trong `PHAN-TICH.md` của từng skill.

| Skill | Nguồn | Sao | Tạo | Chạy | Phù hợp Limix Bot |
|---|---|---:|---|---|---|
| [anatomy](skills/anatomy/SKILL.md) | [wheresryan22/anatomy](https://github.com/wheresryan22/anatomy) | ![](https://img.shields.io/github/stars/wheresryan22/anatomy?style=social) | 2026-10-08 | 2026-11-12 (lần 1/30) | Minh họa kỹ thuật tương tác cho explainer/docs |
| [unslop](skills/unslop/SKILL.md) | [heydamir/unslop](https://github.com/heydamir/unslop) | ![](https://img.shields.io/github/stars/heydamir/unslop?style=social) | 2026-10-29 | 2026-11-12 (lần 1/30) | Duyệt thẩm mỹ UI do agent tự dựng |
| [geo-sleuth](skills/geo-sleuth/SKILL.md) | [Oldcircle/geo-sleuth](https://github.com/Oldcircle/geo-sleuth) | ![](https://img.shields.io/github/stars/Oldcircle/geo-sleuth?style=social) | 2026-09-18 | 2026-11-12 (lần 1/30) | Xác minh nơi chụp ảnh (dùng có điều kiện) |
| [answer-me-with-html](skills/answer-me-with-html/SKILL.md) | [QingYunA/answer-me-with-html](https://github.com/QingYunA/answer-me-with-html) | ![](https://img.shields.io/github/stars/QingYunA/answer-me-with-html?style=social) | 2026-10-02 | 2026-11-12 (lần 1/30) | Báo cáo/giải thích dạng trang HTML |
| [stack-diagram](skills/stack-diagram/SKILL.md) | [caru-ini/stack-diagram](https://github.com/caru-ini/stack-diagram) | ![](https://img.shields.io/github/stars/caru-ini/stack-diagram?style=social) | 2026-11-01 | 2026-11-12 (lần 1/30) | Sơ đồ kiến trúc có logo chính hãng |
| [universal-modder](skills/universal-modder/SKILL.md) | [rehan-remade/universal-modder](https://github.com/rehan-remade/universal-modder) | ![](https://img.shields.io/github/stars/rehan-remade/universal-modder?style=social) | 2026-09-30 | 2026-11-12 (lần 2/30) | Mod game PC bằng agent (13 skill + CLI `um`) |
| [replica-skill](skills/replica-skill/SKILL.md) | [Jakeschincariol/replica-skill](https://github.com/Jakeschincariol/replica-skill) | ![](https://img.shields.io/github/stars/Jakeschincariol/replica-skill?style=social) | 2026-10-03 | 2026-11-12 (lần 2/30) | Clone sạch (clean-room) một app, từ recon đến deploy |
| [pixelfx](skills/pixelfx/SKILL.md) | [patch-gg/pixelfx](https://github.com/patch-gg/pixelfx) | ![](https://img.shields.io/github/stars/patch-gg/pixelfx?style=social) | 2026-10-30 | 2026-11-12 (lần 2/30) | 244 hiệu ứng pixel art bằng code, xuất sprite sheet |
| [janestreet-agent-skills](skills/janestreet-agent-skills/SKILL.md) | [janestreet/agent_skills](https://github.com/janestreet/agent_skills) | ![](https://img.shields.io/github/stars/janestreet/agent_skills?style=social) | 2026-11-03 | 2026-11-12 (lần 2/30) | Gia sư Socratic có cấu trúc (skill chính thức Jane Street) |
| [logo-design-skill](skills/logo-design-skill/SKILL.md) | [kaankiziltug/logo-design-skill](https://github.com/kaankiziltug/logo-design-skill) | ![](https://img.shields.io/github/stars/kaankiziltug/logo-design-skill?style=social) | 2026-09-26 | 2026-11-12 (lần 2/30) | Thiết kế logo/brand có checkpoint + thư viện 1.400+ SVG |
| [day-trader-skill](skills/day-trader-skill/SKILL.md) | [Jakeschincariol/day-trader-skill](https://github.com/Jakeschincariol/day-trader-skill) | ![](https://img.shields.io/github/stars/Jakeschincariol/day-trader-skill?style=social) | 2026-10-20 | 2026-11-12 (lần 3/30) | Day-trading có kỷ luật rủi ro (broker mặc định paper, chờ duyệt) |
| [ffmpeg-skill](skills/ffmpeg-skill/SKILL.md) | [kajisho5/ffmpeg-skill](https://github.com/kajisho5/ffmpeg-skill) | ![](https://img.shields.io/github/stars/kajisho5/ffmpeg-skill?style=social) | 2026-09-03 | 2026-11-12 (lần 3/30) | Dựng video cục bộ: 42 tool ffmpeg + self-check |
| [tstack](skills/tstack/SKILL.md) | [t3dotgg/tstack](https://github.com/t3dotgg/tstack) | ![](https://img.shields.io/github/stars/t3dotgg/tstack?style=social) | 2026-10-24 | 2026-11-12 (lần 3/30) | Quy trình PR hằng ngày: council review, file-pr, babysit |
| [teardown](skills/teardown/SKILL.md) | [elvarofficial/teardown](https://github.com/elvarofficial/teardown) | ![](https://img.shields.io/github/stars/elvarofficial/teardown?style=social) | 2026-10-30 | 2026-11-12 (lần 3/30) | Mô phỏng 3D tháo-rời của cỗ máy, explainer có số thật |
| [oil-ui](skills/oil-ui/SKILL.md) | [oil-oil/oil-ui](https://github.com/oil-oil/oil-ui) | ![](https://img.shields.io/github/stars/oil-oil/oil-ui?style=social) | 2026-09-30 | 2026-11-12 (lần 3/30) | UI/UX cho sản phẩm: preview duyệt trước, kiểm tra screenshot |
| [instagram-agent-skill](skills/instagram-agent-skill/SKILL.md) | [Jakeschincariol/instagram-agent-skill](https://github.com/Jakeschincariol/instagram-agent-skill) | ![](https://img.shields.io/github/stars/Jakeschincariol/instagram-agent-skill?style=social) | 2026-09-13 | 2026-11-12 (lần 4/30) | 13 skill điều hành Instagram: hook chấm điểm, caption linter, humanizer |
| [anything2explainer](skills/anything2explainer/SKILL.md) | [Vincentwei1021/anything2explainer](https://github.com/Vincentwei1021/anything2explainer) | ![](https://img.shields.io/github/stars/Vincentwei1021/anything2explainer?style=social) | 2026-09-08 | 2026-11-12 (lần 4/30) | Chủ đề → video explainer có thuyết minh, mọi frame vẽ bằng code (phi thương mại) |
| [stageshow](skills/stageshow/SKILL.md) | [benjitaylor/skills](https://github.com/benjitaylor/skills) | ![](https://img.shields.io/github/stars/benjitaylor/skills?style=social) | 2026-10-26 | 2026-11-12 (lần 4/30) | Faux product UI marketing-grade: kit React + 40 gold example + gate tự kiểm |
| [claude-animated-shorts](skills/claude-animated-shorts/SKILL.md) | [mromidev/claude-animated-shorts](https://github.com/mromidev/claude-animated-shorts) | ![](https://img.shields.io/github/stars/mromidev/claude-animated-shorts?style=social) | 2026-11-01 | 2026-11-12 (lần 4/30) | Short hoạt hình 2D/3D dọc 55-70s: three.js + Remotion, look đã đo bằng số |
| [golive](skills/golive/SKILL.md) | [mikehasa/golive-skill](https://github.com/mikehasa/golive-skill) | ![](https://img.shields.io/github/stars/mikehasa/golive-skill?style=social) | 2026-09-23 | 2026-11-12 (lần 4/30) | App agent-built lên production: plan duyệt trước, verify, teardown |
