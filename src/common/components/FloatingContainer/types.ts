import * as React from 'react';
import { ThemeColorKey, ThemeColors } from "@common/themes/common/types";

export type PositionType = 'fixed' | 'sticky' | 'relative' | 'absolute';

export type Value = string | number;

export interface Position {
  top?: Value;
  right?: Value;
  bottom?: Value;
  left?: Value;
}

export interface FloatProps extends Position {
  children?: React.ReactNode;
  className?: string;
  position: PositionType;
  zIndex?: number;
  width?: Value;
  height?: Value;
  maxWidth?: Value;
  maxHeight?: Value;
  minWidth?: Value;
  minHeight?: Value;
  background?: ThemeColorKey;
  borderRadius?: string;
  boxShadow?: string;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  centered?: boolean;
}

export interface StickyProps extends Omit<FloatProps, 'position'> {}

export interface FixedProps extends Omit<FloatProps, 'position'> {} 
