import React from 'react';
import { Icon } from '@common/components/Icon';
import { Row } from '@common/components/Layout';
import styles from './PageHeader.module.scss';

interface PageHeaderProps {
  title: string;
  onBack?: () => void;
  showBackButton?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  onBack, 
  showBackButton = false 
}) => {
  return (
    <Row className={styles.header} align="center" gap="sm" py="sm" px="md">
      {showBackButton && onBack && (
        <button 
          className={styles.backButton} 
          onClick={onBack}
          type="button"
          title="Назад"
        >
          <Icon icon="IconArrowLeft" size="sm" variant="secondary" />
        </button>
      )}
      <h1 className={styles.title}>{title}</h1>
    </Row>
  );
};
