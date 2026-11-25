
import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';
import type { Product } from '../types/product.types';

interface SearchResponse {
  products?: Product[];
  items?: Product[];
  data?: Product[] | {
    products?: Product[];
    items?: Product[];
  };
  total?: number;
  keyword?: string;
}

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [keyword, setKeyword] = useState(
    searchParams.get('keyword') || ''
  );

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchProducts = async (searchKeyword: string) => {
    if (!searchKeyword.trim()) {
      setProducts([]);
      setError('');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Endpoint mẫu: cần đối chiếu với SearchController của thành viên 4.
      const response = await api.get<SearchResponse>('/search', {
        params: {
          keyword: searchKeyword.trim(),
        },
      });

      const result = response.data;

      // Hỗ trợ một số dạng response phổ biến.
      let productList: Product[] = [];

      if (Array.isArray(result)) {
        productList = result as Product[];
      } else if (Array.isArray(result.products)) {
        productList = result.products;
      } else if (Array.isArray(result.items)) {
        productList = result.items;
      } else if (Array.isArray(result.data)) {
        productList = result.data;
      } else if (result.data && !Array.isArray(result.data)) {
        productList =
          result.data.products || result.data.items || [];
      }

      setProducts(productList);
    } catch (err) {
      console.error('Lỗi tìm kiếm sản phẩm:', err);
      setProducts([]);
      setError(
        'Không thể tìm kiếm sản phẩm. Vui lòng kiểm tra kết nối API.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialKeyword = searchParams.get('keyword');

    if (initialKeyword) {
      setKeyword(initialKeyword);
      searchProducts(initialKeyword);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const value = keyword.trim();

    if (!value) {
      setProducts([]);
      setSearchParams({});
      return;
    }

    setSearchParams({ keyword: value });
    searchProducts(value);
  };

  const formatCurrency = (price: string) =>
    Number(price).toLocaleString('vi-VN') + ' ₫';

  return (
    <main className="search-page container">
      <div className="search-page-header">
        <h1>Tìm kiếm sản phẩm</h1>
        <p>Tìm kiếm hoa, nến thơm và những món quà ý nghĩa.</p>
      </div>

      <form className="search-page-form" onSubmit={handleSearch}>
        <Search size={21} />

        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Bạn đang tìm kiếm sản phẩm nào?"
        />

        {keyword && (
          <button
            type="button"
            onClick={() => {
              setKeyword('');
              setProducts([]);
              setSearchParams({});
            }}
            aria-label="Xóa từ khóa"
          >
            <X size={18} />
          </button>
        )}

        <button type="submit">Tìm kiếm</button>
      </form>

      <section className="search-page-results">
        {loading ? (
          <p className="search-message">Đang tìm kiếm...</p>
        ) : error ? (
          <p className="search-error">{error}</p>
        ) : keyword.trim() === '' ? (
          <p className="search-message">
            Nhập từ khóa để tìm kiếm sản phẩm.
          </p>
        ) : products.length === 0 ? (
          <p className="search-message">
            Không tìm thấy sản phẩm phù hợp với "{keyword}".
          </p>
        ) : (
          <>
            <div className="search-results-heading">
              <h2>Kết quả tìm kiếm</h2>
              <span>{products.length} sản phẩm</span>
            </div>

            <div className="search-product-grid">
              {products.map((product) => (
                <Link
                  to={`/products/${product.slug}`}
                  className="search-product-card"
                  key={product.id}
                >
                  <img
                    src={product.imageUrl || '/placeholder.png'}
                    alt={product.name}
                  />

                  <div className="search-product-info">
                    <h3>{product.name}</h3>
                    <p>{formatCurrency(product.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default SearchPage;
