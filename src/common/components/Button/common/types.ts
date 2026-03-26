import type * as React from 'react';
import { ThemeColorKey, ThemeSizes } from '@common/themes/common/types';

export interface ButtonProps extends CoreButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  icon?: string;
  leftIcon?: string;
  rightIcon?: string;
  color?: ThemeColorKey;
  bgColor?: ThemeColorKey;
  label?: string;
  append?: React.ReactElement;
  prepend?: React.ReactElement;
  border?: string;
  borderColor?: ThemeColorKey | string;
  borderRadius?: string | number;
  padding?: string;
  fontSize?: string | number;
  fontWeight?: 'light' | 'normal' | 'medium' | 'semiBold' | 'bold';
  minWidth?: string | number;
  maxWidth?: string | number;
  width?: string | number;
  height?: string | number;
  hoverBorderColor?: ThemeColorKey;
  hoverBgColor?: ThemeColorKey;
  hoverColor?: ThemeColorKey;
  hoverTransform?: string;
  activeBorderColor?: ThemeColorKey;
  activeBgColor?: ThemeColorKey;
  activeColor?: ThemeColorKey;
  isActive?: boolean;
  size?: ThemeSizes;
  noBg?: boolean;
  noPadding?: boolean;
  noBorder?: boolean;
}

export interface CoreButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  hint?: string;
  pressed?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseUp?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseOver?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  className?: string;
}

export interface CancelButtonProps extends ButtonProps {}
export interface IconButtonProps extends ButtonProps {}
export interface SubmitButtonProps extends ButtonProps {}
