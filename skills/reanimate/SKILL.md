---
name: reanimate
description: Tái lập chuyển động và hoạt họa (animation) từ bất kỳ mẫu tham chiếu nào (URL trang web thực tế, video quay màn hình, mp4/mov/webm, gif, tệp Lottie, bản xuất prototype) từng khung hình vào mã nguồn dự án của người dùng; sau đó tự động ghi hình bản clone và so sánh đối chiếu từng khung hình với bản gốc, lặp lại cho đến khi timing, easing curve, chuỗi hiệu ứng và bố cục khớp chính xác. Dùng khi người dùng muốn sao chép, tái hiện, dịch ngược hoặc chuyển đổi hero section, widget, marquee, carousel, hiệu ứng hover, chuyển trang, loader hoặc hoạt họa 3D/WebGL/Canvas từ video/web mẫu.
---

# reanimate

Tái tạo chính xác chuyển động từ đối tượng tham chiếu mà người dùng chỉ định, chứng minh bằng bảng so sánh từng khung hình (frame-by-frame), và tiếp tục lặp vòng cải tiến cho đến khi kết quả vượt qua bài kiểm tra. Sản phẩm bàn giao là mã nguồn trong dự án của người dùng kèm theo bằng chứng số liệu và bảng đối soát trực quan, không bao giờ chấp nhận đánh giá qua loa "trông có vẻ giống".

## Tiêu chuẩn hoàn thành ("Done")

Xác định mức độ trung thực từ yêu cầu của người dùng và nêu rõ trong phản hồi đầu tiên:

| Mức độ | Khi nào áp dụng | Bắt buộc phải khớp | Được phép khác biệt |
|---|---|---|---|
| **motion-faithful** (mặc định) | "clone animation này", "làm cho web của tôi mượt như trang này", "hero giống hệt trang X nhưng nội dung của tôi" | Bộ kích hoạt (trigger), thứ tự và chuỗi hiệu ứng, độ trễ stagger, thời lượng từng bước (sai số ±80 ms), họ easing, hướng và khoảng cách di chuyển so với kích thước phần tử, tỷ lệ bố cục | Nội dung chữ, màu sắc, phông chữ, hình ảnh, nhận diện thương hiệu |
| **pixel-faithful** | "khớp chính xác 100%", "pixel-perfect", "chi tiết phải khớp từng ly" | Toàn bộ các yếu tố trên cộng với phông chữ, kích thước, màu sắc, khoảng cách, bo góc border-radius, bóng đổ shadow, assets; sai lệch pixel trung bình ≤ 2% | Không có gì khác biệt trừ khi người dùng yêu cầu thay đổi |
| **mixed** | "clone phần X và thêm tính năng Y", "giống trang này nhưng với bảng giá của chúng tôi" | Các phần clone phải đạt một trong hai mức chuẩn ở trên | Các thành phần bổ sung mới (mô tả và kiểm tra để không phá vỡ chuyển động gốc) |

Người dùng có thể thu hẹp phạm vi vào một section, một widget, một trang, hoặc một khoảng thời gian trong video ("3 giây đầu", "từ 0:12 đến 0:15"). Hãy tập trung tái hiện chính xác phạm vi đó.

## Quy trình làm việc

Toàn bộ dữ liệu kiểm tra nằm trong `.reanimate/<tên>/` bên trong dự án của người dùng (thêm vào `.gitignore` trừ khi người dùng muốn commit bằng chứng).

### 0. Xác định phạm vi (Scope)

Ghi 3 dòng đầu vào `.reanimate/<tên>/spec.md` trước khi thu thập:
- **Target**: Đối tượng cần clone (URL + selector / khoảng thời gian video / "nút toggle trong gif").
- **Destination**: Nơi đặt mã nguồn và công nghệ sử dụng (đọc `package.json`, các component hiện có và thư viện animation đang dùng; ưu tiên tái sử dụng stack có sẵn).
- **Fidelity**: Mức độ trung thực (`motion-faithful`, `pixel-faithful`, hoặc `mixed`).

### 1. Thiết lập công cụ

Các kịch bản phân tích yêu cầu [Bun](https://bun.sh). Lần chạy đầu tiên sẽ tải Playwright Chromium và ffmpeg tĩnh:

```bash
bash <skill>/scripts/setup.sh      # cài đặt playwright, ffmpeg, pixelmatch một lần duy nhất
```

Mọi kịch bản chạy bằng lệnh `bun <skill>/scripts/<tên>.ts --help`. Quy tắc cốt lõi: luôn ghi hình mẫu tham chiếu và bản clone với **cùng** viewport, cùng vùng crop, cùng trigger, cùng thời lượng và fps.

### 2. Thu thập dữ liệu mẫu (Capture)

- **Trang web**: `capture.ts --url … --out ref --selector <section> --trigger load|scroll|hover|click|none --duration … --track "<moving elements>"`. Bạn nhận được `video.webm`, `frames/`, `inspect.json` (animation CSS, keyframe, computed styles, font) và `track.json` (tọa độ, kích thước, opacity, transform theo từng frame).
- **Video hoặc GIF**: `frames.ts --in file --out ref/frames --fps 10..30 --start … --end … --crop …`.
- **Canvas, WebGL, WebGPU, 3D**: Thêm `--clock virtual --gl --assets` vào lệnh capture. Virtual clock giúp cố định thời gian chính xác từng frame, trích xuất shader source, uniform và model sang `gl-track.json`.
- **Xuất bảng filmstrip**: `sheet.ts filmstrip --frames ref/frames --out ref/sheets` để xem toàn bộ chuỗi khung hình.

### 3. Lập bảng đặc tả chuyển động (Motion Spec)

Điền vào `spec.md`: mỗi hàng tương ứng một phần tử và một thuộc tính (trigger, thời điểm bắt đầu, thời lượng, độ trễ stagger, giá trị từ đâu → đến đâu, easing curve). Các số liệu được trích xuất từ `inspect.json` hoặc lệnh `easing.ts`.

### 4. Triển khai lập trình (Build)

Viết mã nguồn vào dự án của người dùng theo stack đã chọn (CSS transitions, GSAP timeline, Framer Motion, hoặc Canvas/Three.js). Đảm bảo component có một route chạy thử hoặc file HTML độc lập để ghi hình kiểm tra.

### 5. Kiểm tra đối soát & Tinh chỉnh lặp lại (Verify, Fix, Repeat)

Ghi hình bản clone bằng đúng tham số đã dùng cho mẫu tham chiếu, sau đó chạy:

```bash
bun <skill>/scripts/compare.ts --ref ref/frames --clone clone-N/frames --out compare-N
bun <skill>/scripts/sheet.ts compare --ref ref/frames --clone clone-N/frames --diff compare-N/diff --out compare-N/sheets --every 2
bun <skill>/scripts/easing.ts --track clone-N/track.json --selector "<el>" --prop <translateY|opacity|…> --compare-track ref/track.json
```

Xem bảng so sánh và điều chỉnh từng thông số nhỏ nhất cho đến khi toàn bộ các hàng trong `spec.md` vượt qua bài kiểm tra (thường mất từ 2 đến 5 vòng tinh chỉnh).

### 6. Báo cáo kết quả

Xuất trình báo cáo rõ ràng:
- Mức độ trung thực đạt được và các phần tử đã clone.
- Đường dẫn các tệp mã nguồn đã tạo và cách kích hoạt chuyển động.
- Bảng số liệu của vòng so sánh cuối cùng: sai số timing, tỷ lệ sai lệch trung bình, độ khớp easing curve.
- Đường dẫn tới các ảnh so sánh đối chiếu filmstrip.
