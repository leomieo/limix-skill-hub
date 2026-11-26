# Requirements — yêu cầu công cụ và thư viện

This is a Hub-authored factual inventory, not an installation script or an upstream dependency file. Evidence paths below refer to the separately pinned upstream checkout at d151f9c2980abc304c1ae4918c2272675cd9e4c2. No upstream file content is bundled.

| Thành phần | Yêu cầu quan sát được | Bằng chứng nguồn |
|---|---|---|
| Python | README ghi 3.9+; Dockerfile dùng 3.10-slim; chưa xác minh phiên bản tối thiểu thực chạy | README.md:116; Dockerfile:1 |
| Node.js | 18+, tùy chọn theo README cho một số luồng live/challenge; không coi là cần cho mọi tác vụ | README.md:117 |
| pip | Cần giải quyết tập phụ thuộc Python trong môi trường riêng; chưa cài | requirements.txt |
| FFmpeg | Tùy chọn cho nhánh trích âm thanh phân tích khi xuất bản; mã dò bằng shutil.which và có nhánh dự phòng, chưa thử | dy_apis/douyin_creator_api.py:458-469 |
| Docker | Tùy chọn; Dockerfile không tự chứng minh image chạy được | Dockerfile |
| Công cụ build image | curl, gnupg, build-essential, git được Dockerfile khai báo; chỉ cho luồng build đó | Dockerfile:6-9 |
| Xác thực | Phiên Douyin của tài khoản được phép; DY_COOKIES là bí mật, không gửi qua chat | README.md:126-135 |
| Mạng | HTTP/HTTPS và WebSocket tới dịch vụ và media liên quan; cần giới hạn theo tác vụ | dy_apis/; dy_live/ |
| Dữ liệu cục bộ | Media, Excel, log và cơ sở dữ liệu; chọn thư mục riêng, không ghi đè | main.py; utils/data_util.py; dy_live/user_db.py |

## Python packages — gói Python

Tên/phiên bản dưới đây là dữ kiện đọc từ requirements.txt, không phải kết quả cài đặt. Phần lớn gói không ghim phiên bản.

| Package spec | Dòng nguồn |
|---|---:|
| `aiofiles` | 1 |
| `lxml` | 2 |
| `cryptography` | 3 |
| `ecdsa` | 4 |
| `loguru` | 5 |
| `openpyxl` | 6 |
| `opencv-python-headless` | 7 |
| `av` | 8 |
| `pillow` | 9 |
| `python-dotenv` | 10 |
| `qrcode` | 11 |
| `requests` | 12 |
| `retry` | 13 |
| `urllib3` | 14 |
| `websocket-client` | 15 |
| `websockets` | 16 |
| `curl_cffi` | 20 |
| `protobuf>=5.27` | 26 |
| `blackboxprotobuf` | 27 |
| `backports.zstd ; python_version<'3.14'` | 28 |
| `rocksdict==0.3.29` | 29 |
| `jsbeautifier==2.0.3` | 30 |

Upstream ghi nhận blackboxprotobuf yêu cầu protobuf==3.10 trong khi mã sinh mới cần protobuf>=5.27. Đây là xung đột được nguồn mô tả, chưa giải bằng trình quản lý gói; không tự thêm --no-deps, hạ phiên bản hoặc bỏ kiểm tra. backports.zstd là phụ thuộc có điều kiện Python <3.14. pyproject.toml chỉ có cấu hình autopep8, không phải khai báo runtime/package đầy đủ.

## Optional Node packages — gói Node tùy luồng

| Package | Version range | Nguồn |
|---|---|---|
| `canvas` | `^2.11.2` | newsign/package.json |
| `jsdom` | `^25.0.1` | newsign/package.json |
| `jsrsasign` | `^11.1.0` | newsign/package.json |
| `sdenv` | `^0.2.2` | newsign/package.json |
| `vm` | `^0.1.0` | newsign/package.json |

Không có lockfile trong cây nguồn đã ghim cho tập Node này. Chưa xác minh API/ABI của canvas hoặc các gói khác. Không tự cài, build image, chạy demo hay thay quyền.

## Package boundary — phạm vi gói

Hub không kèm bất kỳ file nguồn upstream nào do giấy phép chưa xác minh. Toàn bộ đường dẫn và SHA-256 nằm trong source-audit.json; missingPackageFiles trong catalog liệt kê các file chưa đóng gói. Cần một bản nguồn đầy đủ được phép sử dụng và duyệt riêng trước khi chạy. Không có upstream SKILL.md hoặc MCP server được xác minh. Runtime/provider và môi trường đích đều chưa thử.
