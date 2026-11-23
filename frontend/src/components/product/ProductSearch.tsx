import { Search, X } from 'lucide-react';

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

function ProductSearch({ value, onChange }: ProductSearchProps) {
  return (
    <div className="product-search">
      <Search size={18} />

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Tìm kiếm hoa, nến thơm, quà tặng..."
        aria-label="Tìm kiếm sản phẩm"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Xóa nội dung tìm kiếm"
        >
          <X size={17} />
        </button>
      )}
    </div>
  );
}

export default ProductSearch;