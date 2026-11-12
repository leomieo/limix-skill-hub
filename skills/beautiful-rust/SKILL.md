---
name: beautiful-rust
description: "Bộ kỹ năng viết, thẩm định (review) và chuyển đổi mã Rust chuẩn mực (idiomatic Rust) cho coding agent: tổng hợp từ Google Rust Style Guide, Rust API Guidelines, Effective Rust, Rust Design Patterns và hướng dẫn của Microsoft. Bao gồm tư duy thiết kế Result/Option thay vì panic, quản lý quyền sở hữu (ownership/lifetimes), tránh phân bổ bộ nhớ thừa, cấu hình Clippy thực chiến và quy trình chuyển đổi mã từ C/C++/Python/Go sang Rust có đối soát test."
---

# beautiful-rust: Kỹ năng lập trình Rust chuẩn mực cho Agent

Beautiful Rust cung cấp bộ quy tắc và phương pháp luận chuyên sâu giúp coding agent viết, đánh giá và cấu trúc lại mã nguồn Rust đạt tiêu chuẩn công nghiệp cao nhất.

## 3 Kỹ năng cốt lõi

1. **Thực hành Lập trình Chuẩn mực (`rust-best-practices`):**
   - **Tư duy Rust nguyên bản:** Không chuyển đổi nguyên xi cấu trúc từ C++, Java hay Python. Sử dụng triệt để `Result` cho xử lý lỗi, `Option` cho giá trị rỗng, mô hình quyền sở hữu và `Drop` để quản lý tài nguyên.
   - **Quản lý lỗi chuyên nghiệp:** Định nghĩa kiểu lỗi rõ ràng với `thiserror` cho thư viện hoặc `anyhow` cho ứng dụng; không bao giờ gọi `unwrap()` hoặc `expect()` trong mã nguồn sản xuất trừ khi có chứng minh bất biến không thể vi phạm.
   - **Tối ưu bộ nhớ & zero-cost:** Ưu tiên truyền tham chiếu mượn (`&str`, `&[T]`) thay vì sao chép (`String`, `Vec<T>`); hạn chế cấp phát trên heap trong các đường dẫn gắt gao (hot path).
   - **An toàn song song (Concurrency):** Sử dụng các cấu trúc dữ liệu thread-safe (`Arc`, `RwLock`, `Mutex`, kênh `mpsc`) đúng mục đích, phòng tránh deadlock và rò rỉ bộ nhớ.
   - **Kiểm soát mã không an toàn (Unsafe):** Cách ly tối đa khối `unsafe`, luôn ghi chú `# Safety` giải thích rõ các điều kiện tiền đề bắt buộc phải thỏa mãn.

2. **Thẩm định & Đánh giá Mã nguồn (`rust-review`):**
   - Đánh giá mã nguồn hiện có (tệp `.rs`, crate, pull request hoặc git diff).
   - Phân loại phát hiện theo mức độ ưu tiên (Nghiêm trọng, Cảnh báo, Cải tiến phong cách).
   - Mỗi phát hiện đều trích dẫn chính xác quy tắc bị vi phạm và cung cấp đoạn mã sửa đổi cụ thể (concrete diff fix).

3. **Chuyển đổi Mã nguồn An toàn (`rust-port`):**
   - Quy trình chuyển đổi logic từ C, C++, Python, Go hoặc JavaScript sang Rust.
   - Nguyên tắc: Chuyển đổi và chạy pass toàn bộ bộ unit test của ngôn ngữ gốc trước, sau đó mới hiện thực hóa mã nguồn Rust tương ứng để đảm bảo tính tương đồng 100%.

## Cấu hình Clippy sẵn sàng
Tích hợp sẵn tệp cấu hình linter Clippy nghiêm ngặt nhằm tự động phát hiện các đoạn mã chưa tối ưu, lặp logic hoặc vi phạm quy chuẩn ngay trong quá trình biên dịch (CI).
