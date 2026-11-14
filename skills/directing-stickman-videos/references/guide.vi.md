# Video người que — hướng dẫn tiếng Việt

Tên kích hoạt gốc: `directing-stickman-videos`. Mục này thay bản wrapper `stickman-video-director`, không tạo skill trùng.

## Chọn đầu ra

- **Director A1–A5:** lập đề xuất/storyboard và prompt độc lập cho từng clip; cung cấp nội dung, tỷ lệ 16:9 hoặc 9:16, phong cách/chủ đề. Thời lượng mặc định 60 giây nếu chưa nêu. Duyệt đề xuất hiện tại trước khi xuất prompt. A6 có quy trình Amber Noir riêng.
- **Autopilot B1–B6:** lập kế hoạch, tạo tài nguyên, thuyết minh, phụ đề, dựng và kiểm tra MP4 theo tuyến được chọn. Đọc reference của đúng phong cách; không áp hợp đồng A1–A5 sang B. B6 có tài liệu chứa tiếng Trung trong nguồn gốc.
- Ví dụ: “Lập storyboard video người que 60 giây, dọc 9:16, Style 1 nền sáng về tiết kiệm điện.” Không tự gọi dịch vụ tính phí chỉ từ việc đọc metadata.

## Yêu cầu môi trường và gói

`package.json` khai báo Node.js >=20, `@napi-rs/canvas@0.1.100`, `sharp@0.35.5`; lockfile được giữ nguyên. Autopilot yêu cầu FFmpeg và FFprobe (references/autopilot.md:31). Python và các import trong script là yêu cầu theo tuyến, không phải tất cả đều là gói pip.

`assets/b6/hong-kong-v90/requirements.txt` khai báo numpy==2.0.2, Pillow==11.3.0, opencv-python-headless==4.13.0.92 cho ví dụ V90, không mặc nhiên áp cho mọi video. Dịch vụ image/video/TTS tùy tuyến phải có công cụ, quyền truy cập và hạn mức thực; thuê bao web không chứng minh quota API. Không cần cài React/Remotion chỉ vì muốn làm video: package nguồn không khai báo chúng.

Catalog xuất requirements có bằng chứng file/dòng, phân biệt declared, import-hint và mention-hint. Không suy tên pip từ tên import và không tự cài dependency. Luồng app hiện có có thể chưa đọc toàn bộ requirements; chưa kiểm thử quét trong app.

**Cách ly / chưa tương thích:** giữ 196 file văn bản/mã gốc; bỏ 518 đường dẫn để không phân phối showcase/phông nhị phân chưa duyệt và tuân thủ giới hạn đóng gói Hub. Danh sách đầy đủ trong `_hub.source.json`; file/module/ảnh/phông/video thiếu thuộc gói upstream, không phải dependency npm/pip. Không kích hoạt hoặc chạy renderer trước khi khôi phục đúng SHA và kiểm tra giấy phép/attribution từng tài nguyên. MIT gốc và các notice được giữ khi có trong gói.

Agent đọc SKILL.md gốc khi kích hoạt và chỉ nạp reference cần thiết. Hướng dẫn Việt này không thay core hoặc cấp quyền. Chỉ kiểm tra tĩnh; chưa chạy script/test upstream, render, provider hoặc kiểm tra phần mềm máy đích.

Nguồn: https://github.com/kaomei/stickman-video-director/tree/b0866bcfd49d1121cd235c2445fa3d8cce307f53/skills/directing-stickman-videos
