import React, { useEffect, useState } from 'react';
import { useNotification } from './NotificationContext';
import type { NotificationItem } from './NotificationContext';
import styles from './Notification.module.scss';
import { Row, Column } from '@ui/Layout';
import { Icon } from '@ui/Icon';
import { Typography } from '@ui/Typography';
import { Button } from '@ui/Button';

interface NotificationProps {
  notification: NotificationItem;
}

const NotificationCard: React.FC<NotificationProps> = ({ notification }) => {
  const { removeNotification } = useNotification();
  const [isExiting, setIsExiting] = useState(false);
  const [showSystem, setShowSystem] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      removeNotification(notification.id);
    }, 300);
  };

  useEffect(() => {
    if (notification.duration && notification.duration > 0) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          removeNotification(notification.id);
        }, 300);
      }, notification.duration);

      return () => clearTimeout(timer);
    }
  }, [notification.duration, notification.id, removeNotification]);

  const getIconName = () => {
    switch (notification.type) {
      case 'success':
        return 'IconSuccess';
      case 'error':
        return 'IconError';
      case 'warning':
        return 'IconWarning';
      case 'info':
        return 'IconInfo';
      default:
        return 'IconInfo';
    }
  };

  return (
    <Row
      className={`${styles.notification} ${styles[notification.type]} ${isExiting ? styles.exit : ''}`}
      gap="sm"
      align="start"
      pa="sm"
    >
      <Icon className={styles.icon} color="paletteColorsWhite" icon={getIconName()} size="lg" />
      <Row width={1}>
        <Column gap="xs">
          <Typography fontWeight="semiBold" size="sm">{notification.title}</Typography>
          <Typography size="sm" color="paletteTextPrimary" opacity={0.7}>
            {notification.message}
          </Typography>

          {notification.system && notification.system.length > 0 && (
            <Column gap="xs">
              <Row gap="xs" align="center">
                <Button.Icon
                  onClick={() => setShowSystem((v) => !v)}
                  noBg
                  noPadding
                  aria-label="Детали ошибки"
                >
                  <Icon icon={showSystem ? 'IconChevronDown' : 'IconChevronRight'} size="sm" />
                </Button.Icon>
                <Typography size="sm" opacity={0.6}>
                  Детали
                </Typography>
              </Row>

              {showSystem && (
                <Typography size="sm" opacity={0.6}>
                  {notification.system.join('\n')}
                </Typography>
              )}
            </Column>
          )}
        </Column>
      </Row>
      <Button.Icon
        className={styles.close}
        onClick={handleClose}
        noBg
        noPadding
        aria-label="Закрыть"
      >
        <Icon icon="IconReject" size="sm" />
      </Button.Icon>
    </Row>
  );
};

export const NotificationContainer: React.FC = () => {
  const { notifications, maxVisible = 5 } = useNotification();

  const visibleNotifications = notifications.slice(-maxVisible);

  return (
    <div className={styles.notificationContainer}>
      {visibleNotifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationContainer;
