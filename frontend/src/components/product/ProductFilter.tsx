import type { Category } from '../../types';

interface ProductFilterProps {
  categories: Category[];
  categoryId: number | undefined;
  minPrice: string;
  maxPrice: string;
  onCategoryChange: (value: number | undefined) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onReset: () => void;
}

function ProductFilter({
  categories,
  categoryId,
  minPrice,
  maxPrice,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onReset,
}: ProductFilterProps) {
  return (
    <aside className="product-filter">
      <div className="product-filter-heading">
        <h3>Bộ lọc sản phẩm</h3>

        <button type="button" onClick={onReset}>
          Xóa lọc
        </button>
      </div>

      <div className="product-filter-group">
        <h4>Danh mục</h4>

        <label className="product-filter-option">
          <input
            type="radio"
            name="category"
            checked={categoryId === undefined}
            onChange={() => onCategoryChange(undefined)}
          />
          <span>Tất cả sản phẩm</span>
        </label>

        {categories.map((category) => (
          <label
            key={category.id}
            className="product-filter-option"
          >
            <input
              type="radio"
              name="category"
              checked={categoryId === category.id}
              onChange={() => onCategoryChange(category.id)}
            />
            <span>{category.name}</span>
          </label>
        ))}
      </div>

      <div className="product-filter-group">
        <h4>Khoảng giá (VND)</h4>

        <label className="product-filter-price">
          <span>Giá thấp nhất</span>
          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(event) => onMinPriceChange(event.target.value)}
            placeholder="Ví dụ: 100000"
          />
        </label>

        <label className="product-filter-price">
          <span>Giá cao nhất</span>
          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(event) => onMaxPriceChange(event.target.value)}
            placeholder="Ví dụ: 1000000"
          />
        </label>
      </div>
    </aside>
  );
}

export default ProductFilter;