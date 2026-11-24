import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShoppingBag,
  Minus,
  Plus,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Heart,
} from 'lucide-react';

import ProductGallery from '../components/product/ProductGallery';
import Loading from '../components/common/Loading';

import productsService from '../services/products.service';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';

import type { Product } from '../types';
import { formatCurrency } from '../utils/formatCurrency';

function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      if (!slug) {
        setError('Không tìm thấy sản phẩm.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const response = await productsService.getBySlug(slug);

        setProduct(response);
        setQuantity(1);
      } catch (err) {
        console.error('Lỗi tải chi tiết sản phẩm:', err);
        setError('Không thể tải thông tin sản phẩm.');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  const handleDecrease = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const handleIncrease = () => {
    if (!product) return;

    setQuantity((current) =>
      Math.min(product.stock, current + 1),
    );
  };

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) return;

    addToCart(product, quantity);
  };

  const handleWishlist = () => {
    if (!product) return;

    toggleWishlist(product.id);
  };

  if (loading) {
    return (
      <main className="product-detail-loading">
        <Loading />
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="product-detail-error">
        <h2>Không tìm thấy sản phẩm</h2>
        <p>{error || 'Sản phẩm không tồn tại hoặc đã bị xóa.'}</p>

        <Link to="/products" className="product-back-link">
          <ArrowLeft size={16} />
          Quay lại cửa hàng
        </Link>
      </main>
    );
  }

  const outOfStock = product.stock <= 0;
  const liked = isInWishlist(product.id);

  return (
    <main className="product-detail-page">
      <div className="container">

        <div className="product-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <Link to="/products">Sản phẩm</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="product-detail-layout">

          <div className="product-detail-image">
            <ProductGallery
              imageUrl={product.imageUrl}
              productName={product.name}
            />
          </div>

          <div className="product-detail-info">

            <span className="product-detail-eyebrow">
              BLOOM & GLOW COLLECTION
            </span>

            <h1>{product.name}</h1>

            <div className="product-detail-price">
              {formatCurrency(product.price)}
            </div>

            <div className="product-detail-divider" />

            <div className="product-detail-description">
              <h3>Mô tả sản phẩm</h3>
              <p>
                {product.description || 'Sản phẩm chưa có mô tả.'}
              </p>
            </div>

            <div className="product-detail-stock">
              <span>Trạng thái:</span>

              {outOfStock ? (
                <strong className="stock-out">
                  Hết hàng
                </strong>
              ) : (
                <strong className="stock-available">
                  Còn {product.stock} sản phẩm
                </strong>
              )}
            </div>

            {!outOfStock && (
              <div className="product-detail-quantity">
                <span>Số lượng</span>

                <div className="quantity-control">
                  <button
                    type="button"
                    onClick={handleDecrease}
                    disabled={quantity <= 1}
                    aria-label="Giảm số lượng"
                  >
                    <Minus size={15} />
                  </button>

                  <span>{quantity}</span>

                  <button
                    type="button"
                    onClick={handleIncrease}
                    disabled={quantity >= product.stock}
                    aria-label="Tăng số lượng"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>
            )}

            <div className="product-detail-actions">
              <button
                type="button"
                className="product-detail-add"
                onClick={handleAddToCart}
                disabled={outOfStock}
              >
                <ShoppingBag size={18} />
                {outOfStock ? 'Đã hết hàng' : 'Thêm vào giỏ hàng'}
              </button>

              <button
                type="button"
                className={`product-detail-wishlist ${
                  liked ? 'active' : ''
                }`}
                onClick={handleWishlist}
                aria-label="Thêm vào danh sách yêu thích"
              >
                <Heart
                  size={20}
                  fill={liked ? 'currentColor' : 'none'}
                />
              </button>
            </div>

            <div className="product-detail-benefits">
              <div>
                <Truck size={20} />
                <span>Hỗ trợ giao hàng</span>
              </div>

              <div>
                <ShieldCheck size={20} />
                <span>Chất lượng được đảm bảo</span>
              </div>
            </div>

          </div>
        </div>

        <section className="product-detail-extra">
          <h2>Thông tin sản phẩm</h2>

          <div className="product-information-table">
            <div>
              <span>Tên sản phẩm</span>
              <strong>{product.name}</strong>
            </div>

            <div>
              <span>Mã sản phẩm</span>
              <strong>{product.id}</strong>
            </div>

            <div>
              <span>Danh mục</span>
              <strong>{product.categoryId}</strong>
            </div>

            <div>
              <span>Tình trạng</span>
              <strong>
                {outOfStock ? 'Hết hàng' : 'Còn hàng'}
              </strong>
            </div>
          </div>
        </section>

        <section className="product-detail-reviews">
          <h2>Đánh giá sản phẩm</h2>

          <p>
            Chưa có đánh giá nào cho sản phẩm này.
            Hãy quay lại sau khi tính năng đánh giá được triển khai.
          </p>
        </section>

      </div>
    </main>
  );
}

export default ProductDetailPage;