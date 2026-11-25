
import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import api from '../../services/api';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

const emptyForm = {
  name: '',
  slug: '',
  description: '',
};

function CategoriesAdminPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      const data = response.data;

      setCategories(Array.isArray(data) ? data : data.items ?? data.data ?? []);
    } catch (error) {
      console.error('Không thể tải danh mục:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId !== null) {
        await api.patch(`/categories/${editingId}`, form);
      } else {
        await api.post('/categories', form);
      }

      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
      await fetchCategories();
    } catch (error) {
      console.error('Không thể lưu danh mục:', error);
      alert('Lưu danh mục thất bại.');
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setForm({
      name: category.name,
      slug: category.slug,
      description: category.description ?? '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) return;

    try {
      await api.delete(`/categories/${id}`);
      await fetchCategories();
    } catch (error) {
      console.error('Không thể xóa danh mục:', error);
      alert('Không thể xóa danh mục. Hãy kiểm tra xem danh mục có sản phẩm liên quan không.');
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-heading">
        <div>
          <h1>Quản lý danh mục</h1>
          <p>Phân loại hoa, nến thơm và các bộ quà tặng.</p>
        </div>

        <button
          className="admin-primary-btn"
          onClick={() => {
            setEditingId(null);
            setForm(emptyForm);
            setShowForm(!showForm);
          }}
        >
          <Plus size={18} /> Thêm danh mục
        </button>
      </div>

      {showForm && (
        <form className="admin-form-card admin-form-grid" onSubmit={handleSubmit}>
          <label>
            Tên danh mục
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>

          <label>
            Slug
            <input
              required
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
            />
          </label>

          <label className="admin-full-width">
            Mô tả
            <textarea
              rows={3}
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
            <button className="admin-primary-btn" type="submit">
              Lưu danh mục
            </button>
          </div>
        </form>
      )}

      <section className="admin-section">
        {loading ? (
          <p className="admin-empty">Đang tải danh mục...</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên danh mục</th>
                  <th>Slug</th>
                  <th>Mô tả</th>
                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.slug}</td>
                    <td>{category.description}</td>
                    <td>
                      <div className="admin-actions">
                        <button
                          className="admin-icon-btn"
                          title="Sửa"
                          onClick={() => handleEdit(category)}
                        >
                          <Pencil size={17} />
                        </button>
                        <button
                          className="admin-icon-btn danger"
                          title="Xóa"
                          onClick={() => handleDelete(category.id)}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {categories.length === 0 && (
              <p className="admin-empty">Chưa có danh mục nào.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default CategoriesAdminPage;
