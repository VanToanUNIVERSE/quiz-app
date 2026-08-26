# Quiz App — ứng dụng trắc nghiệm với chấm điểm phía server, xây bằng Laravel API + React
## Tính năng: 
  - Tạo/sửa/xóa bộ câu hỏi
  - Làm bài, chấm điểm server-side chống gian lận, xác thực người dùng
## Công nghệ: 
Backend Laravel (REST API, Sanctum), Frontend React + Vite, MySQL.


## Cài đặt & Chạy

### Backend (Laravel)
1. `cd backend`
2. `composer install`
3. `copy .env.example .env`
4. `php artisan key:generate`
5. Mở `.env`, điền thông tin database (DB_DATABASE, DB_USERNAME, DB_PASSWORD)
6. Tạo một database rỗng trong MySQL (tên khớp DB_DATABASE)
7. `php artisan migrate`
8. `php artisan serve`

### Frontend (React + Vite)
1. `cd fontend`
2. `npm install`
3. `copy .env.example .env` (điền VITE_API_URL, ví dụ http://127.0.0.1:8000)
4. `npm run dev`

## Ghi chú bảo mật
Dự án được tự rà soát bảo mật, phát hiện và vá 8 lỗ hổng — 
nghiêm trọng nhất là API để lộ đáp án cho client. 
Đã chuyển toàn bộ việc chấm điểm về server kèm kiểm tra chống gian lận, 
ẩn đáp án khỏi API, thêm xác thực và validation.
