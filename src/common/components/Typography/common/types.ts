import * as React from "react";
import { TextTags } from "@common/constants/textTags";
import { ThemeColorKey, ThemeSizes } from '@common/themes/common/types';
import { MouseEvent } from "react";

export interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'subtitle1' | 'subtitle2';
  fontSize?: ThemeSizes;
  fontWeight?: 'light' | 'normal' | 'medium' | 'semiBold' | 'bold';
  ellipsis?: boolean;
  upperCase?: boolean;
  link?: boolean;
  clickable?: boolean;
  cantSelect?: boolean;
  children?: React.ReactNode;
  className?: string;
  size?: string;
  opacity?: number;
  tag?: TextTags;
  color?: ThemeColorKey;
  href?: string;
  disabled?: boolean;
  onClick?(event: MouseEvent): void;
}
