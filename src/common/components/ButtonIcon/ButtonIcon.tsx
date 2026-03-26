import React from 'react';
import { Icon } from '@common/components/Icon';
import styles from './ButtonIcon.module.scss';
import { ThemeSizes } from '@common/themes/common/types';
import clsx from "clsx";

interface ButtonIconProps {
  icon: string;
  onClick?: (e: React.MouseEvent) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  tooltip?: string;
  disabled?: boolean;
  className?: string;
  size: ThemeSizes;
  // В варианты
  outlined?: boolean;
}

//TODO зарезолвить с Button/IconButton
export const ButtonIcon: React.FC<ButtonIconProps> = ({
  icon,
  onClick,
  onMouseDown,
  tooltip,
  disabled,
  className,
  outlined,
  size
}) => {
  return (
    <button
      className={clsx([
        styles.button,
        className,
        outlined && styles.outlined
      ])}
      onClick={onClick}
      onMouseDown={onMouseDown}
      title={tooltip}
      disabled={disabled}
      type="button"
    >
      <Icon icon={icon} size={size} />
    </button>
  );
};
