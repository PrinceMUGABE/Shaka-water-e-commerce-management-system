import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, size = 'md', showClose = true }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizes[size]} transform transition-all`}>
          {/* Header */}
          {(title || showClose) && (
            <div className="flex items-center justify-between px-6 py-4 border-b">
              {title && (
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
              )}
              
              {showClose && (
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Confirmation Modal
export const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  type = 'warning'
}) => {
  const typeStyles = {
    warning: 'bg-yellow-100 text-yellow-600',
    danger: 'bg-red-100 text-red-600',
    success: 'bg-green-100 text-green-600',
    info: 'bg-blue-100 text-blue-600'
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="py-6">
        <div className={`w-16 h-16 rounded-full ${typeStyles[type]} flex items-center justify-center mx-auto mb-4`}>
          {type === 'warning' && '⚠️'}
          {type === 'danger' && '❌'}
          {type === 'success' && '✅'}
          {type === 'info' && 'ℹ️'}
        </div>
        
        <p className="text-center text-gray-700 mb-8">{message}</p>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 py-3 rounded-lg text-white transition-colors ${
              type === 'warning' ? 'bg-yellow-600 hover:bg-yellow-700' :
              type === 'danger' ? 'bg-red-600 hover:bg-red-700' :
              type === 'success' ? 'bg-green-600 hover:bg-green-700' :
              'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Modal;