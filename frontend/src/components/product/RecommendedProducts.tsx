import { useEffect, useState } from 'react';
import { recommendationsService } from '../../services/recommendations.service';
import type { Product } from '../../types/product.types';

export default function RecommendedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    recommendationsService
      .getRecommendations()
      .then(setProducts)
      .catch((error) => {
        console.error('Lỗi lấy sản phẩm gợi ý:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Đang tải sản phẩm gợi ý...</p>;

  if (products.length === 0) return null;

  return (
    <section className="recommended-products">
      <h2>Có thể bạn sẽ thích</h2>

      <div className="product-grid">
        {products.map((product) => (
          <article key={product.id}>
            <a href={`/products/${product.slug}`}>
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p>
                {Number(product.price).toLocaleString('vi-VN')} ₫
              </p>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}