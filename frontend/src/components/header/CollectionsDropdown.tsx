import { Link } from 'react-router-dom';

const collections = [
  {
    label: 'Tất cả bộ sưu tập',
    path: '/collections',
  },
  {
    label: 'Sinh nhật',
    path: '/collections?occasion=birthday',
  },
  {
    label: 'Kỷ niệm',
    path: '/collections?occasion=anniversary',
  },
  {
    label: 'Giáng Sinh',
    path: '/collections?occasion=christmas',
  },
  {
    label: 'Tỏ tình',
    path: '/collections?occasion=confession',
  },
  {
    label: 'Ngày đặc biệt',
    path: '/collections?occasion=special',
  },
];

function CollectionsDropdown() {
  return (
    <div className="bg-dropdown">
      <Link to="/collections" className="bg-nav-link">
        Bộ sưu tập
      </Link>

      <div className="bg-dropdown-menu">
        {collections.map((collection) => (
          <Link key={collection.path} to={collection.path}>
            {collection.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CollectionsDropdown;