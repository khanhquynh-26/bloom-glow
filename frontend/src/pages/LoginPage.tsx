import { useState, type FormEvent } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthShell from '../components/AuthShell';
import { useAuth } from '../hooks/useAuth';
import { getErrorMessage } from '../services/http';

export default function LoginPage() {
  const { login, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Đã đăng nhập (kể cả vừa đăng nhập xong): chuyển về trang đang xem dở, admin vào /admin
  if (isAuthenticated) {
    return <Navigate to={from ?? (isAdmin ? '/admin' : '/')} replace />;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Vui lòng nhập email và mật khẩu');
      return;
    }
    setSubmitting(true);
    try {
      const loggedInUser = await login({ email: email.trim(), password });

      // Chuyển trang dựa trên role
      if (loggedInUser.role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else {
        navigate(from ?? '/', { replace: true });
      }
    } catch (err) {
      setError(getErrorMessage(err));
      setSubmitting(false);
    }
  }

  return (
    <AuthShell>
      <h1 className="ba-auth__title">Đăng nhập</h1>
      <p className="ba-auth__subtitle">Chào mừng bạn trở lại với Bloom &amp; Glow</p>
      <form onSubmit={handleSubmit} noValidate>
        {error && <div className="ba-alert">{error}</div>}

        <div className="ba-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ban@example.com"
          />
        </div>

        <div className="ba-field">
          <label htmlFor="password">Mật khẩu</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Link to="/forgot-password" className="ba-auth__link">
          Quên mật khẩu?
        </Link>

        <button type="submit" className="ba-btn ba-btn--block" disabled={submitting}>
          {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>

      <p className="ba-auth__footer">
        Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
      </p>
    </AuthShell>
  );
}
