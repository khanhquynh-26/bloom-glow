import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getErrorMessage } from '../../services/http';
import { userService } from '../../services/userService';
import type { UpdateUserPayload, User, UserRole, UserStatus } from '../../types/auth';
import '../../styles/auth-admin.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(0|\+84)[0-9]{9}$/;

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  status: UserStatus;
}

const emptyForm: FormState = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  role: 'CUSTOMER',
  status: 'active',
};

const ROLE_LABEL: Record<UserRole, string> = { CUSTOMER: 'Khách hàng', ADMIN: 'Quản trị' };
const STATUS_LABEL: Record<UserStatus, string> = { active: 'Hoạt động', blocked: 'Đã khóa' };

export default function UsersAdminPage() {
  const { user: me, updateUser } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [keyword, setKeyword] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null); // null = đang tạo mới
  const [form, setForm] = useState<FormState>(emptyForm);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setUsers(await userService.list());
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.phone ?? '').includes(q),
    );
  }, [users, keyword]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setFormError('');
    setModalOpen(true);
  }

  function openEdit(u: User) {
    setEditing(u);
    setForm({
      fullName: u.fullName,
      email: u.email,
      phone: u.phone ?? '',
      password: '',
      role: u.role,
      status: u.status,
    });
    setFormError('');
    setModalOpen(true);
  }

  function closeModal() {
    if (saving) return;
    setModalOpen(false);
  }

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): string {
    if (!form.fullName.trim()) return 'Vui lòng nhập họ tên';
    if (!EMAIL_REGEX.test(form.email.trim())) return 'Email không hợp lệ';
    if (form.phone.trim() && !PHONE_REGEX.test(form.phone.trim())) return 'Số điện thoại không hợp lệ';
    if (!editing && form.password.length < 6) return 'Mật khẩu tối thiểu 6 ký tự';
    if (editing && form.password && form.password.length < 6) return 'Mật khẩu mới tối thiểu 6 ký tự';
    return '';
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const message = validate();
    if (message) {
      setFormError(message);
      return;
    }
    setFormError('');
    setSaving(true);
    try {
      if (editing) {
        const payload: UpdateUserPayload = {
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || null, // null = xóa số điện thoại
          role: form.role,
          status: form.status,
        };
        if (form.password) payload.password = form.password;

        const updated = await userService.update(editing.id, payload);
        setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
        if (me && updated.id === me.id) updateUser(updated); // cập nhật tên trên header
      } else {
        const created = await userService.create({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          password: form.password,
          role: form.role,
          status: form.status,
          ...(form.phone.trim() ? { phone: form.phone.trim() } : {}),
        });
        setUsers((prev) => [created, ...prev]);
      }
      setModalOpen(false);
    } catch (err) {
      setFormError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(u: User) {
    if (!window.confirm(`Xóa tài khoản "${u.email}"? Địa chỉ của người này cũng bị xóa theo.`)) return;
    try {
      await userService.remove(u.id);
      setUsers((prev) => prev.filter((item) => item.id !== u.id));
    } catch (err) {
      window.alert(getErrorMessage(err));
    }
  }

  const editingSelf = editing !== null && editing.id === me?.id;

  return (
    <>
      <div className="ba-page__head">
        <div>
          <h1>Quản lý người dùng</h1>
          {!loading && <p className="ba-page__sub">{filtered.length} / {users.length} tài khoản</p>}
        </div>
        <div className="ba-toolbar">
          <input
            type="search"
            placeholder="Tìm theo tên, email, số điện thoại"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="button" className="ba-btn" onClick={openCreate}>
            + Thêm người dùng
          </button>
        </div>
      </div>

      {error && (
        <div className="ba-alert">
          {error}{' '}
          <button type="button" className="ba-btn ba-btn--ghost ba-btn--sm" onClick={() => void load()}>
            Thử lại
          </button>
        </div>
      )}

      <div className="ba-table-wrap">
        <table className="ba-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Điện thoại</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="ba-table__empty">Đang tải...</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="ba-table__empty">Không có người dùng nào</td>
              </tr>
            ) : (
              filtered.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td>{u.phone ?? '—'}</td>
                  <td>
                    <span className={`ba-badge ba-badge--${u.role.toLowerCase()}`}>{ROLE_LABEL[u.role]}</span>
                  </td>
                  <td>
                    <span className={`ba-badge ba-badge--${u.status}`}>{STATUS_LABEL[u.status]}</span>
                  </td>
                  <td>{new Date(u.createdAt).toLocaleString('vi-VN')}</td>
                  <td>
                    <div className="ba-table__actions">
                      <button type="button" className="ba-btn ba-btn--ghost ba-btn--sm" onClick={() => openEdit(u)}>
                        Sửa
                      </button>
                      <button
                        type="button"
                        className="ba-btn ba-btn--danger ba-btn--sm"
                        disabled={u.id === me?.id}
                        title={u.id === me?.id ? 'Không thể tự xóa chính mình' : undefined}
                        onClick={() => void handleDelete(u)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="ba-modal__backdrop" onClick={closeModal}>
          <form
            className="ba-modal"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            noValidate
          >
            <h2>{editing ? `Sửa người dùng #${editing.id}` : 'Thêm người dùng'}</h2>

            {formError && <div className="ba-alert">{formError}</div>}

            <div className="ba-field">
              <label htmlFor="u-fullName">Họ và tên</label>
              <input id="u-fullName" value={form.fullName} onChange={(e) => setField('fullName', e.target.value)} />
            </div>

            <div className="ba-field">
              <label htmlFor="u-email">Email</label>
              <input id="u-email" type="email" value={form.email} onChange={(e) => setField('email', e.target.value)} />
            </div>

            <div className="ba-field">
              <label htmlFor="u-phone">Số điện thoại</label>
              <input id="u-phone" value={form.phone} onChange={(e) => setField('phone', e.target.value)} />
            </div>

            <div className="ba-field">
              <label htmlFor="u-password">{editing ? 'Mật khẩu mới (bỏ trống nếu không đổi)' : 'Mật khẩu'}</label>
              <input
                id="u-password"
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => setField('password', e.target.value)}
              />
            </div>

            <div className="ba-modal__row">
              <div className="ba-field">
                <label htmlFor="u-role">Vai trò</label>
                <select
                  id="u-role"
                  value={form.role}
                  disabled={editingSelf}
                  onChange={(e) => setField('role', e.target.value as UserRole)}
                >
                  <option value="CUSTOMER">Khách hàng</option>
                  <option value="ADMIN">Quản trị</option>
                </select>
              </div>
              <div className="ba-field">
                <label htmlFor="u-status">Trạng thái</label>
                <select
                  id="u-status"
                  value={form.status}
                  disabled={editingSelf}
                  onChange={(e) => setField('status', e.target.value as UserStatus)}
                >
                  <option value="active">Hoạt động</option>
                  <option value="blocked">Đã khóa</option>
                </select>
              </div>
            </div>

            <div className="ba-modal__footer">
              <button type="button" className="ba-btn ba-btn--ghost" onClick={closeModal} disabled={saving}>
                Hủy
              </button>
              <button type="submit" className="ba-btn" disabled={saving}>
                {saving ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
