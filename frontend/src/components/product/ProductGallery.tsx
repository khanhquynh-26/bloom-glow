import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ProductGalleryProps {
  imageUrl: string;
  productName: string;
}

function ProductGallery({
  imageUrl,
  productName,
}: ProductGalleryProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="product-gallery">
      {imageUrl && !imageError ? (
        <img
          src={imageUrl}
          alt={productName}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="product-gallery-placeholder">
          <ImageOff size={35} />
          <span>Chưa có hình ảnh sản phẩm</span>
        </div>
      )}
    </div>
  );
}

export default ProductGallery;