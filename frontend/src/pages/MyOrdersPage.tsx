import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface OrderItem {
  id: number;
  shippingAddress?: string;
  phone?: string;
  totalAmount?: number;
  status?: string;
  createdAt?: string;
}

function OrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/orders')
      .then((res) => res.json())
      .then((result) => {
        if (result.success && Array.isArray(result.data)) {
          setOrders(result.data);
        }
      })
      .catch((err) => console.error('Lỗi tải đơn hàng:', err))
      .finally(() => setLoading(false));
  }, []);

  const titleFont = '"Playfair Display", "Times New Roman", serif';
  const bodyFont = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #FFF5F7 0%, #FDF8F5 100%)',
        minHeight: '85vh',
        color: '#4A353B',
        fontFamily: bodyFont,
        paddingBottom: '70px',
      }}
    >
      {/* Banner tiêu đề hồng pastel */}
      <div
        style={{
          background: 'linear-gradient(135deg, #FDE8EC 0%, #F9D8DF 100%)',
          padding: '54px 20px',
          textAlign: 'center',
          borderBottom: '1px solid #F3C6D0',
        }}
      >
        <p
          style={{
            fontSize: '12px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#C25970',
            marginBottom: '10px',
            fontWeight: 600,
          }}
        >
          ✿ BLOOM & GLOW ORDERS ✿
        </p>
        <h1
          style={{
            fontFamily: titleFont,
            fontSize: '42px',
            fontWeight: 600,
            color: '#5C2C38',
            margin: '0 0 14px 0',
            letterSpacing: '0.02em',
          }}
        >
          Đơn Hàng Của Bạn
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: '#7D545E',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Theo dõi hành trình những món quà nhỏ xinh đang được gửi trao đến tay bạn.
        </p>
      </div>

      {/* Khu vực nội dung chính */}
      <div style={{ maxWidth: '880px', margin: '44px auto 0', padding: '0 20px' }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#B56B7C', padding: '40px 0' }}>
            Đang tải danh sách đơn hàng...
          </p>
        ) : orders.length === 0 ? (
          /* Khung hiển thị khi chưa có đơn hàng */
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #F7D6DE',
              borderRadius: '24px',
              padding: '56px 28px',
              textAlign: 'center',
              boxShadow: '0 12px 32px rgba(212, 106, 126, 0.12)',
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFE4EA 0%, #FAD0DA 100%)',
                color: '#D45D79',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 22px',
                boxShadow: '0 6px 16px rgba(212, 93, 121, 0.18)',
              }}
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>

            <h2
              style={{
                fontFamily: titleFont,
                fontSize: '28px',
                fontWeight: 600,
                color: '#5C2C38',
                margin: '0 0 12px 0',
              }}
            >
              Bạn chưa có đơn hàng nào
            </h2>
            <p
              style={{
                fontSize: '14.5px',
                color: '#855E68',
                maxWidth: '400px',
                margin: '0 auto 30px',
                lineHeight: 1.65,
              }}
            >
              Khi bạn hoàn tất đặt mua hoa tươi hoặc nến thơm, toàn bộ thông tin đơn hàng sẽ hiển thị tại đây.
            </p>
            <Link
              to="/products"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #E06D85 0%, #C8526B 100%)',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontSize: '13.5px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '15px 36px',
                borderRadius: '999px',
                fontWeight: 600,
                boxShadow: '0 6px 18px rgba(200, 82, 107, 0.28)',
              }}
            >
              ✿ Bắt đầu mua sắm
            </Link>
          </div>
        ) : (
          /* Danh sách đơn hàng đã đặt */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {orders.map((order) => (
              <div
                key={order.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #F5D5DD',
                  borderRadius: '18px',
                  padding: '22px 26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 6px 18px rgba(212, 106, 126, 0.08)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <h3
                      style={{
                        fontFamily: titleFont,
                        fontSize: '20px',
                        fontWeight: 600,
                        margin: 0,
                        color: '#5C2C38',
                      }}
                    >
                      Đơn hàng #{order.id}
                    </h3>
                    <span
                      style={{
                        backgroundColor: '#FFE4EA',
                        color: '#C8526B',
                        fontSize: '12px',
                        fontWeight: 600,
                        padding: '4px 12px',
                        borderRadius: '999px',
                      }}
                    >
                      {order.status || 'Đang xử lý'}
                    </span>
                  </div>
                  <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#7D545E' }}>
                    Địa chỉ: {order.shippingAddress || 'Đang cập nhật'}
                  </p>
                  <p style={{ margin: 0, fontSize: '13.5px', color: '#99707A' }}>
                    SĐT: {order.phone || '—'}
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '13px', color: '#855E68', display: 'block', marginBottom: '4px' }}>
                    Tổng tiền
                  </span>
                  <strong style={{ fontFamily: titleFont, fontSize: '22px', color: '#D45D79' }}>
                    {(order.totalAmount || 0).toLocaleString('vi-VN')}₫
                  </strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;