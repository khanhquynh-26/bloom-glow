import { AlertTriangle } from 'lucide-react';
import Button from './Button';
import Modal from './Modal';

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({
  isOpen,
  title = 'Xác nhận thao tác',
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title} size="sm">
      <div className="confirm-dialog">
        <div className="confirm-dialog-icon">
          <AlertTriangle size={26} />
        </div>

        <p>{message}</p>

        <div className="confirm-dialog-actions">
          <Button variant="outline" onClick={onCancel}>
            {cancelText}
          </Button>

          <Button
            variant="danger"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;