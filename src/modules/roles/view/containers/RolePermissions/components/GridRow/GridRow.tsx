import React from 'react';
import styles from '../../RolePermissions.module.scss';

export interface GridRowProps {
  /** Ячейки строки */
  children: React.ReactNode;
  /** Обработчик клика по строке (опционально) */
  onClick?: () => void;
  /** Настройки колонок для grid-template-columns */
  gridTemplateColumns?: string;
}

export interface GridCellProps {
  /** Содержимое ячейки */
  children: React.ReactNode;
  /** Выравнивание содержимого */
  justify?: 'start' | 'end' | 'center';
  /** Минимальная ширина ячейки */
  minWidth?: number;
}

export const GridCell: React.FC<GridCellProps> = ({
  children,
  justify = 'start',
  minWidth,
}) => {
  const className = `${styles.gridCell} ${
    justify === 'start' ? styles.justifyStart :
    justify === 'end' ? styles.justifyEnd :
    styles.justifyCenter
  }`;

  return (
    <div className={className} style={{ minWidth }}>
      {children}
    </div>
  );
};

export const GridRow: React.FC<GridRowProps> = ({
  children,
  onClick,
  gridTemplateColumns,
}) => {
  return (
    <div
      className={styles.gridRow}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={{ gridTemplateColumns } as React.CSSProperties}
    >
      {children}
    </div>
  );
};
