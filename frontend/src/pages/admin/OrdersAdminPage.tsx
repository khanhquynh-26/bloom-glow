
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import api from '../../services/api';
import type { Order } from '../../types/order.types';

const statuses = [
  { value: 'pending', label: 'Chờ xác nhận' },
  { value: 'confirmed', label: 'Đã xác nhận' },
  { value: 'shipping', label: 'Đang giao' },
  { value: 'completed', label: 'Hoàn thành' },
  { value: 'cancelled', label: 'Đã hủy' },
];

// Mở rộng kiểu Order để khai báo ngày tạo
type AdminOrder = Order & {
  createdAt?: string;
};

function OrdersAdminPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/admin/orders');
      const data = response.data;

      const orderData = Array.isArray(data)
        ? data
        : data.items ?? data.data ?? [];

      setOrders(orderData);
    } catch (error) {
      console.error('Không thể tải đơn hàng:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await api.patch(`/admin/orders/${id}/status`, { status });
      await fetchOrders();
    } catch (error) {
      console.error('Không thể cập nhật trạng thái:', error);
      alert('Cập nhật trạng thái thất bại.');
    }
  };

  const filteredOrders = orders.filter((order) =>
    String(order.id).includes(keyword)
  );

  const formatCurrency = (value: string | number) =>
    Number(value).toLocaleString('vi-VN') + ' ₫';

  const formatDate = (date?: string) => {
    if (!date) return '—';

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return '—';

    return parsedDate.toLocaleDateString('vi-VN');
  };

  return (
    <div className="admin-page">
      <div className="admin-page-heading">
        <div>
          <h1>Quản lý đơn hàng</h1>
          <p>Theo dõi và xử lý đơn hàng của khách hàng.</p>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={18} />
          <input
            placeholder="Tìm theo mã đơn hàng..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>

      <section className="admin-section">
        {loading ? (
          <p className="admin-empty">Đang tải đơn hàng...</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Tổng tiền</th>
                  <th>Thanh toán</th>
                  <th>Trạng thái</th>
                  <th>Ngày đặt</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.userId}</td>
                    <td>{formatCurrency(order.totalAmount)}</td>
                    <td>{order.paymentMethod}</td>
                    <td>
                      <select
                        className="admin-status-select"
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                      >
                        {statuses.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{formatDate(order.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredOrders.length === 0 && (
              <p className="admin-empty">Không tìm thấy đơn hàng.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default OrdersAdminPage;
