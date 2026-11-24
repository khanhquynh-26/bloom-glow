import { useParams } from 'react-router-dom';

function CollectionDetailPage() {
  const { slug } = useParams();

  return (
    <section className="container page-container">
      <h1>Chi tiết bộ sưu tập</h1>
      <p>Bộ sưu tập: {slug}</p>
    </section>
  );
}

export default CollectionDetailPage;