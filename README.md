# ✦ GALAXY LETTERS — Một vũ trụ, ngàn lời thương

**Quà tặng ngày Quốc tế Phụ nữ 08.03.2027 · 24 lá thư viết riêng · Mobile first · GitHub Pages**

> Giữa hàng tỷ vì sao trên bầu trời, vẫn có một vì sao mang tên bạn. Và hôm nay, có một lá thư được viết riêng cho vì sao ấy.

Đây là **mã nguồn thật**, không phải bản thiết kế minh họa. Người nhận vào trang, nhập **STT mới**, xem ngôi sao phản hồi, ngắm phong thư mở ra, đọc lời chúc và chạm ngôi sao cuối thư để nhận thông điệp kết. Tài khoản, database, analytics, trả phí và quyền truy cập vị trí **đều không cần thiết**.

## 1. Lưu ý quan trọng về công nghệ

Master Prompt ưu tiên React, Vite, Motion và Vitest nhưng cho phép giải pháp tương đương. Phiên bản được triển khai ở đây sử dụng **TypeScript + HTML/CSS + Canvas 2D + SVG + Web Animations API**; dùng một node DOM liên tục cho các morph transition và `node:test` cho kiểm thử. Cách triển khai này tránh hoàn toàn dependency runtime, không cần tải React/Vite/particles trên điện thoại, và `npm ci` hoạt động với lockfile rỗng. **Không nên quảng bá repo là dự án React/Vite/Vitest** vì đây là kiến trúc TypeScript thuần.

Build dựa trên **Node.js >=22.13** (`node:module.stripTypeScriptTypes`). Cú pháp kiểu được loại bỏ khỏi `.ts` thành `.js`; trình duyệt chỉ tải JavaScript chuẩn. Đường dẫn tương đối hoạt động cho cả `username.github.io/` và `username.github.io/ten-repo/` mà không phải chỉnh base path Vite.

## 2. Hai cách triển khai

### Cách A — nhanh nhất khi chỉ có điện thoại (một file HTML)

Thư mục **`standalone/`** chứa file `index.html` độc lập (~100 KB), có **đủ 24 thư, CSS, Canvas và logic** nằm trong một file; không cần cài npm và không cần tải các file khác.

1. Tải ZIP của dự án và giải nén bằng ứng dụng **Tệp/Files** (iPhone) hoặc **Files của Google** (Android).
2. Vào [github.com/new](https://github.com/new), đăng nhập, tạo repository công khai. Gợi ý đặt tên `galaxy-letters-8-3-2027`. Tích **Add a README file** khi tạo repo qua điện thoại để có nhánh `main`.
3. Mở repository → **Add file** → **Upload files**. Chọn **chỉ file `standalone/index.html`** từ thư mục đã giải nén. Lưu ý: file phải ở **thư mục gốc** của repository và phải có đúng tên `index.html`; **không upload nguyên ZIP**.
4. Nhấn **Commit changes**.
5. Vào **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main / (root) → Save**. Trên màn hình nhỏ, có thể bật **Trang web cho máy tính** để nhìn rõ menu Settings.
6. Đợi GitHub xử lý việc xuất bản, sau đó truy cập `https://USERNAME.github.io/galaxy-letters-8-3-2027/` (thay `USERNAME` bằng tài khoản của bạn).

Cách A vẫn có nội dung và chuyển cảnh cốt lõi, nhưng **không kèm ảnh Open Graph dạng file PNG**. Nếu muốn preview ảnh khi dán link lên Messenger/Zalo, hãy chọn **cách B**.

### Cách B — repository mã nguồn đầy đủ + GitHub Actions (khuyến nghị)

**Yêu cầu:** có Git và Node.js >=22.13 trên máy; hoặc dùng terminal trong GitHub Codespaces khi làm việc bằng điện thoại.

1. Vào [github.com/new](https://github.com/new), tạo repository tên `galaxy-letters-8-3-2027` (không chọn README nếu sẽ push từ Git).
2. Giải nén ZIP nguồn, mở terminal tại thư mục chứa `package.json`, chạy:

```bash
npm ci
npm test
npm run build
git init
git add .
git commit -m "Build GALAXY LETTERS 08.03.2027"
git branch -M main
git remote add origin https://github.com/USERNAME/galaxy-letters-8-3-2027.git
git push -u origin main
```

3. Vào **Settings → Pages → Build and deployment → Source: GitHub Actions** (không chọn Deploy from branch trong cách B).
4. Mở tab **Actions**, tìm workflow **Build, test and deploy GALAXY LETTERS**. Khi thành công, lấy link ở **Settings → Pages** hoặc ở job `deploy`.
5. Link thông thường: `https://USERNAME.github.io/galaxy-letters-8-3-2027/`. Nếu repository chính tên `USERNAME.github.io`, link sẽ là `https://USERNAME.github.io/`.

Workflow `.github/workflows/deploy.yml` tự `npm ci` → `npm test` (build và kiểm thử) → đóng gói `dist/` → publish bằng `actions/upload-pages-artifact@v3` và `actions/deploy-pages@v4`. Thông tin GitHub Pages base path được xử lý bằng URL asset tương đối. Khi build trên Actions, OG image tự đổi thành URL tuyệt đối phù hợp cho preview mạng xã hội; **nếu dùng custom domain**, cần cập nhật URL metadata cho đúng domain.

**Trên điện thoại vẫn có thể dùng cách B:** mở repository → **Code → Codespaces → Create codespace** → trong VS Code web chọn **Upload** file ZIP nguồn → ở terminal giải nén và chép **nội dung bên trong** vào thư mục repository (bao gồm `.github`), rồi `git add .`, `git commit`, `git push`. Codespaces phụ thuộc quyền sử dụng/quota GitHub của bạn. Cách A đơn giản hơn đáng kể.

## 3. Chạy và chỉnh sửa trên máy

```bash
npm ci
npm run dev           # http://localhost:5173; sửa file sẽ tự build lại, refresh trình duyệt
npm test              # chạy 33 bài kiểm tra tích hợp/dữ liệu/asset
npm run build         # dist/ và standalone/index.html
npm run preview       # http://localhost:4173
npm run standalone    # chỉ tạo lại bản HTML một file
```

`tsconfig.json` cấu hình TypeScript strict. Nếu đã cài TypeScript compiler (`tsc`), có thể thêm:

```bash
tsc -p tsconfig.json --pretty false
```

Các lệnh build/test **không cần tải dependency nào**; cảnh báo `ExperimentalWarning` của Node 22 về TypeScript stripping không có nghĩa là build thất bại.

## 4. Chỉnh ngày, tên lớp, chữ ký, hiệu ứng

Chỉnh **`src/data/eventConfig.ts`**:

| Trường | Mặc định | Mục đích |
|---|---|---|
| `sender` | `Một người bạn trong lớp` | Người ký thư; đổi thành tên bạn hoặc tập thể |
| `currentClassName` | `''` | **Chưa xác nhận tên lớp hiện tại**, để trống |
| `schoolYearReference` | `10A5 — 2024–2025` | Tham chiếu lịch sử, không nhận là lớp hiện tại |
| `eventDate` | `2027-03-08` | Ngày kỷ niệm |
| `enableAudio` | `false` | Chỉ hiện nút âm thanh khi chủ trang bật |
| `enableParticles` | `true` | Bật/tắt Canvas stars (nền gradient vẫn tồn tại) |
| `enableIntro` | `true` | Bật/tắt cảnh mở đầu |
| `showCountdown` | `false` | Hiện đếm ngược; **không khóa website** |

Đổi palette trong `src/styles/variables.css` và chủ đề theo STT trong `src/utils/visualSeed.ts`. Đổi tiêu đề, chữ trên cảnh ở `src/components/`.

**Nếu đang dùng cách A một file HTML:** mọi nội dung và cài đặt nằm ngay trong `standalone/index.html`; có thể mở bằng GitHub **Edit file** và tìm `sender:` hoặc `letter-19`. Muốn bảo trì dễ hơn, sửa mã nguồn `.ts` rồi chạy `npm run standalone` để tái tạo.

## 5. Dữ liệu 24 người nhận — STT MỚI

Thay đổi tại `src/data/recipients.ts`; từng thư nằm trong `src/data/letters.ts` theo `letterId` tương ứng. Có 24 STT nhận thư:

`1, 5, 6, 8, 10, 17, 18, 19, 20, 22, 23, 24, 25, 32, 33, 35, 36, 40, 41, 42, 43, 44, 45, 46`.

**Các trường hợp bắt buộc:**

- STT **5** = Trần Hoàng Mỹ Đình; **18** = Lee Huan Ling; **19** = Trần Thị Ánh Minh.
- **33** = Lý Minh Thư; **34** = Thông (**không có thư**); **35** = Phan Ngọc Anh Thư; **36** = Trần Võ Anh Thư.
- **45** = Nguyễn Thụy Nhất Linh; **46** = Phạm Nguyễn Thiên Nga (hai bạn đã chuyển lớp nhưng vẫn có thư riêng).
- Có 46 vị trí lớp (1–46); **không lưu toàn bộ tên 46 học sinh** vì không cần cho tính năng và tránh lộ dữ liệu.

Tên dùng khóa **STT duy nhất**. Chỉnh `displayName` để dùng cách gọi thân mật trong giao diện. `fullName` chỉ phục vụ đối chiếu thông tin trong dữ liệu; màn đọc hiện **displayName**, không tự xuất toàn bộ họ tên. Nếu chỉnh STT, cần đổi cả `stt` và `letterId` tương ứng, rồi chạy `npm test`.

`src/data/personalNotes.ts` dành cho kỷ niệm thật, đặc điểm đã được xác minh và sự đồng ý của người nhận. Ghi chú chưa có thì giữ trống. **Không tự khẳng định tính cách, kỷ niệm hoặc chuyện cá nhân nếu chưa được xác nhận.**

## 6. Bảo vệ sự riêng tư

**Github Pages là website tĩnh, không phải hệ thống lưu thư bí mật.** Ai có khả năng xem nguồn JavaScript công khai cũng có thể đọc danh sách và nội dung thư. STT chỉ là cách điều hướng, **không phải mật khẩu**. Không dùng sản phẩm để lưu ngày sinh, số điện thoại, địa chỉ, thông tin nhạy cảm; không tự động gửi STT, tên hay nội dung thư cho dịch vụ thứ ba. Không dùng tracker/analytics.

**Trước khi công khai, cần kiểm tra và xin phép những người liên quan**, đặc biệt việc công khai họ tên, nội dung thư và thông tin về hai bạn đã chuyển lớp. Có thể thay `fullName` trong mã nguồn bằng tên viết tắt/nickname nếu chưa có sự đồng ý; khi ấy cập nhật test định danh tương ứng.

## 7. Kiểm thử và tiêu chí nghiệm thu

- `npm ci --offline --ignore-scripts`: thành công trên môi trường tạo dự án.
- `npm run build`: thành công trên Node v22.16.0.
- `npm test`: **33/33 bài test đạt** tại lần kiểm tra cuối. Chúng kiểm tra toàn bộ 24 họ tên+STT, sự phân biệt các tên gần giống, validation, đặc biệt STT 34, nội dung thư 120–180 từ, seed hình ảnh ổn định, asset path và mô phỏng trạng thái DOM.
- `tsc -p tsconfig.json --pretty false`: thành công tại lần kiểm tra với TypeScript 5.8.3 có sẵn trong môi trường.
- **Chưa có bằng chứng kiểm thử hình ảnh tự động bằng Chrome/iOS Safari thực tế** trong môi trường tạo này: trình duyệt Chromium hệ thống áp chính sách `URLBlocklist: ["*"]` nên chặn cả localhost/file. Không thể kết luận đã nghiệm thu hiệu năng/FPS và hình ảnh trên thiết bị thật. Tham khảo `docs/ACCEPTANCE.md` và chạy smoke test Playwright tại môi trường cho phép mở trang.

Dự án có mã kiểm thử trình duyệt tùy chọn `tests/browser_smoke.py`. Cài Playwright/Chromium trên máy thông thường, mở `npm run preview`, rồi chạy script này. Nó kiểm tra các mốc 320–1280 px, cảnh chuyển động, STT đặc biệt và bản độc lập. Điều chỉnh `CHROMIUM_PATH` nếu dùng browser system khác.

## 8. Trước ngày 08/03/2027

1. **Xác nhận** các STT mới và 24 tên với danh sách lớp cập nhật. Tệp gốc là dữ liệu tham chiếu, không có bằng chứng độc lập rằng tất cả STT còn nguyên đến ngày phát hành.
2. Kiểm tra cách gọi `displayName` và xin phép người nhận trước khi công khai toàn bộ nội dung trong repository.
3. Thay `sender`, kiểm tra `currentClassName` (để trống cho tới khi xác nhận), đọc lại tất cả 24 lời chúc.
4. Thử thực tế ở **Safari iPhone**, **Chrome Android**, **Samsung Internet**, **Chrome/Firefox/Edge** và khi mở link trong Messenger/Zalo; thử Android bàn phím số, iPhone notch/Dynamic Island, **320/360/375/390/414/430/768/1024/1440 px**, màn hình ngang.
5. Nhập thử **01, 5, 18, 19, 33, 34, 35, 36, 45, 46, 0, 47, abc**; kiểm tra tên/ẩn hiện thư, nút bỏ qua, scroll, chia sẻ, bật Reduced Motion.
6. Test cả URL GitHub Pages thực tế dưới `/repository-name/`, chia sẻ vào Messenger/Zalo và quan sát ảnh preview.
7. Sau ngày 08/03/2027 trang vẫn hoạt động, không có countdown chặn nội dung.

---

**Định hướng thẩm mỹ:** dreamy cosmic · elegant · cinematic · không dùng nền video nặng · không dùng nhạc bản quyền. Khi lá thư xuất hiện, bầu trời dịu đi để câu chữ được ưu tiên.
