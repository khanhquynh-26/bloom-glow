import { useState } from 'react';
import { UserRound, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <div className="bg-user-menu">
      <button
        type="button"
        className="bg-user-trigger"
        onClick={() => setIsOpen((current) => !current)}
        aria-label="Menu tài khoản"
        aria-expanded={isOpen}
      >
        <UserRound size={20} />
        <ChevronDown size={13} />
      </button>

      {isOpen && (
        <div className="bg-user-dropdown">
          {isAuthenticated ? (
            <>
              <div className="bg-user-info">
                <strong>{user?.fullName || 'Tài khoản của tôi'}</strong>
                <span>{user?.email}</span>
              </div>

              <Link to="/account" onClick={() => setIsOpen(false)}>
                Thông tin tài khoản
              </Link>

              <Link to="/account/orders" onClick={() => setIsOpen(false)}>
                Đơn hàng của tôi
              </Link>

              <button type="button" onClick={handleLogout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Đăng nhập
              </Link>

              <Link to="/register" onClick={() => setIsOpen(false)}>
                Đăng ký
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default UserMenu;