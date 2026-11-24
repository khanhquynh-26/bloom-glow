interface ProductSortProps {
  value: string;
  onChange: (value: string) => void;
}

function ProductSort({ value, onChange }: ProductSortProps) {
  return (
    <div className="product-sort">
      <label htmlFor="product-sort-select">
        Sắp xếp:
      </label>

      <select
        id="product-sort-select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="newest">Mới nhất</option>
        <option value="name-asc">Tên A - Z</option>
        <option value="name-desc">Tên Z - A</option>
        <option value="price-asc">Giá thấp đến cao</option>
        <option value="price-desc">Giá cao đến thấp</option>
      </select>
    </div>
  );
}

export default ProductSort;