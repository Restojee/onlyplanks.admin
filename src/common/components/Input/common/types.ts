import type * as React from 'react';
import { ThemeColorKey, ThemeSizes } from '@common/themes/common/types';

export interface TextInputProps {
  readOnly?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  bgColor?: ThemeColorKey;
  color?: ThemeColorKey;
  value?: string;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
  className?: string;
  placeholder?: string;
  leftIcon?: string;
  rightIcon?: string;
  integrated?: boolean;
  noBorder?: boolean;
  noHover?: boolean;
  size?: ThemeSizes;
  type?: string;
  nonIntegration?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
  onBlur?: () => void;
  onFocus?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  noPadding?: boolean;
}
