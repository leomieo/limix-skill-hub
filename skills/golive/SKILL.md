---
name: golive
description: Đưa sản phẩm do agent viết từ repo lên production chạy thật trên tài khoản CỦA CHÍNH NGƯỜI DÙNG — hosting (Vercel, Netlify), database (Supabase, Neon), auth (Supabase), domain/DNS (Porkbun, GoDaddy), email (Resend), payments (Stripe test-mode). Agent phát hiện app cần gì, lập plan chính xác từng thay đổi, hỏi duyệt trước, áp dụng bằng đăng nhập của người dùng, rồi kiểm chứng cái gì thật sự chạy — ghi lại mọi thứ nó tạo ra, tái kiểm tra drift theo yêu cầu (golive status), và dọn dẹp lại được (golive teardown). Early alpha 0.1.0-alpha.9. Dùng khi người dùng muốn ship, deploy, go live, launch, publish app, hoặc nối env vars, webhook, auth settings, email DNS, custom domain.
license: MIT
compatibility: Claude Code / Codex (đã kiểm chứng; client khác chưa xác nhận) | Node.js 20+, npm/npx, Git | cài `npx skills add https://github.com/mikehasa/golive-skill --skill golive --global` hoặc npm `golive@0.1.0-alpha.9` | kèm CLI 0-dependency chạy cục bộ, không telemetry
version: 2026-11-12
---

# GoLive (Việt hóa)

> Nguồn gốc: https://github.com/mikehasa/golive-skill — MIT. Bản gốc tiếng Anh xem `SKILL.en.md` (nguyên văn `skills/golive/SKILL.md` của repo); phân tích chi tiết xem `PHAN-TICH.md`.

## Dùng để làm gì

Agent lập trình dựng xong app trong vài phút, nhưng để tới người dùng thật vẫn cần: tài khoản, hosting, database, domain, secrets, dịch vụ nối. GoLive là skill open-source cho đúng phần việc đó: **phát hiện app cần gì → lập plan chính xác từng thay đổi → xin bạn duyệt → áp dụng bằng đăng nhập của chính bạn → kiểm chứng cái gì thật sự chạy** — rồi ghi lại mọi thứ nó tạo ra, tái kiểm tra drift theo yêu cầu, và dọn dẹp lại được.

Tự động hóa phần provider cho phép; hướng dẫn phần cần người; kiểm chứng cái có thể quan sát; làm rõ phần chưa xong. Không cần tài khoản GoLive, không backend, không telemetry.

## Cài đặt / dùng thế nào

Cần **Node.js 20+**, npm/npx, Git, agent có thể load skill và chạy lệnh. Đã kiểm chứng với Codex và Claude Code.

Cài một lần cho mọi project (chạy từ thư mục bất kỳ, chọn agent khi được hỏi):

```bash
npx skills add https://github.com/mikehasa/golive-skill --skill golive --global
```

Chỉ định agent để bỏ bước chọn:

```bash
npx skills add https://github.com/mikehasa/golive-skill --skill golive --global --agent codex --yes      # Codex
npx skills add https://github.com/mikehasa/golive-skill --skill golive --global --agent claude-code --yes # Claude Code
```

Hoặc qua npm (cài offline, không cần Git/Skills CLI):

```bash
npx golive@alpha install --agent codex        # hoặc --agent claude
```

Hoặc qua ClawHub (OpenClaw): `npx clawhub@latest install golive`.

Mở repo app trong agent của bạn, reload skill/nhập session mới nếu chưa thấy. Gõ trong chat agent:

- Codex: `$golive Help me take this app live.`
- Claude Code: `/golive Help me take this app live.`

Hoặc nói thường:

```text
Use the golive skill to take this app live. Keep the providers it already uses.
Show me the destination accounts and plan before changing anything.
```

GoLive soi app, hỏi về provider còn thiếu, và trình đích + plan để bạn duyệt **trước khi** thay đổi bất cứ thứ gì trên provider.

## Một lượt chạy trông thế nào (ví dụ app đã dùng Supabase)

> **Bạn:** Use golive to take this app live. Use test resources for now.
>
> **Agent:** App này dùng Supabase. Bạn muốn host ở đâu? 1. Vercel / 2. Netlify / 3. Khác.
>
> **Bạn:** Vercel.
>
> **Agent:** Giữ Supabase — project sẵn hay tạo project test mới?
>
> **Bạn:** Tạo mới.
>
> **Agent:** Chạy `vercel login` và `supabase login` ở terminal riêng, tôi sẽ kiểm tra account/org đã nối.
>
> **Bạn:** Xong.
>
> **Agent:** Plan: tạo project frontend test trong team Vercel bạn chọn, tạo database trong org Supabase bạn chọn, chuyển env values cần thiết, deploy. Tôi sẽ hiện tên/ID đích, settings và chi phí cùng plan. Duyệt trước khi tôi áp.
>
> **Bạn:** Approved.
>
> **Agent:** Deploy đã live. Đây là URL, báo cáo kiểm chứng và phần chưa xác minh. Khi xong project test, `golive teardown` sẽ lập plan dọn để bạn duyệt trước khi xóa gì.

Bạn tự làm phần signup, login browser, xác minh danh tính, mua hàng. API key cần thì trên macOS có dialog ẩn-input giải thích lý do; giá trị đi thẳng vào file credentials cục bộ, không qua chat hay output lệnh.

**Provider khác?** Có luồng hướng dẫn chung: CLI chính thức của provider → MCP/API chính thức → dashboard. Vẫn trình đích/thay đổi/chi phí trước khi duyệt và kiểm tra sau; nhưng là **best-effort**, không bảo đảm độ phủ kiểm chứng như adapter built-in.

## Phạm vi alpha (đã live-test)

| Đường đã test | Kiểm chứng được |
|---|---|
| **Vercel + Supabase** | Provision, nối env, deploy, CRUD có auth và cô lập quyền truy cập |
| **Netlify + Neon** | Provision, nối env, deploy, kết nối Postgres, API 2 session, CRUD browser |
| **Vercel + Porkbun / GoDaddy (domain)** | Gắn domain, ghi DNS record được duyệt dưới `--confirm-dns`, xác minh sở hữu, HTTPS trên subdomain dùng-tiêu |
| **Vercel + Resend (email)** | Setup sending domain, DNS record, verify, gửi thật qua env key của app |
| **Vercel + Stripe (test)** | Key test-mode + đăng ký webhook, từ chối request không ký, thanh toán test-card thật trả event có xác thực chữ ký |
| **Supabase Auth (SMTP + recovery)** | Ghi custom-SMTP đọc lại được, nâng rate limit auth email, toàn bộ vòng password recovery (không liệt kê tài khoản, token dùng một lần, mật khẩu mới đăng nhập/old bị từ chối) |

Các cặp chéo khác chỉ có coverage mock. Adapter thử nghiệm: cấu hình/auth/recovery/isolation Supabase, Cloudflare DNS.

## Các chốt an toàn (phần quan trọng nhất)

- **Bạn duyệt mọi ghi.** `apply` từ chối chạy nếu không có id của plan đã duyệt và `--yes`; nó kiểm tra lại định danh plan trước khi ghi. DNS cần `--confirm-dns`, xóa cần `--confirm-destroy`, bước live-mode (payment thật, dữ liệu production, deploy production đầu tiên) cần `--confirm-live`.
- **Một lượt chạy dừng thay vì đẩy tiếp.** `apply` dừng ở check đầu tiên thất bại/thiếu xác nhận/provider trái plan; chạy lại sẽ resume tại bước đó.
- **Rollback hẹp, opt-in, không tự động:** `release.rollback: true` chỉ re-point production về deployment mà golive tự ghi lại được (hiện chỉ Netlify), không đụng data/DNS/payment/email.
- **Không để lại thứ gì âm thầm:** `golive teardown` chỉ xóa thứ nó chứng minh được là nó tạo (bằng chứng sở hữu + `--confirm-destroy`), đọc lại DNS zone và host project sau xóa, và nêu đích danh mọi thứ nó không xóa được (project Supabase/Neon, sending domain Resend...) như một handoff có hướng dẫn tự xóa tay.
- **Giữ secrets ngoài chat:** giá trị key chỉ đọc trong tiến trình, không bao giờ in ra, không nằm trong arguments/plans/state/reports. File credentials là plaintext mode 0600 ngoài repo — không phải keychain; thu hồi token ở provider mới thực sự cắt quyền truy cập.
- **Giới hạn nêu thẳng:** các cờ xác nhận là argument agent truyền thay bạn — một agent đã login vào provider của bạn có thể ghi ở đó mà không cần plan golive nào cả. `docs/TRUST.md` tách điều code cưỡng chế khỏi điều chỉ là chỉ dẫn cho agent.

## Kiểm chứng bạn có thể soi

Báo cáo ghi kết quả **pass / fail / warning / skipped** kèm bước còn lại của người. Check gồm: quyền truy cập account, tên env var, URL deploy do provider xác nhận, pattern secret JS công khai, truy cập database, cài đặt auth/webhook/DNS, và (nếu host trả lời được) deployment mà provider nói production đang phục vụ.

**Deploy xong chưa phải bằng chứng app chạy.** Tên env var có thể tồn tại với giá trị sai; email domain verified không chứng minh tới được hộp thư. **"Skipped" không phải "passed".**

App nhận được: `golive.yaml`, `.golive/state.json`, `.golive/report.json`, `GOLIVE_REPORT.md` (state giữ resource ID + bằng chứng bước để recovery; không phải kho credential).

- `golive handoff --write` tạo tài liệu sở hữu `GOLIVE_HANDOVER.md` (+ `.golive/handover.json`): route login, bằng chứng sở hữu từng resource, phần còn tay, việc định kỳ, cách tháo dỡ; từng dòng ghi rõ verified / recorded / not verifiable / unknown. File không chứa secret nhưng metadata vẫn có thể nhận diện resource riêng tư — xem lại trước khi chia sẻ.
- `golive status` (chỉ đọc) hỏi tiếp: có gì đổi sau lưng golive không? So baseline đã ghi (DNS record golive viết, **tên** env var, webhook endpoint, domain attachment, database project, sending domain, payment account, host project) với lần đọc bây giờ, ghi nhãn `expected (recorded by golive <thời gian>)` / `observed (read now)`; exit code 2 khi cần hành động. Provider không đọc được = unverifiable, không bao giờ báo "clean". Drift cố tình không phải gate: `plan`/`apply`/`verify` không bao giờ tra nó.

## Roadmap (điểm đánh dấu = milestone đã live-test, không phải category xong)

- ✅ Hosting (Vercel/Netlify), Database (Supabase/Neon), Environment wiring, Payments test-mode (Stripe), Transactional email (Resend), Domain/DNS/HTTPS (Porkbun, GoDaddy), Uninstall/teardown
- 🚧 Authentication (Supabase auth policy + signup + recovery **đã live-validated**; isolation mock-covered), Product analytics (PostHog ingest đã live-validated), CI/CD (preview deploy + release check + promotion/rollback: implemented, chưa live-validated), Launch essentials (site-metadata check)
- 🗺️ Backend/servers, Schema và data, Storage, OAuth/SSO, SMS/push, AI services, Background work, Cache/search/realtime, Security/abuse, Monitoring (Sentry + UptimeRobot adapter mock-covered), Backups, Costs/quota

Một số bước luôn cần người: chấp nhận điều khoản, xác minh danh tính, mua hàng, review của provider. "Guided" vẫn phải là: hành động tiếp theo rõ ràng, đúng trang, đúng quyền, check sau, quay về cùng workflow.

## Lưu ý vận hành

- Cập nhật: Skills CLI quản bản cài của nó; installer riêng có rollback cục bộ. **Cập nhật giữa các lần deploy, không bao giờ giữa plan và apply.** Cloud resources không bị rollback ảnh hưởng.
- Tài khoản vẫn là của bạn: GoLive không mua dịch vụ, không tạo billing account.
- Skill **kèm CLI Node lớn (golive.mjs) và ghi file state/credentials** → **review-required** theo quy tắc hub; các chốt `--confirm-*` phải được con người duyệt từng lần, không bao giờ auto.
