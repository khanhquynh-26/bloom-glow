
import { useEffect, useState } from 'react';
import {
  ShoppingBag,
  Users,
  Package,
  DollarSign,
  Clock,
} from 'lucide-react';
import api from '../../services/api';

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
}

interface RecentOrder {
  id: number;
  userName: string;
  totalAmount: string;
  status: string;
  createdAt: string;
}

function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
  });

  const [orders, setOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          api.get('/admin/dashboard'),
          api.get('/admin/orders/recent'),
        ]);

        setStats(statsRes.data);
        setOrders(ordersRes.data);
      } catch (error) {
        console.error('Không thể tải dữ liệu dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const formatCurrency = (value: number | string) =>
    Number(value).toLocaleString('vi-VN') + ' ₫';

  const cards = [
    {
      title: 'Doanh thu',
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
    },
    {
      title: 'Đơn hàng',
      value: stats.totalOrders,
      icon: ShoppingBag,
    },
    {
      title: 'Sản phẩm',
      value: stats.totalProducts,
      icon: Package,
    },
    {
      title: 'Khách hàng',
      value: stats.totalUsers,
      icon: Users,
    },
  ];

  if (loading) {
    return <div className="admin-loading">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-heading">
        <div>
          <h1>Tổng quan</h1>
          <p>Chào mừng bạn đến với hệ thống quản trị Bloom & Glow.</p>
        </div>
      </div>

      <div className="dashboard-stats">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div className="dashboard-stat-card" key={card.title}>
              <div>
                <p>{card.title}</p>
                <h2>{card.value}</h2>
              </div>
              <span className="dashboard-stat-icon">
                <Icon size={24} />
              </span>
            </div>
          );
        })}
      </div>

      <section className="admin-section">
        <div className="admin-section-heading">
          <div>
            <h2>Đơn hàng gần đây</h2>
            <p>Theo dõi các đơn hàng mới nhất.</p>
          </div>
          <Clock size={20} />
        </div>

        {orders.length === 0 ? (
          <p className="admin-empty">Chưa có đơn hàng nào.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th>Ngày đặt</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.userName}</td>
                    <td>{formatCurrency(order.totalAmount)}</td>
                    <td>
                      <span className={`status-badge status-${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      {new Date(order.createdAt).toLocaleDateString('vi-VN')}
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

export default DashboardPage;
