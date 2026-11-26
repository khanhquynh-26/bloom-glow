import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/auth-admin.css';

const links = [
  { to: '/admin', label: 'Tổng quan', end: true },
  { to: '/admin/products', label: 'Sản phẩm', end: false },
  { to: '/admin/categories', label: 'Danh mục', end: false },
  { to: '/admin/orders', label: 'Đơn hàng', end: false },
  { to: '/admin/users', label: 'Người dùng', end: false },
];

/**
 * Khung khu vực quản trị. Việc chặn người không phải admin do <RequireAuth adminOnly />
 * bọc ngoài trong App.tsx đảm nhiệm.
 */
export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="ba-admin">
      <aside className="ba-admin__sidebar">
        <div className="ba-admin__brand">
          <div className="ba-admin__logo">Bloom &amp; Glow</div>
          <span className="ba-admin__sub">Quản trị</span>
        </div>
        <nav className="ba-admin__nav">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="ba-admin__main">
        <header className="ba-admin__header">
          <span className="ba-admin__hello">
            Xin chào, <strong>{user?.fullName}</strong>
          </span>
          <div className="ba-admin__actions">
            <Link to="/" className="ba-btn ba-btn--ghost ba-btn--sm">
              Về trang chủ
            </Link>
            <button type="button" className="ba-btn ba-btn--sm" onClick={handleLogout}>
              Đăng xuất
            </button>
          </div>
        </header>
        <div className="ba-admin__content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
