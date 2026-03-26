import React from 'react';
import clsx from 'clsx';
import styles from './Toggler.module.scss';

export interface TogglerProps {
  isExpanded: boolean;
  onClick?: () => void;
  direction?: 'vertical' | 'horizontal';
  iconExpanded?: React.ReactNode;
  iconCollapsed?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const Toggler: React.FC<TogglerProps> = ({
  isExpanded,
  onClick,
  direction = 'vertical',
  iconExpanded,
  iconCollapsed,
  className,
  disabled = false,
}) => {
  const getDefaultIcon = () => {
    if (direction === 'vertical') {
      return isExpanded ? '▼' : '▲';
    }
    return '▶';
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        styles.toggler,
        {
          [styles.expanded]: isExpanded,
          [styles.vertical]: direction === 'vertical',
          [styles.horizontal]: direction === 'horizontal',
          [styles.disabled]: disabled,
        },
        className
      )}
    >
      {iconExpanded && isExpanded
        ? iconExpanded
        : iconCollapsed && !isExpanded
        ? iconCollapsed
        : getDefaultIcon()}
    </button>
  );
};
