import { Link } from 'react-router-dom';

const productCategories = [
  {
    label: 'Tất cả sản phẩm',
    path: '/products',
  },
  {
    label: 'Hoa',
    path: '/products?category=hoa',
  },
  {
    label: 'Nến thơm',
    path: '/products?category=nen-thom',
  },
  {
    label: 'Set nến và hoa',
    path: '/products?category=set-nen-hoa',
  },
];

function ProductsDropdown() {
  return (
    <div className="bg-dropdown">
      <Link to="/products" className="bg-nav-link">
        Sản phẩm
      </Link>

      <div className="bg-dropdown-menu">
        {productCategories.map((category) => (
          <Link key={category.path} to={category.path}>
            {category.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductsDropdown;