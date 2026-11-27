# visual-explainer — hướng dẫn tiếng Việt

Tạo trang HTML tự chứa để giải thích hệ thống, mã, kế hoạch hoặc dữ liệu bằng sơ đồ, hình và diễn giải trực quan.

## Cách dùng

- Yêu cầu tác vụ và cung cấp đầu vào, đích đến cùng định dạng mong muốn.
- Ví dụ: “Dùng visual-explainer để minh họa luồng dữ liệu trong dịch vụ này bằng một trang HTML ngắn.”
- Làm theo quy trình, giới hạn và yêu cầu duyệt trong `SKILL.md` gốc. Chỉ đọc reference mà tác vụ cần.

## Lưu ý

Quét tĩnh cảnh báo denylist tên tệp bí mật trong kit/files.mjs và U+200D/U+FEFF trong regex của thư viện vendor minified. Cấu hình plugin .claude-plugin/plugin.json bị loại; gói tiếp tục cách ly và chưa chạy mã.

Tệp hướng dẫn này chỉ hỗ trợ sử dụng; không thay đổi core tiếng Anh hoặc tự cấp quyền chạy script.
