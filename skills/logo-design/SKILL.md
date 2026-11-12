---
name: logo-design
description: Skill thiết kế logo và brand mark chuyên nghiệp, từ brief đến file sản xuất — biến Claude (hoặc Gemini CLI, Codex CLI, Cursor, GitHub Copilot, OpenCode) thành nhà thiết kế bản sắc kỷ luật. Bao trùm: khai thác và design brief, word mapping, chọn loại mark (wordmark, monogram, letterform, pictorial, abstract, emblem, mascot, combination), dựng SVG hình học sạch, tinh chỉnh quang học (overshoot, bone effect, irradiation), màu và typography, lockup, kiểm thử (16px, một màu, đảo màu, squint, shelf test cạnh đối thủ), trình bày cho khách, xuất variant và brand guidelines. Kèm thư viện tra cứu 1.400+ logo SVG thực tế phân loại theo loại mark/kỹ thuật/hình học/chủ đề/mood/ngành, và tool Python không dependency: audit SVG, bảng concept, test sheet, presentation board theo ngành, render PNG, xuất favicon/app-icon/web-manifest. Luôn dừng ở checkpoint để khách chọn hướng trước khi làm full kit.
license: MIT
compatibility: Claude Code, Claude.ai/Desktop, Gemini CLI, Codex CLI, Cursor, GitHub Copilot, OpenCode (chuẩn Agent Skills; tool là Python thuần không dependency)
version: 2026-11-12
---

# Logo Design Skill (Việt hóa)

> Nguồn gốc: https://github.com/kaankiziltug/logo-design-skill - MIT. Bản gốc tiếng Anh xem `SKILL.en.md`; phân tích chi tiết xem `PHAN-TICH.md`.

## Dùng để làm gì
Đưa AI thành **nhà thiết kế bản sắc doanh nghiệp kỳ cựu**. Nguyên tắc cốt lõi: *logo là định danh, không phải giải thích* — một mark đơn giản, khác biệt, liên quan, chạy được cả ở 16px lẫn trên tòa nhà, một màu, dùng cho hàng chục năm. Nhiệm vụ: tìm MỘT ý tưởng rõ ràng, dựng bằng tay nghề, chứng minh nó chạy được, và trình bày để được đánh giá đúng tiêu chí.

Quy trình: Brief → Research (quy ước ngành trong thư viện) → Concept (8-12 one-liner, dựng 3 ý tưởng SVG) → Test & refine (audit → 16px → một màu → shelf test) → **Checkpoint: dừng lại, trình bày concepts + khuyến nghị, chờ chọn hướng** → mới làm full kit (màu, lockup, board, icon, guidelines).

## Cài đặt
```sh
# Claude Code - plugin marketplace (khuyến nghị)
/plugin marketplace add kaankiziltug/logo-design-skill
/plugin install logo-design@logo-design-skill

# Claude Code - thủ công
git clone https://github.com/kaankiziltug/logo-design-skill.git
cp -r logo-design-skill/skills/logo-design ~/.claude/skills/logo-design      # cá nhân
#   hoặc vào .claude/skills/logo-design của repo                              # theo dự án

# Claude.ai / Claude Desktop: tải logo-design.zip từ Releases rồi upload ở Settings → Capabilities → Skills
# (bị giới hạn dung lượng thì dùng logo-design-lite.zip — bỏ các file SVG)

# Gemini CLI / Codex CLI / agent khác: copy thư mục skill vào skills của agent
```

## Bảng chế độ
| Người dùng muốn | Chế độ | Bắt đầu từ |
|---|---|---|
| Logo mới | **Design** (track đầy đủ hoặc fast track) | Phase 1 |
| Feedback cho một logo | **Critique** | `references/critique.md` |
| Hiện đại hóa / thay logo | **Redesign** | `references/redesign.md` rồi các phase Design |
| Guidelines, sub-brand, pattern, motion | **System** | `references/identity-system.md` |
| Favicon/app icon/variant từ mark sẵn có | **Assets** | `scripts/export_variants.py` |

**Fast track** (khách cần kết quả ngay, ít thông tin): hỏi tối đa 5 câu trong một tin nhắn, hoặc bỏ hỏi — nêu giả định rồi đi thẳng vào 3 concepts.

## Điểm mạnh / lưu ý
- **Mạnh:** kỷ luật quy trình thật (checkpoint dừng đúng chỗ — kit chỉ làm cho hướng đã được duyệt); thư viện 1.400+ logo thật để học cấu trúc và tránh trông giống ai (chuyên để tham khảo, KHÔNG để chép); bộ test định lượng hiếm có (16px pixel test, một màu, đảo màu, squint, mirror, shelf test cạnh đối thủ); tool Python không dependency; có test suite CI; hỗ trợ đa agent.
- **Lưu ý:** đầy đủ nhất khi dùng kèm thư viện SVG (bản lite bỏ SVG); là skill kèm script → bot xem xét trước khi cài.
