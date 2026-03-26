import React from 'react';
import clsx from 'clsx';
import styles from './HoverableIcon.module.scss';

interface HoverableIconProps {
  icon: React.ReactNode;
  isVisible?: boolean;
  className?: string;
}

export const HoverableIcon: React.FC<HoverableIconProps> = ({ 
  icon, 
  isVisible = false, 
  className 
}) => {
  return (
    <span 
      className={clsx(styles.hoverableIcon, {
        [styles.visible]: isVisible
      }, className)}
    >
      {icon}
    </span>
  );
};
