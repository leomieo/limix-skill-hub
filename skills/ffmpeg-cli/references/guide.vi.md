# ffmpeg-cli — hướng dẫn tiếng Việt

Hướng dẫn dùng FFmpeg/ffprobe để đọc metadata, chuyển đổi, cắt ghép và xử lý âm thanh/video. Do Limix Skill Hub biên soạn từ tài liệu của FFmpeg; khác với ffmpeg-skill đã có từ nhà phát triển bên thứ ba.

## Cách dùng và giới hạn

Đây là adapter do Limix Skill Hub biên soạn, không phải skill chính thức của FFmpeg. Repo nguồn là bản mirror FFmpeg; không có `SKILL.md` tại commit đã kiểm tra. Tài liệu CLI và giấy phép được giữ nguyên byte trong `references/upstream/`.

Cung cấp đường dẫn media, định dạng đầu ra, codec hoặc giới hạn dung lượng mong muốn. Giữ nguyên file gốc, mặc định không ghi đè. Khi được phép thực thi mới kiểm tra bản FFmpeg/ffprobe và codec có thật trên máy. Tác vụ dài cần giới hạn thời gian đủ dài và phải chờ lệnh kết thúc trước khi xác nhận đầu ra.

Không có binary hoặc bộ codec đi kèm. Giấy phép upstream chủ yếu LGPL, có thành phần/tùy chọn GPL và điều kiện riêng theo build; xem `LICENSE.md` cùng các file `COPYING.*`, không suy ra quyền của mọi bản phân phối. Mục `ffmpeg-skill` cũ vẫn giữ nguồn bên thứ ba riêng, không được đổi nhãn thành skill chính thức.

## Ví dụ yêu cầu

- Dùng ffprobe đọc codec, độ phân giải và thời lượng video.
- Chuyển video sang MP4 và giữ nguyên file đầu vào.

## Tải tài liệu theo nhu cầu

Tìm bằng tên/mô tả/aliases trong manifest. Khi kích hoạt mới đọc SKILL.md; reference chỉ đọc khi cần. Không nạp hai bản tài liệu đầy đủ trùng nội dung. Không dịch API, tên Tool, CLI, biến hay đường dẫn.

Trạng thái: **review-required**. Chưa tự bật skill/tool hoặc chạy script từ nguồn. Nguồn: https://github.com/FFmpeg/FFmpeg/tree/88c46fce27e311c73772d9b83db4047dd83b1294.
