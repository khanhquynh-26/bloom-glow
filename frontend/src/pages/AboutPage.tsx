import './AboutPage.css';

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-subtitle">OUR STORY</span>
          <h1>Bloom & Glow</h1>
          <p>
            Mỗi món quà là một cách để yêu thương được cất lời.
            Chúng tôi tin rằng những điều nhỏ bé có thể tạo nên
            những khoảnh khắc thật đặc biệt.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="about-intro">
        <div className="about-intro-image">
          <img
            src="https://i.pinimg.com/736x/28/4d/d7/284dd701e916ba96cc82b926d206e357.jpg"
            alt="Bó hoa tươi Bloom and Glow"
          />
        </div>

        <div className="about-intro-content">
          <span className="about-subtitle">WHO WE ARE</span>
          <h2>Không chỉ là một món quà, mà còn là cảm xúc</h2>

          <p>
            Bloom & Glow ra đời với mong muốn mang đến những món
            quà nhỏ xinh, tinh tế và đầy ý nghĩa dành cho những
            người quan trọng trong cuộc sống của bạn.
          </p>

          <p>
            Từ những bó hoa tươi thắm, những chiếc nến thơm dịu
            dàng đến các set quà được kết hợp tỉ mỉ, mỗi sản phẩm
            đều được chăm chút để gửi gắm một thông điệp yêu thương.
          </p>

          <p>
            Chúng tôi mong muốn trở thành nơi giúp bạn lưu giữ
            những khoảnh khắc đáng nhớ và trao đi những điều
            tốt đẹp nhất.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="about-mission">
        <span className="about-subtitle">OUR PHILOSOPHY</span>
        <h2>Make Every Moment Bloom</h2>
        <p>
          Gửi yêu thương qua những món quà nhỏ.
          Để mỗi ngày đều có một lý do để mỉm cười.
        </p>

        <div className="about-values">
          <div className="about-value">
            <span>01</span>
            <h3>Chân thành</h3>
            <p>
              Mỗi món quà đều bắt đầu từ sự quan tâm và tình cảm
              chân thành.
            </p>
          </div>

          <div className="about-value">
            <span>02</span>
            <h3>Tinh tế</h3>
            <p>
              Chú trọng từng chi tiết trong thiết kế, chất lượng
              và cách đóng gói sản phẩm.
            </p>
          </div>

          <div className="about-value">
            <span>03</span>
            <h3>Khác biệt</h3>
            <p>
              Mang đến những cách kết hợp hoa và nến độc đáo,
              phù hợp với từng dịp đặc biệt.
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="about-products">
        <div className="about-products-content">
          <span className="about-subtitle">BLOOM & GLOW COLLECTION</span>
          <h2>Tiny moments, boundless joy</h2>
          <p>
            Khám phá thế giới của hoa tươi, nến thơm và những
            set quà được tạo nên để dành riêng cho những khoảnh
            khắc đáng nhớ.
          </p>
        </div>

        <div className="about-products-grid">
          <div className="about-product">
            <img
              src="https://i.pinimg.com/736x/1f/e7/7b/1fe77bc6ea0f74d6783dca6af14cf767.jpg"
              alt="Hoa tươi"
            />
            <h3>Flowers</h3>
            <p>Vẻ đẹp dịu dàng từ những đóa hoa.</p>
          </div>

          <div className="about-product">
            <img
              src="https://i.pinimg.com/1200x/8c/99/4c/8c994cf0251963952b4e08929a584c0b.jpg"
              alt="Nến thơm"
            />
            <h3>Candles</h3>
            <p>Hương thơm cho những phút giây thư giãn.</p>
          </div>

          <div className="about-product">
            <img
              src="https://i.pinimg.com/1200x/01/b1/b3/01b1b36f4c7f7672640e4dbf132c21c9.jpg"
              alt="Hộp quà"
            />
            <h3>Gift Sets</h3>
            <p>Món quà nhỏ gửi trao yêu thương.</p>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="about-closing">
        <h2>Thank you for letting us be part of your moments.</h2>
        <p>Bloom & Glow — Make Every Moment Bloom.</p>
      </section>
    </main>
  );
}