# build-and-verify — hướng dẫn tiếng Việt

Build ứng dụng SwiftUI trên macOS và kiểm tra ảnh cửa sổ sáng/tối, bố cục cùng tương tác trước khi bàn giao.

Gọi bằng tên gốc hoặc mô tả mục tiêu bằng tiếng Việt. Cung cấp đầu vào, phạm vi file/dự án và kết quả cần nhận. Agent chỉ đọc core khi chọn skill, rồi đọc reference cần thiết. Đây là hướng dẫn ngắn, không thay core.

Gói là quy trình, không chứa template app hoặc các script của dự án đích. Cần chuẩn bị các file và skill liên quan trước khi chạy. Không phù hợp chạy trực tiếp trên Windows.

## Điều kiện

- macOS and Swift toolchain; SKILL.md:3
- Project build.sh, tools/snap.sh, tools/grid-lint.sh, tools/check-layout.swift, tools/selftest.sh; SKILL.md build/snapshot/grid/interaction sections
- Related layout-grid, mac-design, test-mac-app skills; SKILL.md cross-skill references
- Screen Recording permission for snapshots; SKILL.md Screen Recording section

Trạng thái: **review-required**; chỉ đối chiếu nguồn và quét tĩnh. Chưa chạy script, model, provider, build macOS hoặc API. Metadata và allowed-tools trong core không cấp quyền. Cần duyệt riêng trước khi chạy hoặc cài dependency.

Nguồn: https://github.com/daveebbelaar/bama/tree/22dc792ea040a35270c219c669f626594267aa1f/skills/ship/build-and-verify
