
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { searchService } from '../../services/search.service';
import type { Product } from '../../types/product.types';

export default function SearchDropdown() {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!open || !keyword.trim()) {
      setProducts([]);
      setError('');
      return;
    }

    const timer = window.setTimeout(async () => {
      try {
        setLoading(true);
        setError('');

        const result = await searchService.searchProducts(keyword.trim());
        setProducts(result);
      } catch {
        setProducts([]);
        setError('Không thể tìm kiếm sản phẩm. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => window.clearTimeout(timer);
  }, [keyword, open]);

  const selectProduct = (product: Product) => {
    setOpen(false);
    setKeyword('');
    navigate(`/products/${product.slug}`);
  };

  return (
    <div className="search-dropdown">
      <button
        type="button"
        className="search-toggle"
        aria-label="Tìm kiếm"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={21} /> : <Search size={21} />}
      </button>

      {open && (
        <div className="search-panel">
          <div className="search-input-row">
            <Search size={19} />

            <input
              autoFocus
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm hoa, nến và quà tặng..."
            />

            {keyword && (
              <button
                type="button"
                onClick={() => setKeyword('')}
                aria-label="Xóa từ khóa"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <div className="search-results">
            {!keyword.trim() && (
              <p>Nhập tên sản phẩm bạn muốn tìm.</p>
            )}

            {loading && <p>Đang tìm kiếm...</p>}

            {error && <p>{error}</p>}

            {!loading && keyword.trim() && !error && products.length === 0 && (
              <p>Không tìm thấy sản phẩm phù hợp.</p>
            )}

            {products.map((product) => (
              <button
                type="button"
                key={product.id}
                className="search-result-item"
                onClick={() => selectProduct(product)}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                />

                <span>
                  <strong>{product.name}</strong>
                  <small>{Number(product.price).toLocaleString('vi-VN')} ₫</small>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
