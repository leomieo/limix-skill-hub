---
name: claude-animated-shorts
description: Skill Claude miễn phí làm video ngắn hoạt hình dạng "2D characters in a colourful 3D world" dài 55-70 giây dọc — nhân vật thẻ cartoon đầu-bean viền mực, thế giới 3D vẽ tay nét mực đen, camera lượn, thuyết minh giọng đọc, SFX + nhạc march tổng hợp — render bằng three.js trong Remotion trên máy bạn, không dùng AI video generator. Đã kiểm chứng qua short 67 giây "The Bridge That Fell for a Song" (cầu Broughton 1831, 74 lính đi đều). Dùng khi người dùng muốn video "kiểu bridge video", truyện lịch sử/khoa học ngắn có nhân vật cartoon 3D, hoặc nói "dùng cartoon short skill".
license: MIT
compatibility: Claude Code | cần Node, Python 3, ffmpeg, Remotion với @remotion/three | render 2K ~4fps trên CPU | cẩn thận disk temp Remotion (~1,3GB mỗi bundle)
version: 2026-11-12
---

# Cartoon 3D story short (three.js + Remotion) — Việt hóa

> Nguồn gốc: https://github.com/mromidev/claude-animated-shorts — MIT. Bản gốc tiếng Anh xem `SKILL.en.md` (nguyên văn SKILL.md gốc, name: cartoon-3d-short); phân tích chi tiết xem `PHAN-TICH.md`.

## Dùng để làm gì

Làm video ngắn dọc 55-70 giây theo phong cách "nhân vật 2D trong thế giới 3D nhiều màu": thẻ nhân vật cartoon đầu-bean viền mực, thị trấn 3D vẽ tay nét mực đen, trời rực màu, nền có depth-of-field, camera lượn, giọng thuyết minh, SFX + nhạc march tổng hợp. Toàn bộ render bằng three.js trong Remotion trên máy bạn — không AI video generator, không stock footage. Đã kiểm chứng trên **The Bridge That Fell for a Song**: short 67 giây về cầu Broughton 1831 và 74 lính đi đều làm sập cầu bằng chính bước chân.

## Cài đặt / dùng thế nào

1. Copy thư mục skill vào `~/.claude/skills/cartoon-3d-short/` (clone hoặc tải ZIP).
2. Cần [Remotion](https://www.remotion.dev/) với `@remotion/three`, cộng Node, Python 3 và ffmpeg.
3. Trong Claude Code, nói: *"Use the cartoon short skill and make a short about …"*.

Claude làm theo `SKILL.md` gốc: chọn chủ đề và kiểm chứng số liệu → viết script → ghi/giọng đọc → shot plan trong `story.ts` → stills → render. Các agent đối chiếu frame của bạn với reports và reference frames; bạn nhận render 2K cuối kèm sound mix.

## Quy trình 11 bước (tóm tắt SKILL.md gốc)

1. **Chủ đề và số liệu:** chọn một chuyện thật gây bất ngờ có nhân-quả vật lý (phải nhìn được), cộng một phép so sánh đời thường. Ghi số liệu kèm nguồn vào đầu `SCRIPT.md`.
2. **Script** (~3,7 từ/giây, 55-70 giây). Công thức beat: Hook (sự thật phi lý trong một câu) → Bối cảnh (năm, nơi, niềm tự hào) → Diễn biến leo thang 3-4 beat → Snap (khoảnh khắc gãy) → Cặp câu deadpan "May thay / Xui thay" → Giải thích (một ý vật lý qua ví dụ đời thường) → Hệ quả (quy tắc nó tạo ra) → Callback xoay kết. Không mô tả trên màn hình cái người xem đã thấy.
3. **Giọng đọc:** tạo `voice.wav` rồi làm `words.json` (mốc thời gian từng từ, sửa tay). Mọi thứ canh theo words.json.
4. **Shot plan trong `story.ts`:** copy `templates/bridge/` sang `src/videos/<name>/`, đăng ký composition mới cạnh `BridgeShort` trong `src/Root.tsx`. Các bảng chính: `SHOTS`, `XFADE`, `FLASH_AT`, `CAMS`, `KICKS`, `DOF`/`dofAt`, `FOREGROUND`. Mọi phản ứng hình ảnh rơi trước từ tương ứng 0-3 frame.
5. **Thế giới:** `lights.ts`, `shade.ts`, `build.ts` (thị trấn + props Kenney CC0, cull vật cản tầm nhìn camera), `paint.ts` (texture Canvas2D vẽ tay), `world.ts` (sky shader, fog = màu chân trời, sông).
6. **Nhân vật:** `toon.ts` (API `Pen` Canvas2D, canvas thiết kế 600x1000, đầu bean, chân tay que, viền mực), `cast.ts` (billboard hướng camera, đám đông, blink, walk cycle — tất cả ở layer `NOINK`), `cardshade.ts`.
7. **Post:** Composer: ink → lens pre → lens main → bloom → NEUTRAL tone map → grade (MSAA 4). Mọi tham số pixel scale theo output height / 1920.
8. **Âm thanh** (`~/bridge-short/audio/`): bảng event → SFX tổng hợp + nhạc gốc duck dưới giọng. Output `mix.wav` 48 kHz đúng độ dài, stems, cues.md. Khoá time constant hình trước khi làm âm thanh.
9. **Look checks:** `node scripts/bridge-stills.mjs`, side-by-side với frame tham chiếu bằng `python scripts/sbs_sheet.py`, gửi verifier chấm 1-3 ảnh với verdict ≤200 từ.
10. **Render cuối:** `npx remotion render ... --codec h264 --crf 16 --scale 1.3333` (1440x2560), mux âm thanh `-map 0:v:0 -map 1:a:0`, QA từng frame bằng `python scripts/short_qa.py`.
11. **Giao:** gửi file mp4 cuối, ghi notes.

## Giá trị look cuối (sau 4 vòng verifier, tất cả trong `templates/bridge/`)

Mọi short mới bắt đầu từ `templates/bridge/` (copy sang `src/videos/<name>/`): look nằm trong các giá trị này, truyện nằm trong `story.ts` / layout `build.ts` / vai trong `cast.ts`. Điểm verifier cuối: màu ngày 7, golden 5-6, ánh sáng 5-6, mực 6, texture 5-6, nhân vật 7, chiều sâu 6-7, bố cục 6-7 (từ 5/3/4/5/4/7/4/6 ban đầu). Chi tiết đủ đầy trong `SKILL.en.md` (preset ánh sáng day/golden, albedo, thông số mực, DOF, camera...).

## Vòng look-match (dùng lại cho mọi yêu cầu "làm giống X")

1. **Đo tham chiếu trước:** mỗi agent phân tích một chủ đề (motion, depth, texture, nhân vật, ánh sáng, viền, grade), ghi **số** chứ không tính từ vào `references/reports/<topic>.md`.
2. **Sandbox, mỗi file một chủ:** copy project thành `src/videos/<name>_{cam,world,mat,char,post}`, mỗi agent chỉ sửa file của mình trong sandbox của mình.
3. **Merge** bằng `python scripts/bridge_merge.py`, chạy `npx tsc --noEmit`, rồi re-sync mọi sandbox từ main trước vòng tiếp theo.
4. **Verify** bằng agent mới: side-by-side sheet, chấm từng mảng /10 kèm danh sách fix có số frame. Map từng fix về chủ file và tiếp tục agent đó.

## Lỗi hay gặp (Gotchas — rút gọn)

- Material Kenney nature-kit màu teal: đổi màu theo tên material trong `build.ts`.
- Camera lọt vào trong nhà: sight-line culler trong `build.ts`/`world.ts` xử lý.
- Mực phải là pass riêng **trước** lens blur, không gộp.
- Tham số post tính theo pixel phải scale theo resolution (stills 0.5, final 1.3333).
- **Disk:** mỗi Remotion bundle copy `public/` (~1,3 GB) vào temp và không tự xóa — đặt `TEMP`/`TMP` sang ổ lớn (`<big drive>/remotion-tmp`); ~110 GB sau 4 vòng là chuyện thật. Dự án xong thì dọn `remotion-webpack-bundle-*`.
- Trong chuỗi JS viết `"<big drive>/remotion-tmp"`, không viết `\` (`\r` thành carriage return).
- Remotion ghi track audio câm: mux với `-map 0:v:0 -map 1:a:0`.
- Render 2K ~4 fps (≈10 phút cho 67 giây). Film grain làm file phình 910 MB và nát trên YouTube — tắt.
- File `.ts` nháp trong `out/` làm gãy `tsc`: đặt tên `.txt`.

## Bẫy dễ nhìn sai (verifier bắt được — check mọi prop/shot mới)

- Xích sắt một sợi biến mất sau lưng đứa trẻ đọc thành **treo cổ** — luôn hai dây xích vào ghế rộng, đứa trẻ ở giữa.
- Prop cách ống kính dưới ~2 m thành cục to méo bị cắt ở mép frame; khi camera di chuyển, kiểm tra lại mọi prop gần vị trí mới.
- Bush foreground bị cắt mép đọc thành "quả cầu xanh" — prop foreground phải nhận ra được hoặc bỏ hẳn.
- Cờ đỏ + sao/kim cương vàng đọc thành cờ Việt Nam — dùng cờ đúng thời (St George's cross cho Anh 1831).
- Bảng hiệu bị nắng nghiêng chiếu thành xám-xanh không đọc được — cho mặt bảng material không bắt sáng.
- Rim light golden làm bản offset ngoài biến mọi cái mũ thành khung tranh — chỉ rim trong, chỉ đầu/thân.
- Hold tĩnh đọc thành đứng hình trong QA — mọi hold cần push-in chậm.

## Lưu ý

- Đặt `REMOTION_TMP` vào ổ lớn (xem Gotchas).
- Truyện, nhân vật và giọng đọc luôn là của bạn. Dùng references cho **look**, không phải nội dung.
- License: code và docs là MIT (`LICENSE`); reference frames chỉ để học phong cách.
