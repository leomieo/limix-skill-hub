---
name: unslop
description: Skill sửa UI "vibe-coded" (nhìn là biết AI làm) thành giao diện có cá tính: quét tìm dấu vết slop (gradient tím, glow, nhãn emoji, chữ la hét, giãn cách không đều), đề xuất hướng thiết kế từ chính sản phẩm của bạn, rồi chỉnh màn hình theo từng pass (spacing → màu → icon → copy → chữ → layout → chi tiết → visuals → motion). Chạy được trên Next.js, React, Vue, Svelte, Tailwind, HTML/CSS thuần, kể cả website trực tiếp qua link; kèm tính năng quay video "story" dưới 10 giây.
license: CC BY 4.0
compatibility: Claude Code, Codex, Google Antigravity
version: 2026-11-12
---

# unslop (Việt hóa)

> Nguồn gốc: https://github.com/heydamir/unslop — CC BY 4.0 © Damir Sokolovsky (@heydamir). Bản gốc tiếng Anh xem `SKILL.en.md`; phân tích chi tiết xem `PHAN-TICH.md`.

## Dùng để làm gì
Biến UI "AI-trôn" (vibecoded slop) thành giao diện được **thiết kế thật sự, có cá tính riêng**. Skill:
1. **Audit** — liệt kê mọi dấu hiệu slop kèm vị trí: gradient tím, glow, nhãn emoji, copy la hét, giãn cách không đều.
2. **Direction** — cá tính, "thế giới", 1–2 khoảnh khắc mang màu chủ đạo, một chi tiết chữ ký — tất cả lấy từ sản phẩm của bạn, không phải từ template.
3. **Passes** — sửa theo thứ tự: spacing, màu, icon, copy, chữ, layout, chi tiết, visuals, motion.
- Hoạt động trên bất kỳ stack nào: Next.js, React, Vue, Svelte, Tailwind, HTML/CSS thuần; dashboard, app, landing page; **kể cả site trực tiếp khi bạn chỉ có một link**.
- **Visuals**: ưu tiên "show sản phẩm của bạn" thay vì khối glossy vô nghĩa; khi hero cần cảnh/đồ vật, có thể sinh ảnh qua dịch vụ (fal, Replicate, OpenAI images, Higgsfield) — luôn hiện prompt và hỏi trước mỗi lần sinh **có tốn phí**.
- **Story video**: video vuông <10 giây quay chính màn hình đang được "unslop" — cần Playwright + ffmpeg.

## Cài đặt
```bash
# Claude Code
git clone https://github.com/heydamir/unslop
mkdir -p ~/.claude/skills && cp -r unslop/skills/unslop ~/.claude/skills/
# Codex (nói với agent): $skill-installer install https://github.com/heydamir/unslop/tree/main/skills/unslop
# hoặc copy thủ công vào ~/.agents/skills/
# Google Antigravity: copy vào ~/.gemini/antigravity/skills/
```
Phụ kiện tùy chọn (chỉ khi cần snapshot site trực tiếp / story video): `npm install -D playwright && npx playwright install chromium` và ffmpeg trên PATH.

## Cách dùng
```text
/unslop this dashboard
/unslop the hero of https://example.com
/unslop my landing page and make the story video so I can post it
```
- Claude Code dùng `/unslop`, Codex dùng `$unslop`, hoặc hỏi tự nhiên là agent tự nhận.
- Skill **audit và đề xuất hướng trước khi sửa bất cứ gì** — bạn có thể chốt hướng sớm. Nếu màn hình đã ổn, nó nói vậy và chỉ đề xuất vài tinh chỉnh nhỏ, không redesign vô cớ.

## Điểm mạnh
- Trúng "nỗi đau" phổ biến nhất của AI code UI: output đều nhìn như machine-made; đây là skill mạnh nhất hiện nay cho việc này (14.8k★ chỉ sau 2 tuần).
- Luôn audit + propose trước khi sửa → an toàn, dễ theo dõi, không phá đột ngột.
- Không khóa stack; sửa được cả website sống qua link.
- Người dùng có quyền kiểm soát phần tốn tiền (hỏi trước mỗi lần sinh ảnh).

## Điểm yếu
- Tính "nhận diện slop" mang tính thẩm mỹ chủ quan — cần chủ bot xem trước hướng đề xuất.
- Story video cần Playwright + ffmpeg (cài thêm, nặng); snapshot site trực tiếp cần chạy trình duyệt headless.
- Giấy phép CC BY 4.0: dùng thương mại được nhưng phải ghi công tác giả và link về repo.

## Phù hợp với Limix Bot
Rất phù hợp làm skill chuẩn hóa giao diện cho các sản phẩm web Limix Bot/Herionix xuất ra: duyệt UI do agent tự dựng, nâng landing page, dashboard lên mức "có designer review". Nên dùng ở chế độ audit-first và luôn xem hướng đề xuất trước khi cho phép sửa hàng loạt file.

## An toàn
Skill chủ yếu là hướng dẫn văn bản (sửa code UI của chính dự án người dùng); phần phụ tùy chọn chạy Playwright headless để chụp/quay. Không có API key mặc định; mọi lần sinh ảnh trả phí phải được đồng ý. Theo quy tắc hub: **review-required**.
