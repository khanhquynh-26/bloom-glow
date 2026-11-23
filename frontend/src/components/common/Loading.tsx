import { LoaderCircle } from 'lucide-react';

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

function Loading({
  text = 'Đang tải dữ liệu...',
  fullScreen = false,
}: LoadingProps) {
  return (
    <div className={`common-loading ${fullScreen ? 'loading-fullscreen' : ''}`}>
      <LoaderCircle size={30} className="loading-spinner" />
      <span>{text}</span>
    </div>
  );
}

export default Loading;