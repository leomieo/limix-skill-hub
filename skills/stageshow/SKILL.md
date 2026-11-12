---
name: stageshow
description: Skill build UI sản phẩm giả ("faux product UI") trông như sản phẩm thật — ảnh tĩnh, feature card, demo con trỏ, bento grid — viết bằng React + CSS thuần. Cửa sổ app/trình duyệt, dashboard, điện thoại, thông báo, terminal, bento grid, walkthrough con trỏ, được đóng khung/cắt/phối đúng kiểu một trang marketing, feature card hoặc docs hero cần. Dùng khi người dùng muốn UI giả/mock, demo sản phẩm, animation walkthrough, hero hoặc feature-card minh họa app, product shot kiểu trang marketing, hay con trỏ chuột hoạt động trong giao diện — kể cả khi họ không nói chữ "faux UI". Kèm kit React (Stage/Window/Phone/Act...) + 40 gold example làm chuẩn chất lượng và script film tự kiểm tra.
license: MIT (file stageshow/LICENSE của repo gốc; NOTICE.md cho asset bên thứ ba)
compatibility: React + react-dom + lucide-react | npm run dev để xem preview | node scripts/film.mjs để film/kiểm tra (cần Node)
version: 2026-11-12
---

# Stageshow (Việt hóa)

> Nguồn gốc: https://github.com/benjitaylor/skills — skill `stageshow`, MIT. Bản gốc tiếng Anh xem `SKILL.en.md` (nguyên văn SKILL.md gốc); phân tích chi tiết xem `PHAN-TICH.md`.

## Dùng để làm gì

**Miniature product UI:** một giao diện đáng tin, đặt trong không gian của nó, dưới dạng một ảnh tĩnh hoặc một đoạn animation ngắn trong đó **một điều xảy ra**. Người xem nhận ra màn hình và thấy điều đó xảy ra.

Mỗi skill gồm kit, gold example, examples, tools quay kết quả để agent tự kiểm tra công việc của mình.

## Một ý tưởng duy nhất

**Trông như sản phẩm thật, đơn giản hóa đúng mức người xem cần, đóng khung có chủ đích, và mọi chuyển động đều có nguyên nhân.**

5 kiểu hỏng kinh điển:

- **Quá nhiều.** Text thật ở mọi dòng, số liệu dày đặc. Càng chi tiết càng trông "generated".
- **Wireframe.** Hai cục xám + một nút. Dựng quá nhỏ hoặc bỏ mất phần nhận diện.
- **Boxed.** Cả cửa sổ thu nhỏ vào card đều đặn lề — trông như screenshot dán vào, không phải product shot.
- **Flat.** Mọi vật cùng trọng lượng trong card viền giống nhau — mắt không có chỗ đỗ.
- **Bland.** Cửa sổ xám + con trỏ, bất kể brief nói gì. Style của brief (blueprint, kính trên màu, Dynamic Island, mascot) chính là điểm nhấn.

**Cách sửa:** màn hình đầy đủ, có cấu trúc, nền xám trầm; chữ thật chỉ ở thứ truyện kể, phần còn lại là placeholder line; chừa khoảng thở; crop đặt mắt vào chỗ có truyện. **Đơn giản hóa chữ, không đơn giản hóa ngữ cảnh.** Đây là minh họa do tác giả dựng — `a.click()` vẽ con trỏ nhấn, `a.set()` đổi cảnh — không phải browser automation.

## Độ "ép" chất lượng

Dựng như một product designer dựng launch page mà họ bị đánh giá. **Gold example trong `examples/` là chuẩn, không phải tham khảo:** nếu bản của bạn trống hơn, phẳng hơn hoặc nhỏ hơn gold gần nhất, đó là fix đầu tiên. Rồi nhìn frame bằng con mắt của designer khó tính nhất bạn biết — người chụp đúng một thứ sai và gửi trả kèm "cái gì đây?".

## Quy trình 7 bước

Phần lớn chất lượng quyết định trước khi viết code. Viết plan trước: nó nằm ở đâu, vật-focus, hành động, payoff, cái gì bỏ được.

1. **Medium và vị trí.** Tĩnh hay animation (loop, một lần, hover). Trang nào, nền gì, rộng bao nhiêu. Thiết kế ở kích thước sẽ xem: ~720×340 cho hero cạnh chữ, 900-1100 cho hero full-width, 400×300 cho card, hiển thị 1:1; demo không bao giờ dưới ~320. Mỗi demo vừa cột điện thoại có bản `compact` **thiết kế lại** ở 358, không phải bóp. Bento tile là một bộ — plan bằng `references/bento.md`.
2. **Look.** Có code/site của sản phẩm thì map token của nó sang kit (`references/looks.md`); developer muốn dùng component riêng thì dùng trong stage. Không thì chọn theme (light/dark/blueprint/glass), palette và mức fidelity: `minimal` toàn bar, `standard` chữ chỗ mang nghĩa + bar chỗ còn lại, `realistic` nội dung thật khắp nơi. Mặc định light + standard; `realistic` ở scale hero, sản phẩm thật có tên, hoặc still có chủ đề là list/trang. Brief có style (kawaii, giấy, màu poster) thì style đó trọn vẹn.
3. **Truyện.** 3-5 beat + payoff, 10-16 giây. Không cú move con trỏ nào không giải thích được. Dữ liệu không tua ngược trước mắt khi không có nguyên nhân. Giữa truyện giàu và frame tĩnh hơn, chọn frame.
4. **Bắt đầu từ một example.** Tìm gold gần nhất trong bảng Gold (40+ mục: `static-card`, `hero-demo`, `choreography`, `ai-chat`, `form-error`, `reorder`, `chart-scrub`, `loading`, `dark-hero`, `presence`, `dynamic-island`...) và **film nó** (`node scripts/film.mjs "..." --still --out gold.png`). Copy thư mục nó làm điểm bắt đầu, không viết lại theo liếc mắt. Đọc `references/craft.md` trọn — ngắn, và giữ luật still-frame mà gold không thể hiện. Rồi thay look + nội dung bằng sản phẩm của brief (token từ bước 2, icon/chrome/chữ của sản phẩm). Đóng khung theo `references/framing.md` (crop vào panel xảy ra truyện; một gutter; chỉ filler được bleed; cửa sổ giữ hình dáng; không plate dưới hero; không góc chết...). Film một still ở cả hai width cạnh gold — nếu th emptier/flatter/more boxed thì fix frame trước mọi motion.
5. **Màn hình.** Đếm string thật, thường 3-7 — ngân sách **từ**, không phải phần tử. Dựng bằng token của kit: `Bar`, `Text`, `Row`. Fit text của mọi control trước khi nó chuyển động. Đánh dấu thứ con trỏ chạm bằng `data-target`/`data-cursor`; đo bằng `rect()`, không hard-code.
6. **Choreograph.** API `Act`. Giữ thứ đã hiện ở mounted và toggle để exit animate. Animate **quan hệ**, không chỉ vật: dòng mới khiêng các dòng dưới, surface resize không kéo giãn text. Beat chồng nhau, nhóm stagger, payoff giữ, loop kết thúc ở chỗ bắt đầu hoặc reset có nguyên nhân thấy được.
7. **Diễn tập.** Đặt `poster` trước — đa số người chỉ thấy frame đó (thumbnail, reduced-motion, screenshot) nên nó phải tự kể truyện. Film **loop**, luôn với `--gate`: contact sheet + verdict cùng lúc. Film ở width hiển thị và 390, bước qua từng press/menu/morph/seam loop. Đọc từng frame, fix lỗi lớn thấy trước nhất (framing → hierarchy → motion → polish), film lại. Đặt cạnh gold và trả các cặp câu trong `references/teaching.md`. **Không giao cho đến khi loop `--gate` in `rehearsal passed`** — mỗi line nó in là một lỗi người xem sẽ thấy. Rồi chạy pass cuối: fresh-eye review + `REHEARSAL.md` cạnh component (template ở `references/verify.md`).

## Lỗi quay lại mỗi vòng (check trước khi giao)

- Nội dung **swap** thay vì chuyển động (`references/motion.md`).
- **Bar xám ở chỗ mắt đỗ** — filler thuộc về mép (`references/craft.md`).
- Plate sau cửa sổ, hoặc cửa sổ lơ lửng có air bốn phía — cửa sổ/phone chiếm ≥2/3 stage và chạy tràn một cạnh.
- Băng trống, control bị cắt, shadow rối.
- **Stock AI và logo bịa:** sparkle, tím, chữ cái trong ô màu.
- Dòng rối và inset lệch nhau.
- Hold dài và reset không nguyên nhân.
- Selection không nằm dưới I-beam.
- Status bar/home indicator vẽ tay — `Phone` tự vẽ cả hai.
- Số tiền căn giữa cả dấu (`Spacing and alignment`).

## Kit

Copy `kit/` vào project, import từ `kit/index.ts`. React, react-dom, lucide-react (cho `Icon`). Phần khó sửa tay thì kit lo, look của sản phẩm là của bạn (`references/kit.md` có props + luật từng part):

- **Stage:** `Stage` (design size, scale-to-fit, `compact`, scene state, playback, look, cursor) + `Act` (`set`, `wait`, `move`, `click`, `type`...).
- **Frames:** `Window`, `Phone` + `LockScreen` + `Notification`, `Keyboard`, `Thread` + `Bubble`, `Stamp`, `Receipt` — hình học thật, không bao giờ vẽ tay.
- **Motion:** `Collapse`, `Roll`, `Swap`, `Count`, `Connector`, `Fly`, `Follow`, `States`, `Stream`, `Popover`, `Scroll`, `Camera`, `Expand`.
- **Small parts:** `Bar`, `Text`, `Row` (mọi list làm từ nó), `Card`, `Divider`, `Avatar`, `Pin`, `Icon`, `Menu`, `Field`, `Draft`, `Button`, `Segmented`, `Toggle`, `Tabs`, `Badge`, `Chip`, `Kbd`, `BrandMark`, `Code`, `Chart`, `Toast`.
- **Dùng kit part, không dùng lookalike:** trước khi tự viết class cho button/card/tab/avatar/toast, kiểm tra list — bản tay là nơi padding lệch, label chật và text không kích thước sinh ra. Restyle bằng props + token, không đổi hình học từ bên ngoài.

## References & examples

- `references/framing.md` (luật đóng khung + bảng layout), `craft.md` (still frame: tiết chế, type, spacing, icon, màu, chrome), `motion.md` (truyện, loop, nhịp, con trỏ, drag), `verify.md` (checklist bảng you-see/you-do), `rehearse.md` (cách film + những line film không bao giờ là chủ ý).
- **Gold table** 40+ example theo nhu cầu (tĩnh, hero, choreography, AI chat, form, chart, table, loading, phone, cursors, bento, upload, share, swipe...). **Product studies** (Figma, Linear, Slack, Raycast, Finder, Spotify, Notion, Gmail, Calendar, Office, Wikipedia, Telegram, iMessage): đọc `references/products.md` trước — **mượn tương tác, không mượn danh tính sản phẩm khác**. **Specimen sheets** là catalog, không phải bố cục.
- Chạy mọi thứ bằng `npm install` + `npm run dev`; `teaching/` chứa cặp xấu/đúng để chẩn đoán — nửa xấu không bao giờ là điểm bắt đầu.
