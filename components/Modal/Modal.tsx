'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import css from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const router = useRouter();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleClose]);

  return (
    <div className={css.overlay} onClick={handleClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={handleClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

