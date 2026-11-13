---
name: ex-ussr-kinship-research
description: "Kỹ năng nghiên cứu phả hệ, lịch sử dòng họ và hồ sơ lưu trữ dựa trên bằng chứng độc lập (evidence-first genealogy). Xử lý dữ liệu sổ hộ tịch giáo hội, đăng ký dân sự, hồ sơ quân ngũ và di cư trên không gian Liên Xô cũ và Đông Âu. Áp dụng quy chuẩn logic nghiêm ngặt: phân tách bản ghi gốc với giải thích suy đoán, phân biệt người trùng tên, quản lý chuỗi bằng chứng có thể tái lập và xuất báo cáo phả hệ kèm định dạng GEDCOM."
license: MIT
---

# Nghiên cứu Phả hệ & Hồ sơ Lưu trữ Dựa trên Chứng cứ

Kỹ năng điều tra và thẩm định quan hệ huyết thống, lịch sử gia đình dựa trên tài liệu lưu trữ gốc với độ tin cậy khoa học cao nhất.

## Nguyên tắc Phương pháp luận Bắt buộc

1. **Phân tách Bản ghi với Suy luận:**
   - Bản ghi gốc (artifact) chứa thông tin gì thì ghi nhận chính xác thông tin đó (nguyên văn tên họ, ngày tháng, địa danh lịch sử).
   - Mọi suy đoán hoặc kết luận về mối quan hệ huyết thống bắt buộc phải được xử lý như một giả thuyết (`hypothesis`) cho đến khi có đủ chứng cứ độc lập đối chiếu.

2. **Giao thức Trạng thái Chứng cứ (Evidence Protocol):**
   - Không đánh giá mức độ tin cậy bằng phần trăm mơ hồ, chỉ sử dụng 6 trạng thái logic chuẩn:
     - `hypothesis`: Giả thuyết ban đầu cần kiểm chứng.
     - `single-source`: Thông tin mới chỉ xuất hiện từ duy nhất một nguồn độc lập.
     - `corroborated`: Được xác thực độc lập từ 2 nguồn tài liệu trở lên.
     - `strongly-corroborated`: Được xác thực chắc chắn từ nhiều nguồn độc lập có thẩm quyền cao.
     - `contradicted`: Xuất hiện mâu thuẫn giữa các tài liệu.
     - `unresolved`: Không thể giải quyết mâu thuẫn với dữ liệu hiện tại.

3. **Kiểm soát Nhóm Nguồn Độc lập (`independence_group`):**
   - Hai bản sao, bản trích lục hoặc bài viết trích dẫn lại từ cùng một cuốn sổ gốc đều thuộc chung một nhóm nguồn (`independence_group`) và **tuyệt đối không được tính là 2 nguồn độc lập**.

4. **Phân biệt Người Trùng tên (Namesake Disambiguation):**
   - Giữ nguyên các định danh `person_id` riêng biệt cho đến khi có bằng chứng xác thực danh tính trùng khớp (số nhà, tên cha mẹ, người đỡ đầu hoặc ngày sinh chính xác).

5. **Mô hình Địa giới Lịch sử:**
   - Tra cứu cơ quan lưu trữ và thẩm quyền hành chính theo địa giới tại thời điểm diễn ra sự kiện trong lịch sử, không tra cứu theo bản đồ phân chia hành chính hiện đại.

## Ranh giới Đạo đức
- Tuyệt đối không sử dụng kỹ năng để điều tra, theo dõi thông tin liên lạc hoặc đời tư của những người còn sống.
