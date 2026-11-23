import type { ReactNode } from 'react';
import { PackageOpen } from 'lucide-react';
import Button from './Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  actionText?: string;
  onAction?: () => void;
}

function EmptyState({
  title = 'Chưa có dữ liệu',
  description = 'Hiện tại chưa có nội dung để hiển thị.',
  icon,
  actionText,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="common-empty-state">
      <div className="empty-state-icon">
        {icon || <PackageOpen size={38} />}
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      {actionText && onAction && (
        <Button onClick={onAction}>{actionText}</Button>
      )}
    </div>
  );
}

export default EmptyState;