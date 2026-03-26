import React, { useState, useRef, useCallback } from 'react';
import { ContextMenu } from './ContextMenu';
import { PopupPosition, AnchorAlign } from '@ui/Popup';
import { type ListItemOptions } from '@ui/Select/common/types';
import { ThemeSizes } from '@common/themes/common/types';

interface ContextMenuTriggerProps {
   
  items: ListItemOptions[];
   
  children: React.ReactElement;
   
  onChange?: (option: ListItemOptions) => void;
   
  size?: ThemeSizes;
   
  title?: string;
   
  showCheckbox?: boolean;
   
  showSearch?: boolean;
   
  minWidth?: number;
   
  disabled?: boolean;
}










 
export const ContextMenuTrigger: React.FC<ContextMenuTriggerProps> = ({
  items,
  children,
  onChange,
  size = 'sm',
  title,
  showCheckbox = false,
  showSearch = false,
  minWidth = 150,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = useCallback(
    (event: React.MouseEvent) => {
      if (disabled) return;
      
      event.preventDefault();
      event.stopPropagation();

      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
      setIsOpen(true);
    },
    [disabled]
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const anchor = (
    <div
      ref={anchorRef}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: 0,
        height: 0,
        pointerEvents: 'none',
      }}
    />
  );

  return (
    <>
      {React.cloneElement(children, {
        onContextMenu: handleContextMenu,
      })}
      {isOpen && (
        <ContextMenu
          items={items}
          anchor={anchor}
          isOpen={isOpen}
          onClose={handleClose}
          onChange={onChange}
          size={size}
          position={PopupPosition.BOTTOM}
          anchorAlign={AnchorAlign.START}
          title={title}
          showCheckbox={showCheckbox}
          showSearch={showSearch}
          minWidth={minWidth}
        />
      )}
    </>
  );
};
