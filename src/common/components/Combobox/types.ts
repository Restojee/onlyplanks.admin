import React, { ReactNode } from 'react';
import { PopupPosition } from '@ui/Popup';
import { ThemeSizes } from '@common/themes/common/types';

export interface ComboboxProps {
   
  trigger: React.ReactElement;
   
  content: ReactNode;
   
  isOpen: boolean;
   
  onClose: () => void;
   
  position?: PopupPosition;
   
  size?: ThemeSizes;
   
  noPadding?: boolean;
   
  needOffset?: boolean;
   
  className?: string;
}
