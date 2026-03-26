import { ThemeSizes } from '@common/themes/common/types';
import { ThemeTokens } from "@common/themes/common/variables";

export enum EIcon {

}

export type IconVariant = 'primary' | 'secondary';

export interface IconProps {
  icon?: EIcon | string;
  size?: ThemeSizes;
  color?: ThemeTokens | string;
  variant?: IconVariant;
  active?: boolean;
  disabled?: boolean;
  noHover?: boolean;
  className?: string;
}
