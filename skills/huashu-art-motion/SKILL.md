---
name: huashu-art-motion
description: "Hoạt họa nghệ thuật và chuyển động video bằng mã nguồn: phân tích và tái hiện chuyển động; 36 phong cách nghệ thuật thực nghiệm + 16 công thức nghiên cứu chuyển dịch; 9 cú pháp hoạt họa giải thích; kết hợp mã nguồn và tạo khung hình AI; kiểm soát bố cục máy quay, nhịp điệu và chống tình trạng AI slop."
---

# huashu-art-motion: Hoạt họa nghệ thuật bằng mã nguồn

Bạn đóng vai trò đạo diễn, họa sĩ phân cảnh (storyboard), họa sĩ diễn hoạt và dựng phim cho tác phẩm hoạt hình được vẽ bằng mã nguồn. Tiêu chuẩn thành phẩm: khán giả hiểu rõ từng cảnh đang truyền tải điều gì, xem cuốn hút; khi áp dụng phong cách nghệ thuật cổ điển, nhìn vào nhận ra ngay phong cách đó và bức tranh phải "sống động", không phải các tấm ảnh tĩnh chuyển đổi qua lại.

## Hai cấp độ làm việc

- **Cấp độ Tự do (Dành cho mô hình cực mạnh như Opus):** Áp dụng toàn diện: bảng định tuyến, tự kết hợp thư viện, tự viết bộ render; nhưng khâu bàn giao vẫn bắt buộc phải qua cổng kiểm định `scripts/deliver.py` (đèn đỏ từ chối xuất bản).
- **Cấp độ Quỹ đạo kỷ luật (Mặc định cho các mô hình khác):** Đi theo một lộ trình chuẩn mực bắt buộc:
  1. **Lập bảng phân cảnh (Storyboard):** Viết `<dự-án>/bảng_phân_cảnh.md` theo mẫu. Trước bảng phải khóa phong cách tranh bằng 3 dòng:
     - *Phong cách:* một câu duy nhất, toàn bộ phim chỉ dùng đúng 1 phong cách này.
     - *Bảng màu (Palette):* 3–6 mã màu cố định, tuyệt đối không dùng dải màu chuyển xanh tím neon AI slop.
     - *Nhân vật:* Không nhân vật / chỉ xuất hiện bàn tay và bóng lưng / kho frame AI sinh sẵn.
     Mỗi dòng trong bảng là 1 cảnh (thời lượng 2–6 giây): Thời gian | Vật thể cụ thể (danh từ) | Vật thể đang làm gì (động từ) | Động tác máy quay (dừng/đẩy chậm/kéo xa/lia ngang/đẩy nhanh/cắt dứt khoát) | Chữ trên màn hình (≤8 chữ) | Cách làm.
  2. **Vượt qua lint:** Chạy `uv run <skill>/scripts/storyboard_lint.py <dự-án>/bảng_phân_cảnh.md`. Nếu có đèn đỏ, sửa kịch bản và chạy lại; chưa hết đèn đỏ tuyệt đối không được viết code.
  3. **Thực hiện từng cảnh theo bảng phân cảnh:** Mỗi cảnh xuất ra một file `canhNN.mp4` (chuẩn 1920x1080@30fps). Một đoạn chuyển động tham số tối đa kéo dài 8 giây.
  4. **Ghép nối và lồng tiếng:** Nối các cảnh bằng lệnh cắt cứng của ffmpeg (`ffmpeg -f concat`), sau đó lồng tiếng đọc (`ffmpeg -i ...`).
  5. **Kiểm tra chất lượng (QA):** Chạy `qa.py` trên từng cảnh và rà soát kỹ 6 lỗi làm hỏng video.
  6. **Bàn giao qua cổng kiểm định:** Chạy `uv run <skill>/scripts/deliver.py`. Đèn đỏ sẽ từ chối xuất file cho đến khi sửa triệt để.

## Yêu cầu của đạo diễn: Vận hành máy quay

Máy quay là dấu câu, không phải từ ngữ tu sức. Mỗi lần máy chuyển động, phải trả lời được 3 câu hỏi: Khán giả lúc này cần nhìn vào đâu? Đây là chuyển đoạn êm dịu hay điểm nhấn mạnh? Động tác trước đó là gì?

- **Khán giả nhìn rõ thì không chuyển động máy:** Khi hình ảnh bên trong tự thân đang chuyển động (video quay thật, nét vẽ đang được phác, đường cong đang tăng trưởng) hoặc khi khán giả đang đọc chữ, máy quay phải đứng yên.
- **Chuyển tiếp dùng động tác chậm, điểm nhấn mới dùng động tác nhanh:** Dẫn mắt người xem tới chi tiết tiếp theo dùng đẩy chậm (slow push), đi qua lại giữa các vật thể dùng lia ngang (pan), tổng kết phân đoạn dùng kéo xa (pull out). Đẩy nhanh, lao mạnh vào chỉ dành cho khoảnh khắc bất ngờ, kết luận then chốt hoặc chi tiết hài hước.
- **Có đi có lại:** Đã đẩy sâu vào thì cảnh sau phải kéo ra, lia sang bên hoặc cắt dứt khoát sang góc máy khác. Tuyệt đối không đẩy vào liên tiếp 3 cảnh.
- **Toàn phim không thể chỉ có một nhịp điệu:** Tiết tấu phải biến chuyển theo cảm xúc của nội dung: phần giải thích dàn trải thì điềm tĩnh, phần bước ngoặt và cao trào mới đẩy nhanh.

## 6 lỗi phổ biến làm hỏng video (Cần tự soi trước khi bàn giao)

1. **Hội chứng trình chiếu PowerPoint (Slide PPT):** Tiêu đề cố định, các gạch đầu dòng mờ dần hiện ra, mỗi cảnh đều lặp lại cùng một cú lia máy đều đều, kết thúc bằng một tấm thẻ ghi câu châm ngôn ở giữa màn hình.
2. **Sao chép máy móc ví dụ mẫu:** Bê nguyên bố cục, nhân vật và phong cách của video mẫu vào kịch bản mới mà không thiết kế lại theo đúng chủ đề.
3. **Thiếu vắng vật thể cụ thể:** Khái niệm trừu tượng chỉ viết thành chữ bay lơ lửng và vài biểu tượng icon rỗng tuếch.
4. **Phông nền chết, khung hình trống rỗng:** Nền đơn sắc rộng lớn hoặc nền trời sao tĩnh lặng không thay đổi, chỉ có một góc nhỏ ở giữa cựa quậy.
5. **Có tư liệu thật nhưng lại dùng code để vẽ lại:** Ảnh chụp màn hình, ảnh tài liệu, trích dẫn báo chí cần được đặt tràn toàn khung hình thật sắc nét, code chỉ đóng vai trò chú thích, làm nổi bật và điều hướng góc nhìn.
6. **Mùi vị AI rẻ tiền (AI Slop):** Nền chuyển sắc xanh tím neon, nền vũ trụ sâu thẳm tím ngắt; mỗi cảnh nhảy một phong cách khác nhau (đoạn trước người hoạt hình, đoạn sau màn hình code tối, đoạn kế tiếp biểu đồ cột trắng); robot vỏ trắng hoạt họa vụng về.
