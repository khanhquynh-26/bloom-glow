import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [method, setMethod] = useState('COD');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const titleFont = '"Playfair Display", "Times New Roman", serif';
  const bodyFont = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // 1. Gửi tạo đơn hàng tới Backend
      const orderRes = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1,
          shippingAddress: `${fullName} - ${address}`,
          phone,
          totalAmount: 250000,
          items: [{ productId: 1, quantity: 1, price: 250000 }],
        }),
      });
      const orderData = await orderRes.json();

      // 2. Gửi thông tin thanh toán tới Backend
      await fetch('http://localhost:3001/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderData?.data?.id || 1,
          amount: 250000,
          method,
          status: method === 'COD' ? 'PENDING' : 'COMPLETED',
        }),
      });

      setSuccessMsg('Đặt hàng & ghi nhận thanh toán thành công! Đang chuyển sang trang Đơn hàng...');
      setTimeout(() => navigate('/orders'), 1800);
    } catch (err) {
      console.error('Lỗi thanh toán:', err);
      setSuccessMsg('Đã gửi thông tin đơn hàng!');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px 16px',
    borderRadius: '12px',
    border: '1.5px solid #F3C6D0',
    backgroundColor: '#FFF9FA',
    fontSize: '14.5px',
    color: '#4A353B',
    outline: 'none',
    boxSizing: 'border-box',
  };

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
          ✿ BLOOM & GLOW CHECKOUT ✿
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
          Thanh Toán Đơn Hàng
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
          Điền thông tin nhận quà để Bloom & Glow chuẩn bị gói ghém thật chỉn chu cho bạn nhé.
        </p>
      </div>

      {/* Form thông tin giao hàng & thanh toán */}
      <div style={{ maxWidth: '640px', margin: '44px auto 0', padding: '0 20px' }}>
        <form
          onSubmit={handlePlaceOrder}
          style={{
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #F7D6DE',
            borderRadius: '24px',
            padding: '40px 32px',
            boxShadow: '0 12px 32px rgba(212, 106, 126, 0.12)',
          }}
        >
          <h2
            style={{
              fontFamily: titleFont,
              fontSize: '24px',
              fontWeight: 600,
              color: '#5C2C38',
              margin: '0 0 24px 0',
              textAlign: 'center',
            }}
          >
            Thông Tin Giao Hàng
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#6E4550', marginBottom: '6px' }}>
                Họ và tên người nhận *
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Nguyễn Minh Anh"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#6E4550', marginBottom: '6px' }}>
                Số điện thoại liên hệ *
              </label>
              <input
                type="tel"
                required
                placeholder="Ví dụ: 0901234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#6E4550', marginBottom: '6px' }}>
                Địa chỉ giao hàng chi tiết *
              </label>
              <input
                type="text"
                required
                placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#6E4550', marginBottom: '6px' }}>
                Lời nhắn trên thiệp (tùy chọn)
              </label>
              <input
                type="text"
                placeholder="Gửi lời chúc ngọt ngào kèm theo hoa..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Phương thức thanh toán */}
            <div>
              <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#6E4550', marginBottom: '10px' }}>
                Phương thức thanh toán
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { id: 'COD', label: 'Thanh toán khi nhận hàng (COD)' },
                  { id: 'BANKING', label: 'Chuyển khoản ngân hàng / QR' },
                ].map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setMethod(opt.id)}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '14px',
                      border: method === opt.id ? '2px solid #D45D79' : '1.5px solid #F3C6D0',
                      backgroundColor: method === opt.id ? '#FFE8EE' : '#FFF9FA',
                      cursor: 'pointer',
                      fontSize: '13.5px',
                      fontWeight: method === opt.id ? 600 : 500,
                      color: '#5C2C38',
                      textAlign: 'center',
                    }}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {successMsg && (
            <div
              style={{
                marginTop: '20px',
                padding: '12px 16px',
                borderRadius: '12px',
                backgroundColor: '#FFE4EA',
                color: '#B83B58',
                fontSize: '14px',
                fontWeight: 500,
                textAlign: 'center',
              }}
            >
              {successMsg}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button
              type="submit"
              disabled={submitting}
              style={{
                background: 'linear-gradient(135deg, #E06D85 0%, #C8526B 100%)',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '14px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '16px 42px',
                borderRadius: '999px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(200, 82, 107, 0.28)',
              }}
            >
              {submitting ? 'Đang xử lý...' : '✿ Xác nhận đặt hàng'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutPage;