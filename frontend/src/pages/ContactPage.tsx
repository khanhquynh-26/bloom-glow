
import { useState, type FormEvent } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Instagram,
  Facebook,
  MessageCircle,
} from 'lucide-react';

import './ContactPage.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <main className="contact-page">

      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="contact-subtitle">GET IN TOUCH</span>
          <h1>Let's Talk</h1>
          <p>
            Chúng tôi luôn sẵn sàng lắng nghe bạn.
            Hãy chia sẻ điều bạn đang tìm kiếm,
            Bloom & Glow sẽ giúp bạn biến những ý tưởng
            thành món quà ý nghĩa.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="contact-intro">
        <span className="contact-subtitle">CONTACT US</span>
        <h2>Chúng tôi luôn ở đây dành cho bạn</h2>
        <p>
          Dù bạn cần tư vấn về sản phẩm, muốn thiết kế một món quà
          riêng hay cần hỗ trợ đơn hàng, đừng ngần ngại liên hệ
          với Bloom & Glow.
        </p>
      </section>

      {/* CONTACT INFORMATION */}
      <section className="contact-info-section">
        <div className="contact-info-card">
          <div className="contact-icon">
            <MapPin size={24} />
          </div>
          <h3>Địa chỉ</h3>
          <p>Thông tin địa chỉ cửa hàng sẽ được cập nhật tại đây.</p>
        </div>

        <div className="contact-info-card">
          <div className="contact-icon">
            <Phone size={24} />
          </div>
          <h3>Điện thoại</h3>
          <p>Thông tin số điện thoại cửa hàng sẽ được cập nhật.</p>
        </div>

        <div className="contact-info-card">
          <div className="contact-icon">
            <Mail size={24} />
          </div>
          <h3>Email</h3>
          <p>Thông tin email cửa hàng sẽ được cập nhật.</p>
        </div>

        <div className="contact-info-card">
          <div className="contact-icon">
            <Clock size={24} />
          </div>
          <h3>Giờ hoạt động</h3>
          <p>Thứ 2 – Chủ nhật</p>
          <p>Vui lòng cập nhật giờ hoạt động thực tế.</p>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="contact-main">
        <div className="contact-form-info">
          <span className="contact-subtitle">SEND A MESSAGE</span>
          <h2>Say hello</h2>

          <p>
            Mỗi lời nhắn của bạn đều rất quan trọng.
            Hãy điền thông tin vào biểu mẫu bên cạnh,
            chúng tôi rất mong được lắng nghe và hỗ trợ bạn.
          </p>

          <div className="contact-social">
            <h3>Contact with Bloom & Glow</h3>

            <div className="contact-social-links">
              <a href="#" aria-label="Instagram">
                <Instagram size={20} />
              </a>

              <a href="#" aria-label="Facebook">
                <Facebook size={20} />
              </a>

              <a href="#" aria-label="Chat">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-row">
            <div className="contact-field">
              <label htmlFor="fullName">Họ và tên *</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Nhập họ và tên"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-field">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="contact-form-row">
            <div className="contact-field">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="contact-field">
              <label htmlFor="subject">Chủ đề *</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Chọn chủ đề</option>
                <option value="product">Tư vấn sản phẩm</option>
                <option value="order">Hỗ trợ đơn hàng</option>
                <option value="gift">Thiết kế quà tặng</option>
                <option value="feedback">Góp ý và phản hồi</option>
                <option value="other">Khác</option>
              </select>
            </div>
          </div>

          <div className="contact-field">
            <label htmlFor="message">Nội dung tin nhắn *</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Hãy chia sẻ điều bạn muốn nhắn gửi..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="contact-submit">
            Gửi tin nhắn
            <Send size={17} />
          </button>

          {submitted && (
            <p className="contact-success">
              Cảm ơn bạn đã liên hệ Bloom & Glow!
            </p>
          )}
        </form>
      </section>

      {/* MAP */}
      <section className="contact-map-section">
        <div className="contact-map-heading">
          <span className="contact-subtitle">FIND US</span>
          <h2>Ghé thăm Bloom & Glow</h2>
          <p>
            Chúng tôi mong được gặp bạn và cùng bạn lựa chọn
            những món quà thật đặc biệt.
          </p>
        </div>

        <div className="contact-map-placeholder">
          <MapPin size={36} />
          <h3>Bloom & Glow</h3>
          <p>Vị trí cửa hàng sẽ được cập nhật tại đây.</p>
        </div>
      </section>

      {/* BOTTOM BANNER */}
      <section className="contact-bottom">
        <h2>Every little detail carries love.</h2>
        <p>Bloom & Glow — Make Every Moment Bloom.</p>
      </section>

    </main>
  );
}
