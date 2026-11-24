
import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingBag,
  Users,
  BarChart3,
  Menu,
  X,
  LogOut,
  Store,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

const menuItems = [
  {
    title: 'Tổng quan',
    path: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Sản phẩm',
    path: '/admin/products',
    icon: Package,
  },
  {
    title: 'Danh mục',
    path: '/admin/categories',
    icon: Tags,
  },
  {
    title: 'Đơn hàng',
    path: '/admin/orders',
    icon: ShoppingBag,
  },
  {
    title: 'Người dùng',
    path: '/admin/users',
    icon: Users,
  },
  {
    title: 'Thống kê AI',
    path: '/admin/analytics',
    icon: BarChart3,
  },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('bloom_token');
    localStorage.removeItem('bloom_user');

    navigate('/login');
  };

  return (
    <div className="admin-layout">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="admin-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`admin-sidebar ${
          sidebarOpen ? '' : 'collapsed'
        } ${mobileMenuOpen ? 'mobile-open' : ''}`}
      >
        <div className="admin-brand">
          <div className="admin-brand-icon">
            <Store size={22} />
          </div>

          {sidebarOpen && (
            <div className="admin-brand-text">
              <strong>Bloom & Glow</strong>
              <span>Administration</span>
            </div>
          )}

          <button
            className="admin-close-mobile"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Đóng menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="admin-menu-label">
          {sidebarOpen && 'QUẢN LÝ HỆ THỐNG'}
        </div>

        <nav className="admin-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) =>
                  `admin-nav-item ${isActive ? 'active' : ''}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon size={19} />

                {sidebarOpen && <span>{item.title}</span>}

                {sidebarOpen && (
                  <ChevronRight className="admin-nav-arrow" size={15} />
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="admin-sidebar-bottom">
          <button
            className="admin-nav-item"
            onClick={() => navigate('/')}
          >
            <Store size={19} />
            {sidebarOpen && <span>Xem cửa hàng</span>}
          </button>

          <button
            className="admin-nav-item admin-logout"
            onClick={handleLogout}
          >
            <LogOut size={19} />
            {sidebarOpen && <span>Đăng xuất</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div
        className={`admin-main ${
          sidebarOpen ? '' : 'sidebar-collapsed'
        }`}
      >
        <header className="admin-header">
          <div className="admin-header-left">
            <button
              className="admin-menu-toggle"
              onClick={() => {
                if (window.innerWidth <= 768) {
                  setMobileMenuOpen(true);
                } else {
                  setSidebarOpen(!sidebarOpen);
                }
              }}
              aria-label="Mở menu"
            >
              <Menu size={22} />
            </button>

            <div className="admin-header-title">
              <span>Bloom & Glow</span>
              <strong>Trang quản trị</strong>
            </div>
          </div>

          <div className="admin-header-right">
            <div className="admin-header-ai">
              <Sparkles size={17} />
              <span>AI Management</span>
            </div>

            <div className="admin-avatar">A</div>

            <div className="admin-profile">
              <strong>Administrator</strong>
              <span>Quản trị viên</span>
            </div>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>

        <footer className="admin-footer">
          © 2026 Bloom & Glow. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
