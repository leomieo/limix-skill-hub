---
name: stack-diagram
description: Skill vẽ sơ đồ kiến trúc (architecture diagram) với logo chính hãng chỉ từ một câu mô tả tech stack — agent tự tra logo từ svgl, devicon, gilbarbara/logos hoặc gói icon của chính AWS/Google Cloud/Azure (không recolor, không vẽ lại), tự định tuyến đường nối tránh xuyên chữ, render kiểm tra rồi giao file HTML độc lập (mặc định), PNG, hoặc React component không dependency; luôn xuất cả bản sáng và tối, dùng được cho cloud, monorepo tooling và ứng dụng AI.
license: MIT
compatibility: Claude Code, Codex, Cursor và các agent hỗ trợ skills (Python ≥ 3.9 + mạng khi vẽ; PNG cần Playwright + Chromium)
version: 2026-11-12
---

# stack-diagram (Việt hóa)

> Nguồn gốc: https://github.com/caru-ini/stack-diagram — MIT. Bản gốc tiếng Anh xem `SKILL.en.md`; phân tích chi tiết xem `PHAN-TICH.md`.

## Dùng để làm gì
Mô tả stack của bạn **bằng một câu**, nhận về **sơ đồ kiến trúc có logo chính hãng**:

> Diagram our stack: Next.js and a Hono API on Vercel. Postgres on Neon, auth with Clerk, payments with Stripe. GitHub Actions deploys.

Ví dụ phạm vi: web app (Vercel + Neon + Clerk + Stripe), monorepo tooling (pnpm + Turborepo + Biome + Vitest + Lefthook), ứng dụng AI (Supabase pgvector + Claude + Inngest), và AWS/Google Cloud/Azure **dùng icon do chính từng vendor phát hành** (AWS Architecture Icons, Google Cloud icons, Azure icons — Microsoft cho phép dùng trong diagram tài liệu/training).

## Cài đặt
```bash
npx skills add caru-ini/stack-diagram
```
- Claude Code, Codex, Cursor và các agent hỗ trợ chuẩn Agent Skill. Trong Claude apps: upload `stack-diagram.zip` từ Releases như một skill.
- Yêu cầu Python ≥ 3.9 và mạng (để tải logo). Xuất PNG dùng Playwright + Chromium.

## Cách dùng
1. Nói với agent một câu mô tả stack (hoặc yêu cầu cụ thể: "Draw our app on AWS: ...").
2. Agent tự lấy logo (thứ tự nguồn: svgl → devicon → gilbarbara/logos → repo chính hãng), **không bao giờ recolor hay vẽ lại logo**.
3. Đường nối được định tuyến **vòng quanh nhãn** — không có mũi tên xuyên chữ.
4. Agent render sơ đồ và **tự kiểm tra trước khi giao**.
5. Nhận kết quả ở format cần: HTML tự chứa (font + logo nhúng, mở offline không cần mạng), PNG, React component không dependency, hoặc Claude Artifact.

Luôn có **cả bản sáng và tối** (tile trắng giữ màu logo, nhãn nhóm đổi theo logo dark-theme của brand). Sau khi vẽ, agent hỏi 1 lần có muốn đăng gallery công khai `https://stacks.caru.moe` không — chỉ đăng sau khi bạn đồng ý **hai lần**, prompt của bạn không được gửi đi.

## Điểm mạnh
- Kết quả chuyên nghiệp trong một câu — đúng dạng "one-liner → artifact" mà người dùng thích.
- Logo chính hãng, không recolor → diagram đáng tin, dùng được trong tài liệu khách hàng.
- Tự kiểm tra render trước khi giao; HTML 1 file nhúng đủ font/logo.
- Cực mới (tạo 2026-11-01) nhưng đã ~2.4k★ và cập nhật liên tục.

## Điểm yếu
- Cần mạng để tải logo (không bundle logo trong skill).
- Xuất PNG cần Playwright + Chromium (cài nặng).
- Phụ thuộc nguồn logo ngoài (svgl/devicon/gilbarbara) — nguồn chết thì phải fallback.
- Đăng gallery là hành vi gửi dữ liệu ra ngoài — đã được chặn 2 bước yes, nhưng cần lưu ý khi dùng cho stack nội bộ.

## Phù hợp với Limix Bot
Rất phù hợp cho dự án Limix Bot/Herionix: khi mô tả kiến trúc hệ thống (Agent Desktop + Windows-MCP + MCP servers), thuyết trình, wiki nội bộ. Chọn xuất **HTML tự chứa** để nhúng vào chat mà không lộ prompt stack. Vẽ stack nội bộ thì bỏ qua bước đăng gallery.

## An toàn
Kèm script Python chạy cục bộ + tải logo từ nguồn công khai; không chạy mã tải về; gallery cần đồng ý kép. Theo quy tắc hub: **kèm tool → review-required**.
