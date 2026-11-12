---
name: pixelfx
description: Thư viện 244 hiệu ứng pixel art và hoạt hình sprite viết bằng code — mỗi hiệu ứng một file JS, không phụ thuộc, không ảnh: vẽ vào hai buffer màu (pixel đục/dither/bán trong) và sáng (glow cộng dồn). Họ lửa, nổ, nước, băng, sét, sci-fi, cận chiến, va đập, đạn, sinh/tử, huyền thuật, thánh quang, bóng tối, trạng thái, tự nhiên, thời tiết, UI, vật phẩm, chuyển cảnh, sinh vật nhỏ. Hiệu ứng có nhân vật đều được "diễn xuất" (giậm chân - tung đòn - chạm - hồi), 12 combo trọn từ giậm đến hồi. Chơi live trong game canvas/Phaser/PixiJS/Kaplay/three.js, đổi màu, lật, đổi seed, xuất sprite sheet cho Godot/Unity/GameMaker/Defold/LÖVE/Bevy, kèm vòng draft-render-nhìn-chỉnh để tạo hiệu ứng mới như một pixel artist khắt khe. Dùng khi cần VFX pixel art, sprite animation, "game juice" hoặc một hiệu ứng cụ thể.
license: MIT
compatibility: Node 18+ (không dependency); Claude Code, Codex và mọi agent hỗ trợ Agent Skills; ffmpeg tùy chọn (preview GIF/MP4)
version: 2026-11-12
---

# Pixelfx (Việt hóa)

> Nguồn gốc: https://github.com/patch-gg/pixelfx - MIT. Bản gốc tiếng Anh xem `SKILL.en.md`; phân tích chi tiết xem `PHAN-TICH.md`.

## Dùng để làm gì
Hiệu ứng pixel art **viết bằng code**: lửa, nổ, nước, băng, sét, sci-fi, cận chiến, va đập, đạn, spawn & chết, huyền thuật, thánh quang, bóng tối, trạng thái, tự nhiên, thời tiết, UI, vật phẩm, chuyển cảnh, sinh vật nhỏ — tổng 244 hiệu ứng trong `src/fx/<category>/<name>.js`. Mỗi hiệu ứng vẽ vào 2 buffer: **màu** (pixel đục, dithered hoặc bán trong thật) và **sáng** (glow cộng dồn). Không dùng ảnh nên có thể chơi live, đổi bảng màu, lật gương, đổi seed và render sprite sheet cho bất kỳ engine nào.

Phương pháp (của Hugo Duprez): *code là đất sét, tin vào mắt, cho agent nhìn tham chiếu*. Prompt một-lần cho hiệu ứng dở; nháp → render → nhìn → chỉnh mới cho hiệu ứng đẹp.

## Cài đặt / dùng thử
```sh
# Trong game browser (canvas, Phaser, PixiJS, Kaplay, three.js) — dùng code trực tiếp
npm i github:patch-gg/pixelfx
# hoặc copy src/core và các file fx cần dùng

# Xuất sprite sheet cho engine khác (Godot, Unity, GameMaker, Defold, LÖVE, Bevy)
node tools/render.mjs ice/frost-nova --sheet
# → PNG grid khung trong suốt + JSON kiểu Aseprite (frame rect, thời lượng, fps, loop, cột, pivot)
```

Ví dụ dùng trong canvas:
```js
import { createFrame, clearFrame, createFx, composite } from "pixelfx";
import * as frostNova from "pixelfx/fx/ice/frost-nova";

const frame = createFrame(320, 180);                  // độ phân giải pixel của game
const img = new ImageData(320, 180);
const fx = createFx(frostNova, { x: 160, y: 140 });   // tùy chọn: flip, angle, seed, palette, light...

function tick(dt) {
  fx.update(dt);
  clearFrame(frame);
  fx.draw(frame, "back");                             // sau nhân vật
  drawCharacters();
  fx.draw(frame, "front");                            // trước nhân vật
  composite(frame, img.data, backgroundColor);
  ctx.putImageData(img, 0, 0);                        // scale với image-rendering: pixelated
}
```

## Vòng tạo hiệu ứng mới (skill)
1. Làm việc trong checkout pixelfx (không có `tools/render.mjs` thì `git clone https://github.com/patch-gg/pixelfx` cạnh dự án; không cần cài đặt gì).
2. Kiểm tra chạy: `node tools/render.mjs fire/torch` ghi `records/fire/torch/contact.png` — mở ảnh này để "nhìn" mọi hiệu ứng.
3. Nháp code → render contact sheet → tự soi khuyết điểm (nhiên liệu, chuyển pha, khung cuối) → chỉnh → lặp cho đến khi đạt.
4. Hiệu ứng có nhân vật phải được **diễn xuất**: giậm chân, tung đòn, đóng băng khi chạm, hồi phục — mục tiêu trúng đòn.

## Điểm mạnh / lưu ý
- **Mạnh:** quy mô 244 hiệu ứng + catalog có tổ chức; zero dependency, chạy mọi engine; phương pháp craft có benchmark "nhìn được"; là một block trên Patch, mở gallery online xem ngay không cần cài.
- **Lưu ý:** cần Node 18+; muốn nhìn hiệu ứng thì agent phải mở PNG (môi trường headless cần công cụ đọc ảnh); là skill kèm script → bot xem xét trước khi cài.
