// ToastContext.tsx
import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast';

interface ToastProps {
  message: string;
  duration: number;
}

interface ToastContextType {
  showToast: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = (message: string, duration = 3000) => {
    setToast({ message, duration });
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast.message} duration={toast.duration} onClose={hideToast} />}
    </ToastContext.Provider>
  );
};
