import React from 'react';
import { Row } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import styles from './SidePanelHeader.module.scss';

interface SidePanelHeaderProps {
  title?: string;
  children?: React.ReactNode;
}

export const SidePanelHeader: React.FC<SidePanelHeaderProps> = ({ title, children }) => {
  return (
    <div className={styles.header}>
      <Row align="center" justify="between" gap="sm" px="md" py="sm">
        {title && <h1 className={styles.title}>{title}</h1>}
        {children}
      </Row>
    </div>
  );
};
