# golive — hướng dẫn tiếng Việt

Đưa sản phẩm do agent viết từ repo lên production chạy thật trên tài khoản CỦA CHÍNH NGƯỜI DÙNG — hosting (Vercel, Netlify), database (Supabase, Neon), auth (Supabase), domain/DNS (Porkbun, GoDaddy), email (Resend), payments (Stripe test-mode). Agent phát hiện app cần gì, lập plan chính xác từng thay đổi, hỏi duyệt trước, áp dụng bằng đăng nhập của người dùng, rồi kiểm chứng cái gì thật sự chạy — ghi lại mọi thứ nó tạo ra, tái kiểm tra drift theo yêu cầu (golive status), và dọn dẹp lại được (golive teardown). Early alpha 0.1.0-alpha.9. Dùng khi người dùng muốn ship, deploy, go live, launch, publish app, hoặc nối env vars, webhook, auth settings, email DNS, custom domain.

## Cách dùng

- Gọi kỹ năng bằng tên gốc `golive` hoặc mô tả yêu cầu bằng tiếng Việt.
- Ví dụ: “Dùng golive cho tác vụ của tôi; giải thích kết quả bằng tiếng Việt.”
- Cung cấp đầu vào và kết quả mong muốn. Các điều kiện, giới hạn và bước duyệt tuân theo `SKILL.md` gốc.

## Ngôn ngữ và giới hạn

Tài liệu này chỉ giải thích cho người dùng; không thay đổi quy trình thực thi. Agent đọc `SKILL.md` khi kích hoạt, chỉ đọc reference phù hợp khi cần. Không nạp đồng thời bản dịch đầy đủ. Giữ nguyên tên Tool, API, MCP, CLI, tham số, mã nguồn và đường dẫn.

Trạng thái: **quarantined**. Chưa chạy thử script hoặc dịch vụ ngoài. Việc quét tĩnh không bảo đảm an toàn; quyền sử dụng do Limix Bot và chủ bot quyết định.

Nguồn: https://github.com/mikehasa/golive-skill — commit `8fd3d8e96844c79c500aabaf215d1267fcde08c5`.

Phân tích đã lưu: [analysis.vi.md](analysis.vi.md) — nhận xét tham khảo, số liệu có thể cũ.
