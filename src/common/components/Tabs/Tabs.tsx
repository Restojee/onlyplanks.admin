import React, { useState } from 'react';
import clsx from 'clsx';
import { ThemeSizes } from '@common/themes/common/types';
import styles from './Tabs.module.scss';

export interface TabItem {
  key: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  size?: ThemeSizes;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeKey,
  defaultActiveKey,
  onChange,
  size = 'md',
  className,
}) => {
  const [internalActiveKey, setInternalActiveKey] = useState(defaultActiveKey || items[0]?.key);
  
  const currentActiveKey = activeKey !== undefined ? activeKey : internalActiveKey;

  const handleTabClick = (key: string, disabled?: boolean) => {
    if (disabled) return;
    
    if (activeKey === undefined) {
      setInternalActiveKey(key);
    }
    onChange?.(key);
  };

  return (
    <div className={clsx(styles.tabs, className, {
      [styles.sizeSm]: size === 'sm',
      [styles.sizeMd]: size === 'md',
      [styles.sizeLg]: size === 'lg',
    })}>
      <div className={styles.tabList}>
        {items.map((item) => (
          <button
            key={item.key}
            className={clsx(styles.tab, {
              [styles.active]: currentActiveKey === item.key,
              [styles.disabled]: item.disabled,
            })}
            onClick={() => handleTabClick(item.key, item.disabled)}
            disabled={item.disabled}
            type="button"
          >
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
            <span className={styles.label}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
