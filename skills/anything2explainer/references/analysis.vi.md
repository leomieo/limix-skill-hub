<!-- Legacy curator commentary; not execution instructions. Facts may be stale. -->

# Phân tích: anything2explainer (Vincentwei1021/anything2explainer)

## Thông tin (đo qua GitHub API ngày 12/11/2026, lần chạy 4/30)
- **Repo gốc:** https://github.com/Vincentwei1021/anything2explainer
- **Sao:** 3.251 | **Ngày tạo:** 08/09/2026 | **Push gần nhất:** 09/11/2026
- **Giấy phép:** PolyForm Noncommercial 1.0.0 (phi thương mại) | **Tác giả:** Vincentwei1021 | **Ngôn ngữ:** TypeScript

## Lý do chọn
- 3.251★, push 3 ngày trước — đang được chăm sóc đều, 418 fork.
- Lấp đúng mảng explainer-video có thuyết minh mà hub chỉ có "đá vỡ" (teardown, stack-diagram là diagram/HTML, chưa có pipeline video dài có TTS).
- Chuẩn chất lượng bằng sản phẩm thật: 2 phim mẫu (Anh 5'02", Trung 4'54") + toàn bộ giấy tờ quy trình trong `examples/rag/`.

## Làm gì
Pipeline end-to-end do agent điều phối: chủ đề → research có nguồn → narration → TTS + timeline từng từ → storyboard → agent dựng song song từng shot bằng Remotion component → render → QC định lượng theo chương → sửa → giao MP4 1280×720 với phụ đề căn từng từ, thẻ chương, thanh tiến độ. 9 giai đoạn, 4 checkpoint duyệt (độ dài/ngôn ngữ, narration, giọng đọc, 30 giây đầu).

## Điểm mạnh
- **Mọi frame vẽ bằng code** với random có seed — render tái lập chính xác; sửa một frame = sửa một file shot.
- **Mọi số liệu truy vết nguồn URL** — chuẩn kiểm chứng hiếm thấy ở skill video.
- 4 checkpoint thiết kế hợp lý, đặc biệt "duyệt narration trước TTS" và "duyệt 30 giây đầu" (sửa sớm rẻ hơn sửa sau gấp số nhóm).
- Tài liệu gốc dày (reference/ 7 file spec, lessons.md ghi mọi bẫy gặp qua 3 phim).

## Điểm yếu / rủi ro
- **Giấy phép PolyForm Noncommercial** — chỉ dùng phi thương mại; thương mại cần tác giả đồng ý. Ghi rõ trong SKILL.md Việt hóa.
- **Chưa hỗ trợ tiếng Việt**: chỉ 'zh' | 'en', mỗi ngôn ngữ cần pacing model + ngân sách phụ đề + giọng riêng; làm bản Việt phải tự đòi hỏi kỹ thuật đó.
- Kèm nhiều script Python/shell (tts_build.py, render.sh, frame_metrics.py...) → **review-required** theo quy tắc hub (đã xem: edge-tts là call cloud Microsoft, không có pattern nguy hiểm trong SKILL.md).
- Windows chưa render full được xác nhận; cần Node + Python venv + ffmpeg; tốn 2-3 GB disk mỗi phim, thời gian thực 1-3 giờ.
- Không làm được: video dọc 9:16, talking-head, phim live-action là chính.

## Độ phù hợp với Limix Bot
Trung bình: rất hợp khi Leo cần video giải thích (kiến thức, sản phẩm, giáo dục) chất lượng studio nhưng chỉ ở chuẩn 720p ngang, 2 ngôn ngữ. Với Limix Bot cần máy render (Node + Python + ffmpeg) và chấp nhận thời gian thực dài. Chi tiết giấy phép phi thương mại cần tuân thủ.
