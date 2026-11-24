import { useState } from 'react';
import { aiGiftStudioService } from '../services/ai-gift-studio.service';
import type { GiftStudioResponse } from '../types/ai.types';

export default function GiftStudioPage() {
  const [occasion, setOccasion] = useState('Sinh nhật');
  const [recipient, setRecipient] = useState('');
  const [budget, setBudget] = useState('');
  const [preferences, setPreferences] = useState('');
  const [result, setResult] = useState<GiftStudioResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');
      setResult(null);

      const data = await aiGiftStudioService.generateGift({
        occasion,
        recipient,
        budget,
        preferences,
      });

      setResult(data);
    } catch {
      setError('Không thể tạo gợi ý quà tặng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container page-container">
      <h1>AI Gift Studio</h1>
      <p>Để AI giúp bạn tìm món quà phù hợp với người nhận.</p>

      <form onSubmit={handleGenerate}>
        <label>
          Dịp tặng quà
          <select
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
          >
            <option>Sinh nhật</option>
            <option>Kỷ niệm</option>
            <option>Tỏ tình</option>
            <option>Ngày phụ nữ</option>
            <option>Giáng sinh</option>
          </select>
        </label>

        <label>
          Người nhận
          <input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Ví dụ: Mẹ, bạn thân..."
            required
          />
        </label>

        <label>
          Ngân sách
          <input
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Ví dụ: 500000"
            required
          />
        </label>

        <label>
          Sở thích hoặc yêu cầu khác
          <textarea
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            placeholder="Ví dụ: thích hoa hồng, màu pastel..."
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Đang tạo gợi ý...' : 'Tạo gợi ý quà tặng'}
        </button>
      </form>

      {error && <p role="alert">{error}</p>}

      {result?.suggestions?.map((item, index) => (
        <section key={index}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>

          {item.products?.map((product) => (
            <p key={product.id}>{product.name}</p>
          ))}
        </section>
      ))}
    </main>
  );
}