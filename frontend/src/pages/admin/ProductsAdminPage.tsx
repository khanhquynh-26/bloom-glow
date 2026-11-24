
import { useEffect, useState } from 'react';
import { Plus, Search, Pencil, Trash2, X } from 'lucide-react';
import api from '../../services/api';
import type { Product } from '../../types/product.types';

const initialForm = {
  name: '',
  slug: '',
  description: '',
  price: '',
  stock: 0,
  categoryId: 0,
  imageUrl: '',
  status: 'active' as 'active' | 'inactive',
};

function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [keyword, setKeyword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      const data = response.data;

      setProducts(Array.isArray(data) ? data : data.items ?? data.data ?? []);
    } catch (error) {
      console.error('Không thể tải sản phẩm:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );

  const openCreateForm = () => {
    setEditingId(null);
    setForm(initialForm);
    setShowForm(true);
  };

  const openEditForm = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId,
      imageUrl: product.imageUrl,
      status: product.status,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId !== null) {
        await api.patch(`/products/${editingId}`, form);
      } else {
        await api.post('/products', form);
      }

      setShowForm(false);
      setForm(initialForm);
      setEditingId(null);
      await fetchProducts();
    } catch (error) {
      console.error('Không thể lưu sản phẩm:', error);
      alert('Lưu sản phẩm thất bại. Vui lòng kiểm tra lại dữ liệu.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;

    try {
      await api.delete(`/products/${id}`);
      await fetchProducts();
    } catch (error) {
      console.error('Không thể xóa sản phẩm:', error);
      alert('Xóa sản phẩm thất bại.');
    }
  };

  const formatCurrency = (value: string) =>
    Number(value).toLocaleString('vi-VN') + ' ₫';

  return (
    <div className="admin-page">
      <div className="admin-page-heading">
        <div>
          <h1>Quản lý sản phẩm</h1>
          <p>Quản lý các sản phẩm hoa, nến thơm và quà tặng.</p>
        </div>

        <button className="admin-primary-btn" onClick={openCreateForm}>
          <Plus size={18} /> Thêm sản phẩm
        </button>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={18} />
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Tìm kiếm sản phẩm..."
          />
        </div>
      </div>

      {showForm && (
        <div className="admin-form-card">
          <div className="admin-section-heading">
            <h2>{editingId ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}</h2>
            <button
              className="admin-icon-btn"
              onClick={() => setShowForm(false)}
              type="button"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="admin-form-grid">
            <label>
              Tên sản phẩm
              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </label>

            <label>
              Slug
              <input
                required
                value={form.slug}
                onChange={(e) =>
                  setForm({ ...form, slug: e.target.value })
                }
              />
            </label>

            <label>
              Giá bán
              <input
                required
                type="number"
                min="0"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />
            </label>

            <label>
              Số lượng tồn kho
              <input
                required
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) =>
                  setForm({ ...form, stock: Number(e.target.value) })
                }
              />
            </label>

            <label>
              ID danh mục
              <input
                required
                type="number"
                min="1"
                value={form.categoryId || ''}
                onChange={(e) =>
                  setForm({ ...form, categoryId: Number(e.target.value) })
                }
              />
            </label>

            <label>
              URL hình ảnh
              <input
                value={form.imageUrl}
                onChange={(e) =>
                  setForm({ ...form, imageUrl: e.target.value })
                }
              />
            </label>

            <label>
              Trạng thái
              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as 'active' | 'inactive',
                  })
                }
              >
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Ngừng hoạt động</option>
              </select>
            </label>

            <label className="admin-full-width">
              Mô tả
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </label>

            <div className="admin-form-actions admin-full-width">
              <button
                type="button"
                className="admin-secondary-btn"
                onClick={() => setShowForm(false)}
              >
                Hủy
              </button>
              <button type="submit" className="admin-primary-btn">
                Lưu sản phẩm
              </button>
            </div>
          </form>
        </div>
      )}

      <section className="admin-section">
        {loading ? (
          <p className="admin-empty">Đang tải sản phẩm...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="admin-empty">Không tìm thấy sản phẩm.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th>Tồn kho</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="admin-product-cell">
                        {product.imageUrl && (
                          <img src={product.imageUrl} alt={product.name} />
                        )}
                        <span>{product.name}</span>
                      </div>
                    </td>
                    <td>{formatCurrency(product.price)}</td>
                    <td>{product.stock}</td>
                    <td>
                      <span
                        className={`status-badge status-${product.status}`}
                      >
                        {product.status === 'active'
                          ? 'Đang bán'
                          : 'Ngừng bán'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button
                          className="admin-icon-btn"
                          title="Sửa"
                          onClick={() => openEditForm(product)}
                        >
                          <Pencil size={17} />
                        </button>
                        <button
                          className="admin-icon-btn danger"
                          title="Xóa"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default ProductsAdminPage;
