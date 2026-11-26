import { useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthShell from '../components/AuthShell';
import { useAuth } from '../hooks/useAuth';
import { getErrorMessage } from '../services/http';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(0|\+84)[0-9]{9}$/; // khớp với backend

export default function RegisterPage() {
  const { register, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to={isAdmin ? '/admin' : '/'} replace />;
  }

  function validate(): string {
    if (!fullName.trim()) return 'Vui lòng nhập họ tên';
    if (!EMAIL_REGEX.test(email.trim())) return 'Email không hợp lệ';
    if (phone.trim() && !PHONE_REGEX.test(phone.trim())) return 'Số điện thoại không hợp lệ';
    if (password.length < 6) return 'Mật khẩu tối thiểu 6 ký tự';
    if (password !== confirmPassword) return 'Mật khẩu nhập lại không khớp';
    return '';
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      // Không gửi confirmPassword: backend từ chối các trường không có trong DTO
      const newUser = await register({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        ...(phone.trim() ? { phone: phone.trim() } : {}),
      });

      // Đăng ký công khai luôn tạo CUSTOMER, nhưng vẫn điều hướng theo role cho thống nhất
      if (newUser.role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      setError(getErrorMessage(err));
      setSubmitting(false);
    }
  }

  return (
    <AuthShell>
      <h1 className="ba-auth__title">Tạo tài khoản</h1>
      <p className="ba-auth__subtitle">Lưu địa chỉ giao hàng và theo dõi đơn hàng dễ dàng hơn</p>
      <form onSubmit={handleSubmit} noValidate>
        {error && <div className="ba-alert">{error}</div>}

        <div className="ba-field">
          <label htmlFor="fullName">Họ và tên</label>
          <input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>

        <div className="ba-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="ba-field">
          <label htmlFor="phone">Số điện thoại (không bắt buộc)</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0901234567"
          />
        </div>

        <div className="ba-field">
          <label htmlFor="password">Mật khẩu</label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="ba-field">
          <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="ba-btn ba-btn--block" disabled={submitting}>
          {submitting ? 'Đang tạo tài khoản...' : 'Đăng ký'}
        </button>
      </form>

      <p className="ba-auth__footer">
        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
    </AuthShell>
  );
}
