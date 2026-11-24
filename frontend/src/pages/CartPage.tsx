import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface CartItem {
  id: number;
  productId: number;
  name?: string;
  price?: number;
  quantity: number;
}

function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/carts')
      .then((res) => res.json())
      .then((result) => {
        if (result.success && Array.isArray(result.data)) {
          setItems(result.data);
        }
      })
      .catch((err) => console.error('Lỗi tải giỏ hàng:', err))
      .finally(() => setLoading(false));
  }, []);

  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + (item.price || 150000) * item.quantity,
    0
  );

  // Phông chữ hỗ trợ tiếng Việt mượt mà, không bị nhảy dấu
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
      {/* Banner tiêu đề tông hồng pastel lãng mạn */}
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
          ✿ BLOOM & GLOW SELECTION ✿
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
          Giỏ Hàng Của Bạn
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
          Những đóa hoa dịu dàng và nến thơm ngọt ngào đang chờ bạn gói ghém mang về.
        </p>
      </div>

      {/* Khu vực nội dung chính căn giữa */}
      <div style={{ maxWidth: '880px', margin: '44px auto 0', padding: '0 20px' }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#B56B7C', padding: '40px 0' }}>
            Đang tải giỏ hàng xinh xắn của bạn...
          </p>
        ) : items.length === 0 ? (
          /* Khung hiển thị khi giỏ hàng trống */
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
            {/* Biểu tượng hoa hồng cách điệu bằng SVG sắc nét */}
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
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
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
              Giỏ hàng của bạn đang trống
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
              Hãy dạo một vòng quanh bộ sưu tập hoa tươi và nến thơm để chọn cho mình một chút ngọt ngào nhé.
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
              ✿ Khám phá sản phẩm
            </Link>
          </div>
        ) : (
          /* Danh sách sản phẩm trong giỏ */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #F5D5DD',
                  borderRadius: '18px',
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 16px rgba(212, 106, 126, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '62px',
                      height: '62px',
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, #FFE8EE 0%, #FAD2DC 100%)',
                      color: '#C8526B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: titleFont,
                      fontWeight: 600,
                      fontSize: '16px',
                    }}
                  >
                    B&G
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: titleFont,
                        fontSize: '19px',
                        fontWeight: 600,
                        margin: '0 0 6px 0',
                        color: '#5C2C38',
                      }}
                    >
                      {item.name || `Sản phẩm #${item.productId}`}
                    </h3>
                    <span style={{ color: '#D45D79', fontSize: '14.5px', fontWeight: 600 }}>
                      {(item.price || 150000).toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #F3C6D0',
                      borderRadius: '999px',
                      padding: '4px 10px',
                      backgroundColor: '#FFF5F7',
                    }}
                  >
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      style={{ border: 'none', background: 'none', color: '#C8526B', cursor: 'pointer', padding: '2px 8px', fontSize: '16px', fontWeight: 600 }}
                    >
                      −
                    </button>
                    <span style={{ padding: '0 10px', fontSize: '14px', fontWeight: 600, color: '#5C2C38' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      style={{ border: 'none', background: 'none', color: '#C8526B', cursor: 'pointer', padding: '2px 8px', fontSize: '16px', fontWeight: 600 }}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: '#B88A95',
                      cursor: 'pointer',
                      fontSize: '14px',
                    }}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}

            {/* Khung tổng cộng & nút thanh toán */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #F5D5DD',
                borderRadius: '18px',
                padding: '24px 28px',
                marginTop: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 6px 20px rgba(212, 106, 126, 0.1)',
              }}
            >
              <div>
                <span style={{ fontSize: '14px', color: '#855E68', display: 'block', marginBottom: '4px' }}>
                  Tổng thanh toán (Miễn phí vận chuyển)
                </span>
                <strong style={{ fontFamily: titleFont, fontSize: '26px', color: '#5C2C38' }}>
                  {totalAmount.toLocaleString('vi-VN')}₫
                </strong>
              </div>
              <Link
                to="/checkout"
                style={{
                  background: 'linear-gradient(135deg, #E06D85 0%, #C8526B 100%)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  padding: '15px 34px',
                  borderRadius: '999px',
                  fontSize: '13.5px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  boxShadow: '0 6px 18px rgba(200, 82, 107, 0.25)',
                }}
              >
                Tiến hành thanh toán →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;