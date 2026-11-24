import type { Product } from '../../types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
}

function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="product-list-empty">
        <p>Không tìm thấy sản phẩm phù hợp.</p>
        <span>Hãy thử thay đổi từ khóa hoặc bộ lọc.</span>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductList;