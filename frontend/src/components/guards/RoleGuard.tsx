import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { UserRole } from '../../types/auth';

interface RoleGuardProps {
  allowedRoles: UserRole[];
}

/**
 * Bảo vệ route theo vai trò.
 * - Chưa đăng nhập  -> /login (nhớ trang đang xem để quay lại sau khi đăng nhập)
 * - Sai vai trò     -> về trang chủ
 * Lưu ý: chỉ bảo vệ giao diện, backend vẫn kiểm tra quyền bằng JwtAuthGuard + RolesGuard.
 */
function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Đang kiểm tra tài khoản...</div>;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default RoleGuard;
