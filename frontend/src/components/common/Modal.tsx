import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="common-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={`common-modal modal-${size}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="common-modal-header">
          <h2>{title}</h2>

          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}
            aria-label="Đóng"
          >
            <X size={20} />
          </button>
        </div>

        <div className="common-modal-content">{children}</div>
      </div>
    </div>
  );
}

export default Modal;