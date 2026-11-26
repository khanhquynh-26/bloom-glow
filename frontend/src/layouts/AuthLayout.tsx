import { Outlet } from 'react-router-dom';

/**
 * Layout route cho nhóm trang đăng nhập / đăng ký.
 * Khung giao diện nằm trong components/AuthShell.tsx (được từng trang dùng trực tiếp),
 * nên layout này chỉ chuyển tiếp nội dung.
 */
export default function AuthLayout() {
  return <Outlet />;
}
