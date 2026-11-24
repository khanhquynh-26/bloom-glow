
import { useEffect, useState } from 'react';
import { Search, ShieldCheck, UserRound } from 'lucide-react';
import api from '../../services/api';
import type { User } from '../../types/user.types';

function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      const data = response.data;

      setUsers(Array.isArray(data) ? data : data.items ?? data.data ?? []);
    } catch (error) {
      console.error('Không thể tải người dùng:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id: number, role: string) => {
    try {
      await api.patch(`/admin/users/${id}/role`, { role });
      await fetchUsers();
    } catch (error) {
      console.error('Không thể cập nhật vai trò:', error);
      alert('Cập nhật vai trò thất bại.');
    }
  };

  const filteredUsers = users.filter((user) => {
    const search = keyword.toLowerCase();

    return (
      user.fullName.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search)
    );
  });

  return (
    <div className="admin-page">
      <div className="admin-page-heading">
        <div>
          <h1>Quản lý người dùng</h1>
          <p>Quản lý tài khoản khách hàng và quản trị viên.</p>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={18} />
          <input
            placeholder="Tìm theo tên hoặc email..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>

      <section className="admin-section">
        {loading ? (
          <p className="admin-empty">Đang tải người dùng...</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Người dùng</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Vai trò</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="admin-user-cell">
                        {user.role === 'admin' ? (
                          <ShieldCheck size={20} />
                        ) : (
                          <UserRound size={20} />
                        )}
                        <span>{user.fullName}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phone || '—'}</td>
                    <td>
                      <select
                        className="admin-status-select"
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user.id, e.target.value)
                        }
                      >
                        <option value="customer">Khách hàng</option>
                        <option value="admin">Quản trị viên</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <p className="admin-empty">Không tìm thấy người dùng.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default UsersAdminPage;
