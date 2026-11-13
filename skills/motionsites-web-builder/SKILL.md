---
name: motionsites-web-builder
description: "Xây dựng website, landing page và phần hero mang đậm tính điện ảnh đạt chuẩn giải thưởng Awwwards/FWA. Áp dụng quy trình thiết kế bài bản: học hỏi từ 40 mẫu thiết kế đỉnh cao của MotionSites, tích hợp tài nguyên video và đồ họa 3D trong suốt, chỉ định thông số thiết kế bằng con số chính xác (clamp, tracking, easings) và vòng lặp tự kiểm tra qua ảnh chụp màn hình (screenshot look-and-fix loop)."
license: MIT
---

# MotionSites Web Builder — Thiết kế Web Đạt Chuẩn Giải thưởng

Công cụ giúp AI coding agent tạo ra các trang web và landing page có chiều sâu nghệ thuật, vượt qua giới hạn của các layout AI khuôn mẫu thông thường.

## Quy trình 5 Bước Tiêu chuẩn

1. **Xác lập Định hướng Nhanh (Read & Decide):**
   - Xác định 5 thông số cốt lõi:
     - **Đối tượng & Mục đích:** Sản phẩm là gì và khách truy cập cần thuyết phục là ai.
     - **Sắc thái (Mood):** Định nghĩa bằng đúng 3 từ khóa (ví dụ: *"calm, expensive, nocturnal"*).
     - **Điểm nhấn Nhận diện (Signature):** Một khoảnh khắc tương tác độc đáo khiến người xem nhớ mãi.
     - **Định dạng Đầu ra:** Một tệp `index.html` độc lập (chạy qua CDN), cấu trúc mã React/Next.js có sẵn, hoặc prompt chi tiết cho Lovable/Bolt/v0.
     - **Quy mô:** Một phần Hero độc đáo hay toàn bộ Landing Page.

2. **Học hỏi từ Mẫu Thực tế (Study Examples):**
   - Đối chiếu với 2-3 mẫu thiết kế gần nhất trong bộ sưu tập 40 prompt tuyển chọn của MotionSites.
   - Rút ra thông số chính xác: font chữ, mã màu Hex/HSL, khoảng cách `clamp()`, thời gian chuyển động (duration) và đường cong gia tốc (easing). Không sao chép nguyên xi layout mà kế thừa độ tinh tế và tính kỷ luật.

3. **Tích hợp Tài nguyên Điện ảnh (Media Shelf):**
   - Ưu tiên tài nguyên của người dùng hoặc sinh qua AI generator.
   - Khai thác kho tài nguyên công khai: hơn 50 video hero điện ảnh không viền, 30 mô hình 3D trong suốt đã tách nền. Tuyệt đối không để lại các hộp chữ nhật trống rỗng (placeholder).

4. **Viết Bản Đặc tả Kỹ thuật (Spec Writing):**
   - Mọi thành phần đều phải được chỉ định bằng giá trị thực: không bao giờ dùng các cụm từ chung chung như "gradient đẹp" hay "chuyển động mượt".

5. **Vòng lặp Kiểm định Thị giác (Look-and-Fix Loop):**
   - Chụp ảnh màn hình thực tế, rà soát lỗi tràn màn hình trên mobile (horizontal overflow), tính tương phản của chữ trên nền video và sửa đổi ngay trước khi bàn giao.
