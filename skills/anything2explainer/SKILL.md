---
name: anything2explainer
description: Đưa một chủ đề vào, nhận ra một video explainer motion-graphics có thuyết minh — skill Claude Code / Codex biến bất kỳ chủ đề nào thành video motion-graphics nền đen có giọng đọc TTS, phụ đề căn theo từng từ và thanh tiến độ chương, tiếng Trung hoặc tiếng Anh, mỗi frame đều vẽ bằng code với Remotion (React + TypeScript). Không stock footage, không model video sinh, không lấy frame từ ai. Kèm 9 giai đoạn quy trình, 4 checkpoint hỏi người dùng, đa agent dựng song song và QC định lượng. Dùng khi người dùng cần video giải thích/giáo dục/khoa học về một chủ đề, hoặc muốn biến bài viết/tài liệu thành video.
license: PolyForm Noncommercial 1.0.0 (miễn phí phi thương mại; thương mại cần sự đồng ý của tác giả; video bạn làm là của bạn)
compatibility: Claude Code / Codex | Node ≥18, ffmpeg, Python 3 (venv: edge-tts 7.2.8, numpy, pillow, scipy; tiếng Anh thêm kokoro-82m + espeak-ng) | phát triển trên macOS, Linux/Raspberry Pi 5 ARM64 đã kiểm chứng | Windows cần Git Bash, chưa render full được xác nhận
version: 2026-11-12
---

# Anything2explainer (Việt hóa)

> Nguồn gốc: https://github.com/Vincentwei1021/anything2explainer — PolyForm Noncommercial 1.0.0. Bản gốc tiếng Anh xem `SKILL.en.md` (nguyên văn SKILL.md gốc); phân tích chi tiết xem `PHAN-TICH.md`.

## Dùng để làm gì

**Chủ đề vào, video explainer có thuyết minh ra.** Skill biến bất kỳ chủ đề nào ("giải thích vector database là gì") hoặc một bài viết/tài liệu thành video motion-graphics **nền đen** 1280×720: giọng đọc TTS đồng bộ, phụ đề căn theo ranh giới từng từ, thẻ chương, HUD trên đầu, thanh tiến độ chương dưới chân. Mọi frame vẽ bằng code với Remotion — số liệu trên màn hình đều truy vết được URL nguồn; sửa một frame là sửa một file shot.

Không phải CLI: thứ repo bán là **toàn bộ phương pháp** cho agent lập trình — template Remotion compile được, thư viện primitives + ánh sáng, tool giọng đọc/storyboard/render/QC định lượng, spec phong cách, giao thức chia việc đa agent, và một phim tham chiếu hoàn chỉnh làm chuẩn chất lượng.

## Cài đặt / dùng thế nào

```bash
git clone https://github.com/Vincentwei1021/anything2explainer.git
ln -s "$PWD/anything2explainer" ~/.claude/skills/anything2explainer   # Claude Code
ln -s "$PWD/anything2explainer" ~/.codex/skills/anything2explainer    # Codex
```

Phụ thuộc:

```bash
# Node ≥18 (npm install của template kéo remotion 4.0.507 / react 19)
brew install ffmpeg          # bắt buộc: trích frame / transcode

python3 -m venv ~/.venvs/a2e && source ~/.venvs/a2e/bin/activate
pip install 'edge-tts==7.2.8' numpy pillow scipy   # ghim edge-tts (nó theo endpoint Microsoft, dễ gãy khi nâng cấp)

# chỉ cần cho thuyết minh tiếng Anh (kokoro-82m chạy cục bộ)
pip install kokoro soundfile && brew install espeak-ng
```

Phát triển trên macOS; Linux/Raspberry Pi 5 (ARM64, Python 3.13) đã kiểm chứng (dùng `TTS_ENGINE=kokoro_onnx` hoặc `piper`, trỏ `REMOTION_BROWSER_EXECUTABLE` vào Chromium hệ thống). **Windows cần Git Bash + Python 3 + Node.js + ffmpeg; render full trên Windows chưa được xác nhận.**

## Quy trình 9 giai đoạn (tự kích hoạt khi bạn nói yêu cầu)

1. **Scaffold** project Remotion từ template (`template/scripts/new_project.sh ~/work/my-video myslug`).
2. **Research** (1 agent): tài liệu nghiên cứu có nguồn, mọi con số/ẩn dụ đều có URL.
3. **Narration & timeline:** kịch bản → TTS giọng đọc với ranh giới từng từ → timeline chuẩn xác từng frame + bảng phụ đề.
4. **Storyboard:** mỗi shot một dòng: dải frame, beat, hình ảnh, motion, hero element, ánh sáng.
5. **Overlays & primitives:** tiêu đề, thẻ chương, HUD, rail pipeline, 2-5 icon riêng chủ đề.
6. **Pilot** (1 agent): nhóm shot đầu, rồi một cut 30 giây để bạn đánh giá look.
7. **Parallel build:** các nhóm còn lại, 5-7 shot/agent, mỗi agent viết component Remotion thuần hàm.
8. **Render** full phim + chạy chỉ số frame định lượng (`frame_metrics.py`).
9. **QC & sửa:** 1 agent QC mỗi chương, agent sửa mỗi nhóm, xác minh lại, rồi delivery notes.

Có thể lái template bằng tay: research → `scripts/tts_build.py` → `scripts/render_storyboard.py` → sửa `src/config.ts` → shot trong `src/shots/G1..Gn` → `scripts/preview.sh 30` → `VER=v1 scripts/render.sh` + `frame_metrics.py` → QC.

## Bốn checkpoint (quy trình dừng hỏi bạn đúng 4 lần)

1. **Độ dài và ngôn ngữ** — trước khi viết kịch bản. Độ dài quyết định số line, số shot, số agent chạy song song; ngôn ngữ đổi `lang` trong `src/config.ts` (đổi typography, ngân sách phụ đề, giọng mặc định).
2. **Duyệt narration** — trước khi ghi giọng. Khoá xong thì số frame được hard-code vào mọi shot; đổi một từ là re-time cả phim. Đây là chỗ can thiệp rẻ nhất.
3. **Giọng đọc** — hỏi bạn có engine ưa thích không; mặc định edge-tts `zh-CN-YunxiNeural` (tiếng Trung), kokoro-82m `am_liam` (tiếng Anh); có thể nộp sẵn audio.
4. **30 giây đầu** — chỉ dựng nhóm đầu rồi render 30 giây để duyệt look; sửa phong cách ở đây tốn 1 nhóm, sau render đầy đủ tốn mọi nhóm.

## Thông số đầu ra

| | |
|---|---|
| Frame / rate | 1280×720 @ 30fps, H.264 |
| Độ dài | bạn chọn; 2-8 phút đều ổn (2-3 phút ≈ 1 giờ, 3-5 phút ≈ 2 giờ, 5-8 phút ≈ 2-3 giờ đồng hồ thời gian thực; cần ≥5 GB disk trống) |
| Ngôn ngữ | Trung hoặc Anh (`lang` trong `src/config.ts`) |
| Look | nền đen, 2 loại backdrop (`'dots'` mặc định / `'stars'`), line art trắng + điểm nhấn tím, headline siêu đậm |
| Lớp cố định | phụ đề 44px viền đen, thanh tiến độ chương, capsule HUD, credit cuối (`builtBy`, đặt `''` để bỏ) |
| Giọng đọc | edge-tts (Trung) / kokoro-82m (Anh), hoặc TTS riêng / audio làm sẵn |

## So với các loại tool khác

| Loại | Tạo ra gì | Khác biệt của anything2explainer |
|---|---|---|
| Model video sinh (Sora, Veo, Runway) | Footage tổng hợp từ prompt | Code xác định, không phải pixel. Mỗi con số trên màn hình truy vết được URL nguồn; frame nào cũng sửa được bằng một file shot |
| Avatar/presenter (HeyGen, Synthesia) | Digital presenter đọc kịch bản | Không có presenter. Diagram motion-graphics chỉ cơ chế, narration dẫn hình |
| Remotion/Motion Canvas thủ công | Canvas video lập trình được | Kèm phương pháp trên canvas: research → narration → storyboard → build song song → QC, với spec phong cách và phim tham chiếu |
| Manim | Hoạt hình toán Python | Pipeline end-to-end do agent điều phối, phụ đề căn TTS, chương và QC; React/TS thay vì Python |

## FAQ rút gọn

- **Cần GPU?** Không — Remotion render qua headless Chromium trên CPU; edge-tts là call cloud Microsoft, kokoro-82m chạy cục bộ.
- **Dùng giọng/TTS riêng?** Được — đặt audio tại `public/assets/<slug>/audio.wav`, điền tay `src/common/timeline.ts` và `subs.ts`.
- **Render tái lập được?** Có — mọi animation là hàm thuần của số frame với random có seed.
- **9:16 dọc?** Chưa — template và mọi safe-area giả định ngang 1280×720.
- **Ngôn ngữ?** Trung và Anh. (Tiếng Việt chưa có — muốn làm bản Việt cần tự thêm pacing model + ngân sách phụ đề + giọng.)

## Giấy phép — đọc kỹ

Toolkit theo **PolyForm Noncommercial 1.0.0**: miễn phí cho dùng phi thương mại; **dùng thương mại cần sự đồng ý trước của tác giả**. Video bạn làm bằng nó là của bạn. 4 font kèm theo theo SIL OFL 1.1; Remotion có điều khoản riêng cho công ty. Skill **kèm script Python/shell** → review-required theo quy tắc hub.

## Điểm gốc rễ

- **Mọi frame vẽ bằng code**, không lấy frame/clips từ video có sẵn; B-roll live-action (nếu có) phải từ nguồn royalty-free và ghi vào MANIFEST (sha256/nguồn/license).
- **Mọi số liệu có nguồn**: mọi con số, năm, tổ chức, thuật ngữ hiển thị phải truy vết được URL nguồn trong tài liệu research của phim đó; thứ chưa kiểm chứng không lên màn hình, không vào narration.
- Phong cách học từ creator Douyin **@图灵宇宙** (nền đen, line art trắng + tím, chữ siêu đậm); mọi thứ trong repo vẽ lại từ đầu bằng code.
