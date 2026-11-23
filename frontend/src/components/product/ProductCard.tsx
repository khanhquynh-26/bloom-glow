import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ImageOff } from 'lucide-react';

import type { Product } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const liked = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (product.stock <= 0) return;

    addToCart(product, 1);
  };

  return (
    <article className="product-card">
      <div className="product-card-image">
        <Link to={`/products/${product.slug}`}>
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
            />
          ) : (
            <div className="product-card-placeholder">
              <ImageOff size={32} />
              <span>Chưa có hình ảnh</span>
            </div>
          )}
        </Link>

        <button
          type="button"
          className={`product-card-wishlist ${liked ? 'active' : ''}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={liked ? 'Bỏ yêu thích' : 'Thêm yêu thích'}
        >
          <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
        </button>

        {product.stock <= 0 && (
          <span className="product-card-out-of-stock">
            Hết hàng
          </span>
        )}
      </div>

      <div className="product-card-content">
        <Link
          to={`/products/${product.slug}`}
          className="product-card-name"
        >
          {product.name}
        </Link>

        <p className="product-card-price">
          {formatCurrency(product.price)}
        </p>

        <button
          type="button"
          className="product-card-add"
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
        >
          <ShoppingBag size={15} />
          {product.stock > 0 ? 'Thêm vào giỏ' : 'Tạm hết hàng'}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;