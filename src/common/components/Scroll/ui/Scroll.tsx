import * as React from 'react';
import clsx from 'clsx';
import styles from './Scroll.module.scss';
import { ColumnProps } from '@ui/Layout/ui/Column/ui/Column';
import { Column, Paper } from "@ui/Layout";

export interface ScrollProps extends Omit<ColumnProps, 'className'> {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const Scroll: React.FC<ScrollProps> = (props) => {
  const { 
    children, 
    className,
    containerClassName,
    ...otherProps 
  } = props;

  return (
    <Column 
      className={clsx(styles.Scroll, containerClassName)}
      gap={4} 
      {...otherProps}
    >
      <Column className={styles.Wrapper}>
        <Paper className={clsx(styles.Content, className)}>
          {children}
        </Paper>
      </Column>
    </Column>
  );
};
