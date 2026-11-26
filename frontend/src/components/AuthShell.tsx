import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth-admin.css';

interface AuthShellProps {
  children: ReactNode;
}

/**
 * Khung giữa trang cho đăng nhập / đăng ký: logo Bloom & Glow và một thẻ vừa phải ở giữa. Dùng trực tiếp trong từng trang nên không phụ thuộc
 * vào việc route có bọc AuthLayout hay không.
 */
export default function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="ba-auth">
      <div className="ba-auth__main">
        <header className="ba-auth__brand">
          <Link to="/">Bloom &amp; Glow</Link>
          <span className="ba-auth__tagline">Make every moment bloom</span>
        </header>

        <main className="ba-auth__card">{children}</main>

        <Link to="/" className="ba-auth__back">
          ← Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
}
