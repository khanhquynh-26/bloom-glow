
import { Link } from 'react-router-dom';
import { ArrowLeft, Flower2 } from 'lucide-react';

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <Flower2 size={48} strokeWidth={1} />

      <p className="auth-eyebrow">OOPS! SOMETHING WENT WRONG</p>

      <h1>404</h1>

      <h2>Không tìm thấy trang</h2>

      <p>
        Trang bạn đang tìm kiếm không tồn tại hoặc đã
        được chuyển đến một địa chỉ khác.
      </p>

      <Link to="/" className="auth-submit not-found-button">
        <ArrowLeft size={17} />
        Quay về trang chủ
      </Link>
    </main>
  );
}

export default NotFoundPage;
