import { type ThemeColors, type ThemeSizes } from '@common/themes/common/types';
import { EventHandler } from '@common/types/dom';
import { type CoreButtonProps } from '@ui/Button/common/types';
import { type MouseEventHandler } from 'react';
import { EIcon } from '@ui/Icon/common/types';

export interface IconButtonProps
  extends Pick<
    CoreButtonProps,
    | 'className'
    | 'onClick'
    | 'disabled'
    | 'pressed'
    | 'onMouseDown'
    | 'onMouseUp'
    | 'onMouseOver'
    | 'onMouseEnter'
    | 'onMouseLeave'
    | 'onFocus'
    | 'onBlur'
  > {
  size?: ThemeSizes;
  useIconBackground?: boolean;
  noPadding?: boolean;
}

export interface IconProps {
  source?: string | EIcon;
  color?: ThemeColors;
  disabled?: boolean;
  size?: ThemeSizes;
  isButton?: boolean;
}

export enum ListItemIconPositions {
  Left = 'Left',
  Right = 'Right',
}

export interface ListItemIconProps extends IconButtonProps, IconProps {
  hint?: string;
  isButton?: boolean;
  position?: ListItemIconPositions;
}

export interface ListProps {
  label?: string;
  options?: ListItemOptions[];
  placeholder?: string;
}

export interface ListItemProps extends ListItemOptions {
  onClick?: MouseEventHandler;
  onCheckboxChange?: MouseEventHandler;
  size?: ThemeSizes;
  showCheckbox?: boolean;
}

export interface ListItemOptions<K = any, T = unknown> {
  label?: JSX.Element | string;
  isSelected?: boolean;
  value?: K;
  additional?: T;
  disabled?: boolean;
  left?: boolean;
  right?: boolean;
  blocked?: boolean;
  rightIcon?: ListItemIconProps;
  leftIcon?: ListItemIconProps;
  rightIcons?: ListItemIconProps[];
  leftIcons?: ListItemIconProps[];
  submenu?: ListItemOptions[];
  onItemClick?: () => void;
  size?: ThemeSizes;
   
  shortcut?: string;
}
