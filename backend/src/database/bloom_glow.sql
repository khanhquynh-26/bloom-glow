-- =====================================================
-- BLOOM & GLOW - Database (MySQL / XAMPP)
-- Phần: users, addresses
-- Quy ước: bảng snake_case, id INT AUTO_INCREMENT,
--          thời gian DATETIME(6) lưu UTC
-- =====================================================
CREATE DATABASE IF NOT EXISTS bloom_glow
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bloom_glow;

CREATE TABLE IF NOT EXISTS users (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  full_name   VARCHAR(100) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  password    VARCHAR(255) NOT NULL,                 -- bcrypt hash
  phone       VARCHAR(20)  NULL,
  role        ENUM('customer','admin')  NOT NULL DEFAULT 'customer',
  status      ENUM('active','blocked')  NOT NULL DEFAULT 'active',
  created_at  DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at  DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS addresses (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  user_id        INT NOT NULL,
  receiver_name  VARCHAR(100) NOT NULL,
  phone          VARCHAR(20)  NOT NULL,
  province       VARCHAR(100) NOT NULL,
  district       VARCHAR(100) NOT NULL,
  ward           VARCHAR(100) NOT NULL,
  street         VARCHAR(255) NOT NULL,
  is_default     TINYINT(1)   NOT NULL DEFAULT 0,
  created_at     DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at     DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  KEY idx_addresses_user_id (user_id),
  CONSTRAINT fk_addresses_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Tạo tài khoản admin: đăng ký bình thường qua API rồi chạy:
-- UPDATE users SET role = 'admin' WHERE email = 'email-cua-ban@example.com';
