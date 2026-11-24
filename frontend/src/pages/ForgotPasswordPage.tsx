
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import authService from '../services/auth.service';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim()) {
      setError('Vui lòng nhập địa chỉ email.');
      return;
    }

    try {
      setLoading(true);

      await authService.forgotPassword(email.trim());
      setSuccess(
        'Yêu cầu đã được gửi. Nếu email tồn tại, bạn sẽ nhận được hướng dẫn tiếp theo.'
      );
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        'Không thể gửi yêu cầu. Vui lòng thử lại.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <p className="auth-eyebrow">ACCOUNT RECOVERY</p>

        <h1>Quên mật khẩu?</h1>

        <p className="auth-description">
          Nhập email đã đăng ký. Chúng tôi sẽ hỗ trợ
          bạn lấy lại quyền truy cập tài khoản.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="email">Địa chỉ email</label>

            <div className="auth-input-wrapper">
              <Mail size={18} />
              <input
                id="email"
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
          </div>

          {error && <div className="auth-error">{error}</div>}

          {success && <div className="auth-success">{success}</div>}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? 'Đang gửi...' : 'GỬI YÊU CẦU'}
          </button>
        </form>

        <div className="auth-bottom">
          <Link to="/login">
            <ArrowLeft size={15} />
            Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ForgotPasswordPage;
