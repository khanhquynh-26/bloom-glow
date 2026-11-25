import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Flower2,
  Gift,
  Sparkles,
  Heart,
   Flame,
} from 'lucide-react';

import heroImage from '../assets/hero.jpg';
import productsService from '../services/products.service';
import type { Product } from '../types/product.types';
import { formatCurrency } from '../utils/formatCurrency';
import Loading from '../components/common/Loading';
import RecommendedProducts from '../components/product/RecommendedProducts';

const categories = [
  {
    name: 'Hoa tươi',
    description: 'Gửi trao những lời yêu thương',
    path: '/products?category=hoa',
    icon: Flower2,
    className: 'home-category-flower',
  },
  {
    name: 'Nến thơm',
    description: 'Thắp sáng những khoảnh khắc',
    path: '/products?category=nen-thom',
    icon: Flame,
    className: 'home-category-candle',
  },
  {
    name: 'Set nến và hoa',
    description: 'Món quà dành cho những dịp đặc biệt',
    path: '/products?category=set-nen-hoa',
    icon: Gift,
    className: 'home-category-gift',
  },
];

const collections = [
  {
    name: 'Sinh nhật',
    description: 'Một ngày đặc biệt với món quà ý nghĩa',
    path: '/collections?occasion=birthday',
    className: 'home-collection-birthday',
  },
  {
    name: 'Kỷ niệm',
    description: 'Lưu giữ những khoảnh khắc đáng nhớ',
    path: '/collections?occasion=anniversary',
    className: 'home-collection-anniversary',
  },
  {
    name: 'Giáng Sinh',
    description: 'Trao gửi sự ấm áp mùa lễ hội',
    path: '/collections?occasion=christmas',
    className: 'home-collection-christmas',
  },
  {
    name: 'Tỏ tình',
    description: 'Nói lời yêu thương theo cách riêng',
    path: '/collections?occasion=confession',
    className: 'home-collection-confession',
  },
];

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadFeaturedProducts() {
      try {
        setIsLoading(true);
        setHasError(false);

        const response = await productsService.getFeatured();

        if (isMounted) {
          setProducts(response.filter((product) => product.status === 'active'));
        }
      } catch (error) {
        console.error('Không thể tải sản phẩm nổi bật:', error);

        if (isMounted) {
          setHasError(true);
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadFeaturedProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="home-page">
      {/* HERO BANNER */}
      <section className="home-hero">
        <div className="home-hero-image">
          <img src={heroImage} alt="Bloom & Glow - Flowers and candles" />
        </div>

        <div className="home-hero-overlay">
          <div className="home-hero-content">
            <span className="home-eyebrow">
              FLOWERS · CANDLES · LITTLE JOYS
            </span>

            <h1>
              Let every little
              <br />
              moment <em>bloom.</em>
            </h1>

            <p>
              Những món quà nhỏ bé, chứa đựng những tình cảm
              lớn lao. Hãy để Bloom & Glow giúp bạn gửi trao
              yêu thương.
            </p>

            <Link to="/products" className="home-primary-button">
              Khám phá sản phẩm
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        <div className="home-hero-caption">
          <span>01 / BLOOM & GLOW COLLECTION</span>
          <span>MADE WITH LOVE</span>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="home-intro container">
        <span className="home-eyebrow">A LITTLE SOMETHING SPECIAL</span>

        <h2>
          Vẻ đẹp của những điều
          <br />
          <em>giản dị và chân thành.</em>
        </h2>

        <p>
          Từ một bó hoa tươi, một chiếc nến thơm đến một hộp quà
          được chuẩn bị cẩn thận, mỗi sản phẩm đều mang theo
          một câu chuyện và một lời nhắn gửi.
        </p>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className="home-categories container">
        <div className="home-section-heading">
          <div>
            <span className="home-eyebrow">EXPLORE OUR WORLD</span>
            <h2>Khám phá sản phẩm</h2>
          </div>

          <Link to="/products" className="home-text-link">
            Tất cả sản phẩm <ArrowRight size={16} />
          </Link>
        </div>

        <div className="home-category-grid">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                to={category.path}
                className={`home-category-card ${category.className}`}
                key={category.name}
              >
                <div className="home-category-icon">
                  <Icon size={35} strokeWidth={1.3} />
                </div>

                <div className="home-category-info">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <span>
                    Khám phá <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="home-featured">
        <div className="container">
          <div className="home-section-heading">
            <div>
              <span className="home-eyebrow">OUR FAVORITES</span>
              <h2>Sản phẩm nổi bật</h2>
              <p className="home-section-description">
                Những món quà được lựa chọn dành cho những khoảnh khắc đặc biệt.
              </p>
            </div>

            <Link to="/products" className="home-text-link">
              Xem tất cả <ArrowRight size={16} />
            </Link>
          </div>

          {isLoading ? (
            <Loading text="Đang tải sản phẩm..." />
          ) : hasError ? (
            <div className="home-product-message">
              <p>Chưa thể kết nối đến máy chủ sản phẩm.</p>
              <span>
                Vui lòng kiểm tra Backend và API sản phẩm nổi bật.
              </span>
            </div>
          ) : products.length === 0 ? (
            <div className="home-product-message">
              <p>Sản phẩm nổi bật đang được cập nhật.</p>
              <span>Hãy quay lại sau để khám phá những sản phẩm mới.</span>
            </div>
          ) : (
            <div className="home-product-grid">
              {products.slice(0, 4).map((product) => (
                <Link
                  to={`/products/${product.slug}`}
                  className="home-product-card"
                  key={product.id}
                >
                  <div className="home-product-image">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} />
                    ) : (
                      <div className="home-product-no-image">
                        <Flower2 size={35} />
                      </div>
                    )}
                  </div>

                  <div className="home-product-info">
                    <h3>{product.name}</h3>
                    <p>{formatCurrency(product.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="home-collections container">
        <div className="home-section-heading">
          <div>
            <span className="home-eyebrow">GIFTS FOR EVERY MOMENT</span>
            <h2>Mỗi dịp, một món quà</h2>
          </div>

          <Link to="/collections" className="home-text-link">
            Tất cả bộ sưu tập <ArrowRight size={16} />
          </Link>
        </div>

        <div className="home-collection-grid">
          {collections.map((collection, index) => (
            <Link
              to={collection.path}
              className={`home-collection-card ${collection.className}`}
              key={collection.name}
            >
              <span className="home-collection-number">
                0{index + 1}
              </span>

              <div>
                <h3>{collection.name}</h3>
                <p>{collection.description}</p>
                <span className="home-collection-link">
                  Khám phá <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="home-brand-story">
        <div className="container home-brand-content">
          <div className="home-brand-decoration">
            <Flower2 size={100} strokeWidth={0.8} />
          </div>

          <div className="home-brand-text">
            <span className="home-eyebrow">OUR LITTLE STORY</span>

            <h2>
              Một chút hương thơm,
              <br />
              một chút sắc hoa,
              <br />
              <em>một chút yêu thương.</em>
            </h2>

            <p>
              Bloom & Glow tin rằng một món quà không cần quá lớn
              để trở nên đặc biệt. Điều quan trọng là tình cảm
              được gửi gắm bên trong.
            </p>

            <Link to="/about" className="home-text-link">
              Tìm hiểu về chúng tôi <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* AI GIFT FINDER */}
      <section className="home-ai-section container">
        <div className="home-ai-content">
          <div className="home-ai-icon">
            <Sparkles size={30} />
          </div>

          <span className="home-eyebrow">A LITTLE HELP FROM AI</span>

          <h2>
            Chưa biết chọn món quà nào?
          </h2>

          <p>
            Hãy để trợ lý AI của Bloom & Glow gợi ý món quà
            phù hợp với người nhận, dịp tặng và ngân sách của bạn.
          </p>

          <Link to="/gift-finder" className="home-primary-button">
            Tìm món quà phù hợp
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="home-ai-decoration">
          <Gift size={95} strokeWidth={0.8} />
          <Heart size={30} strokeWidth={1.2} />
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="home-newsletter">
        <div className="container">
          <span className="home-eyebrow">STAY IN BLOOM</span>
          <h2>Những điều xinh đẹp đang chờ bạn.</h2>
          <p>
            Theo dõi Bloom & Glow để khám phá những bộ sưu tập
            và món quà mới.
          </p>

          <Link to="/products" className="home-text-link">
            Khám phá ngay <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;