# e2e-red-triage — hướng dẫn tiếng Việt

Phân loại một lỗi kiểm thử đầu cuối khó giải thích, phân biệt lỗi sản phẩm với lỗi môi trường và đề xuất kiểm tra phòng ngừa.

## Cách dùng

- Gọi `e2e-red-triage` khi yêu cầu khớp với phạm vi của kỹ năng.
- Chỉ dùng sau khi bước kiểm tra môi trường đã đạt và một ca kiểm thử cụ thể vẫn thất bại hoặc trả kết quả rỗng. Ghi lại bằng chứng và không coi trạng thái chưa xác định là thành công.
- Tham khảo core tiếng Anh và manifest để xem yêu cầu, trạng thái kiểm duyệt và giới hạn tương thích.

Trạng thái: **review-required**. Chưa thực thi script, cài dependency hoặc kiểm thử trên runtime.
Nguồn: https://github.com/sno-ai/sno-station-skills — commit `47336d1a25dd434ebec0a37593abf66ccf1fca98`; giấy phép: Apache-2.0.
