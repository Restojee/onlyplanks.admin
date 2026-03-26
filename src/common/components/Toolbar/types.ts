import React from 'react';

export type ToolbarItemAlign = 'left' | 'right';

export interface ToolbarItem {
  id: string;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
  isActive?: boolean;
  align?: ToolbarItemAlign;
  tooltip?: string;
  type?: 'divider';
  component?: React.ReactElement;
}

export type ToolbarElement = ToolbarItem ;

export interface ToolbarProps {
  items: ToolbarElement[];
  className?: string;
}
