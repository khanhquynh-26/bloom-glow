import { Heart, Search, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import CollectionsDropdown from './CollectionsDropdown';
import ProductsDropdown from './ProductsDropdown';
import UserMenu from './UserMenu';
import SearchDropdown from './SearchDropdown';
function Header() {
  const { totalItems } = useCart();

  return (
    <header className="bg-header">
      <div className="bg-topbar">
        <p>FLOWERS · CANDLES · LITTLE JOYS</p>
        <span>Gửi yêu thương qua những món quà nhỏ</span>
      </div>

      <div className="bg-header-main container">
        <div className="bg-header-spacer" />

        <Link to="/" className="bg-logo">
          <span>Bloom & Glow</span>
          <small>MAKE EVERY MOMENT BLOOM</small>
        </Link>

        <div className="bg-header-actions">
          <Link to="/search" aria-label="Tìm kiếm">
            <Search size={20} />
          </Link>

          <UserMenu />

          <Link to="/wishlist" aria-label="Yêu thích">
            <Heart size={20} />
          </Link>

          <Link to="/cart" className="bg-cart-link" aria-label="Giỏ hàng">
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="bg-cart-count">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      <nav className="bg-navigation">
        <Link to="/" className="bg-nav-link">
          Trang chủ
        </Link>

        <ProductsDropdown />
        <CollectionsDropdown />

        <Link to="/about" className="bg-nav-link">
          Về chúng tôi
        </Link>

        <Link to="/contact" className="bg-nav-link">
          Liên hệ
        </Link>
      </nav>
    </header>
  );
}

export default Header;