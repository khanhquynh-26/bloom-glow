import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-footer">
      <div className="container bg-footer-content">
        <div className="bg-footer-brand">
          <Link to="/" className="bg-footer-logo">
            Bloom & Glow
          </Link>

          <p>
            Những điều nhỏ bé cũng có thể mang đến niềm vui lớn.
            Gửi gắm yêu thương qua hoa, nến thơm và những món quà
            đầy ý nghĩa.
          </p>

          <div className="bg-footer-socials">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <Facebook size={19} />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={19} />
            </a>
          </div>
        </div>

        <div className="bg-footer-column">
          <h3>Khám phá</h3>
          <Link to="/products">Tất cả sản phẩm</Link>
          <Link to="/collections">Bộ sưu tập</Link>
          <Link to="/about">Về chúng tôi</Link>
          <Link to="/contact">Liên hệ</Link>
        </div>

        <div className="bg-footer-column">
          <h3>Hỗ trợ</h3>
          <Link to="/account/orders">Theo dõi đơn hàng</Link>
          <Link to="/shipping-policy">Chính sách giao hàng</Link>
          <Link to="/return-policy">Chính sách đổi trả</Link>
          <Link to="/faq">Câu hỏi thường gặp</Link>
        </div>

        <div className="bg-footer-column bg-footer-contact">
          <h3>Liên hệ</h3>

          <p>
            <MapPin size={17} />
            <span>Việt Nam</span>
          </p>

          <p>
            <Phone size={17} />
            <span>Thông tin điện thoại sẽ được cập nhật</span>
          </p>

          <p>
            <Mail size={17} />
            <span>Thông tin email sẽ được cập nhật</span>
          </p>
        </div>
      </div>

      <div className="bg-footer-bottom">
        <p>
          © {new Date().getFullYear()} Bloom & Glow. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;