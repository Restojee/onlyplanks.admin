import * as React from 'react';
import { ColorKey, ThemeSizes, ThemeSizeValue } from "@common/themes/common/types";

export type Justify = 'center' | 'start' | 'end' | 'between' | 'around';
export type Align = 'center' | 'start' | 'end';
export type Direction = 'row' | 'column';
export type Gap = number;
export type Wrap = string;

export interface MouseEvents {
  onClick?: React.MouseEventHandler;
  onDragStart?: React.DragEventHandler;
  onDragEnd?: React.DragEventHandler;
  onDragLeave?: React.DragEventHandler;
  onDragOver?: React.DragEventHandler;
  onDrop?: React.DragEventHandler;
  onSubmit?: React.FormEventHandler;
}

export interface FlexProps extends MouseEvents, GeoProps {
  element?: JSX.ElementType;
  className?: string;
  bgColor?: ColorKey | string;
  color?: ColorKey | string;
  children?: React.ReactNode;
  direction?: Direction;
  width?: ThemeSizeValue;
  minWidth?: ThemeSizeValue;
  maxWidth?: ThemeSizeValue;
  height?: ThemeSizeValue;
  nonIntegration?: boolean;
  style?: React.CSSProperties;
}

export interface GeoProps extends ThemePaddingSizesMap {
  gutter?: Gap;
  wrap?: Wrap;
  gap?: ThemeSizeValue;
  rowGap?: number;
  colGap?: number;
  justify?: Justify;
  align?: Align;
}

export type ThemePaddingSizesMap = Partial<
  Record<'pa' | 'pb' | 'pr' | 'pl' | 'pt' | 'px' | 'py', ThemeSizes>
>;
