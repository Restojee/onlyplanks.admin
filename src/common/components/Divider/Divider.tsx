import React from 'react';
import clsx from 'clsx';
import styles from './Divider.module.scss';

export interface DividerProps {
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ 
  orientation = 'vertical',
  className 
}) => {
  return (
    <div 
      className={clsx(
        styles.divider,
        orientation === 'horizontal' && styles.horizontal,
        className
      )} 
    />
  );
};
