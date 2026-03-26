import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Notification as NotificationBus } from './NotificationEventBus';
import { handleHttpError as processHttpError } from '@common/utils/httpErrorHandler';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  system?: string[];
  duration?: number;
}

interface NotificationContextValue {
  notifications: NotificationItem[];
  maxVisible: number;
  setMaxVisible: (max: number) => void;
  showNotification: (type: NotificationType, title: string, message: string, duration?: number, system?: string[]) => void;
  success: (title: string, message: string, duration?: number) => void;
  error: (title: string, message: string, duration?: number, system?: string[]) => void;
  warning: (title: string, message: string, duration?: number) => void;
  info: (title: string, message: string, duration?: number) => void;
  handleHttpError: (error: any) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextValue>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [idCounter, setIdCounter] = useState(0);
  const [maxVisible, setMaxVisible] = useState(5);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const showNotification = useCallback(
    (type: NotificationType, title: string, message: string, duration = 5000, system?: string[]) => {
      const id = `notification-${idCounter}-${Date.now()}`;
      setIdCounter((prev) => prev + 1);

      const notification: NotificationItem = {
        id,
        type,
        title,
        message,
        system,
        duration,
      };

      setNotifications((prev) => [...prev, notification]);
    },
    [idCounter]
  );

  const success = useCallback(
    (title: string, message: string, duration = 5000) => {
      showNotification('success', title, message, duration);
    },
    [showNotification]
  );

  const error = useCallback(
    (title: string, message: string, duration = 7000, system?: string[]) => {
      showNotification('error', title, message, duration, system);
    },
    [showNotification]
  );

  const warning = useCallback(
    (title: string, message: string, duration = 5000) => {
      showNotification('warning', title, message, duration);
    },
    [showNotification]
  );

  const info = useCallback(
    (title: string, message: string, duration = 5000) => {
      showNotification('info', title, message, duration);
    },
    [showNotification]
  );

  const handleHttpError = useCallback(
    (err: any) => {
      const { title, message, system } = processHttpError(err);
      error(title, message, undefined, system);
    },
    [error]
  );

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const notificationContextValue: NotificationContextValue = {
    notifications,
    maxVisible,
    setMaxVisible,
    showNotification,
    success,
    error,
    warning,
    info,
    handleHttpError,
    removeNotification,
    clearAll,
  };

  useEffect(() => {
    NotificationBus.registerHandler(showNotification, handleHttpError);

    return () => {
      NotificationBus.unregisterHandler();
    };
  }, [showNotification, handleHttpError]);

  return <NotificationContext.Provider value={notificationContextValue}>{children}</NotificationContext.Provider>;
};

export const useNotification = (): NotificationContextValue => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};
