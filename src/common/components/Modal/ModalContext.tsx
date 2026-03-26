import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Modal as ModalBus } from './ModalEventBus';
import { Instances } from '@common/instances/Instances';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalConfig {
  id: string;
  title: string;
  content?: ReactNode;
  component?: React.ComponentType<any>;
  options?: any;
  size?: ModalSize;
  onSuccess?: () => void | Promise<void>;
  onCancel?: () => void;
  onClose?: () => void;
  customProps?: any;
  showButtons?: boolean;
  successLabel?: string;
  cancelLabel?: string;
  container?: Instances ;
}

interface ModalContextValue {
  modals: ModalConfig[];
  showModal: (title: string, config?: Partial<Omit<ModalConfig, 'id' | 'title'>>, container?: Instances) => string;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextValue>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<ModalConfig[]>([]);
  const [idCounter, setIdCounter] = useState(0);

  const showModal = useCallback(
    (title: string, config?: Partial<Omit<ModalConfig, 'id' | 'title'>>, container?: Instances): string => {
      const id = `modal-${idCounter}-${Date.now()}`;
      setIdCounter((prev) => prev + 1);

      const modal: ModalConfig = {
        id,
        title,
        size: config?.size || 'md',
        onSuccess: config?.onSuccess,
        onCancel: config?.onCancel,
        onClose: config?.onClose,
        content: config?.content,
        component: config?.component,
        options: config?.options,
        customProps: config?.customProps,
        showButtons: config?.showButtons,
        successLabel: config?.successLabel || 'Подтвердить',
        cancelLabel: config?.cancelLabel || 'Отмена',
        container: container,
      };

      setModals((prev) => [...prev, modal]);
      return id;
    },
    [idCounter]
  );

  const closeModal = useCallback((id: string) => {
    setModals((prev) => {
      const modal = prev.find((m) => m.id === id);
      if (modal?.onClose) {
        modal.onClose();
      }
      return prev.filter((m) => m.id !== id);
    });
  }, []);

  const closeAllModals = useCallback(() => {
    modals.forEach((modal) => {
      if (modal.onClose) {
        modal.onClose();
      }
    });
    setModals([]);
  }, [modals]);

  const value: ModalContextValue = {
    modals,
    showModal,
    closeModal,
    closeAllModals,
  };

  useEffect(() => {
    ModalBus.registerHandler(showModal, closeModal, closeAllModals);
    
    return () => {
      ModalBus.unregisterHandler();
    };
  }, [showModal, closeModal, closeAllModals]);

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

export const useModal = (): ModalContextValue => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
};
