import { useEffect, useState } from 'react';
import { analyticsService } from '../../services/analytics.service';
import type { AnalyticsSummary } from '../../types/ai.types';

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    analyticsService
      .getSummary()
      .then(setData)
      .catch(() => setError('Không tải được dữ liệu thống kê.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Đang tải thống kê...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>Chưa có dữ liệu thống kê.</p>;

  return (
    <main className="container page-container">
      <h1>Thống kê AI</h1>

      <div className="analytics-grid">
        <article>
          <h3>Lượt tìm kiếm</h3>
          <strong>{data.totalSearches}</strong>
        </article>

        <article>
          <h3>Lượt trò chuyện AI</h3>
          <strong>{data.totalChats}</strong>
        </article>

        <article>
          <h3>Lượt gợi ý sản phẩm</h3>
          <strong>{data.totalRecommendations}</strong>
        </article>
      </div>

      <h2>Từ khóa phổ biến</h2>
      <ul>
        {data.popularKeywords.map((keyword) => (
          <li key={keyword}>{keyword}</li>
        ))}
      </ul>
    </main>
  );
}