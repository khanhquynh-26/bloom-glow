-- Chạy MỘT LẦN nếu database đã có dữ liệu với role chữ thường ('customer', 'admin').
-- Database mới (import bloom_glow.sql) thì KHÔNG cần chạy file này.
-- Phải chọn database bloom_glow trước khi chạy.
USE bloom_glow;

-- Bước 1: đổi tạm sang VARCHAR để sửa giá trị
ALTER TABLE users MODIFY role VARCHAR(20) NOT NULL DEFAULT 'CUSTOMER';

-- Bước 2: đổi dữ liệu cũ sang chữ hoa
UPDATE users SET role = UPPER(role);

-- Bước 3: đổi lại thành ENUM mới
ALTER TABLE users MODIFY role ENUM('CUSTOMER','ADMIN') NOT NULL DEFAULT 'CUSTOMER';
