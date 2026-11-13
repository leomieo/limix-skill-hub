<!-- Legacy curator commentary; not execution instructions. Facts may be stale. -->

# Phân tích: stageshow (benjitaylor/skills)

## Thông tin (đo qua GitHub API ngày 12/11/2026, lần chạy 4/30)
- **Repo gốc:** https://github.com/benjitaylor/skills (skill `stageshow`)
- **Sao:** 3.160 | **Ngày tạo:** 26/10/2026 | **Push gần nhất:** 05/11/2026
- **Giấy phép:** skill có LICENSE riêng (MIT, file `stageshow/LICENSE` 17 ngày sau khi repo chưa có license toàn repo) + `NOTICE.md` asset bên thứ ba | **Tác giả:** Benji Taylor (benji.org/stageshow) | **Ngôn ngữ:** TypeScript
- **Cài:** `npx skills add benjitaylor/skills --skill stageshow`

## Lý do chọn
- 3.160★ chỉ sau 17 ngày — tăng sao rất nhanh; 0 open issue, push 7 ngày trước.
- Cùng mảng UI-product-mockup với unslop (lần 1) nhưng khác trọng tâm: unslop sửa UI "trông AI", stageshow **dựng minh họa sản phẩm giả chất lượng marketing** — ảnh hero, feature card, demo con trỏ.
- Cơ chế tự kiểm tra khác biệt: script `film.mjs` quay contact sheet + `--gate` in verdict, agent phải đạt "rehearsal passed" mới được giao.

## Làm gì
Build "miniature product UI": giao diện đáng tin đặt trong không gian, dạng still hoặc animation ngắn có một điều xảy ra. Kit React (Stage/Window/Phone/Thread/Act + 25 small parts), 40+ gold example làm chuẩn, 7 references (framing/craft/motion/verify/rehearse...), teaching pairs xấu/đúng, product studies (Figma, Linear, Slack, Gmail...). Quy trình 7 bước: plan trước code → medium/vị trí → look (map token sản phẩm) → truyện 3-5 beat → bắt đầu từ gold example → dựng màn hình bằng kit → choreograph bằng Act API → diễn tập với --gate.

## Điểm mạnh
- 5 kiểu hỏng (quá nhiều / wireframe / boxed / flat / bland) + lỗi-tái-diễn checklist — chuẩn chẩn đoán rất dùng được cho mọi job UI minh họa.
- "Dùng kit part, không dùng lookalike": chống lại chính xác nguồn lỗi padding lệch/label chật của UI vẽ tay.
- Chuẩn chất lượng bằng ví dụ film được, không phải lời hứa: bắt buộc `--gate` pass trước khi giao.
- Phân biệt rõ "mượn tương tác, không mượn danh tính" khi dùng product studies — đúng chuẩn pháp lý/phong cách.

## Điểm yếu / rủi ro
- Thuần React + Node: để xem preview/film cần `npm install` + `npm run dev` — môi trường Node cho Limix Bot.
- Chỉ có 1 skill trong repo, file SKILL.md 19 KB khá dày; tài liệu dồn vào references phải đọc thêm khi dùng thật.
- Repo gốc chưa có license cấp repo (skill tự có LICENSE riêng) — giới hạn trích dẫn toàn repo, đã ghi rõ nguồn từng phần.
- Kèm scripts Node (`film.mjs`) → review-required theo quy tắc hub (script chạy cục bộ, không network trong luồng chuẩn).

## Độ phù hợp với Limix Bot
Cao: bất cứ lúc nào Leo/bot cần hình minh họa UI cho README, docs, bài đăng hay demo sản phẩm — đây là skill chất lượng nhất trong nhóm ứng viên cho mảng này, và kiểm tra tự động giúp bot tự duyệt trước khi giao.
