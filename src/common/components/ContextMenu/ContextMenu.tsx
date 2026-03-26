import React from 'react';
import { AnchorAlign, Popup, PopupPosition, PopupProvider } from '@ui/Popup';
import List from '@ui/List/ui/Base/List';
import { Column, Row } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import { type ListItemOptions } from '@ui/Select/common/types';
import { ThemeSizes } from '@common/themes/common/types';
import { SubMenuList } from '@ui/DropDownButtonList/components/SubMenuList';
import contextMenuStyles from './ContextMenu.module.scss';
import clsx from 'clsx';
import { Divider } from '@ui/Divider';

interface ContextMenuProps {
   
  items: ListItemOptions[];
   
  anchor: React.ReactElement;
   
  isOpen: boolean;
   
  onClose: () => void;
   
  onChange?: (option: ListItemOptions) => void;
   
  size?: ThemeSizes;
   
  position?: PopupPosition;
   
  anchorAlign?: AnchorAlign;
   
  title?: string;
   
  showCheckbox?: boolean;
   
  showSearch?: boolean;
   
  minWidth?: number;
}










 
export const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  anchor,
  isOpen,
  onClose,
  onChange,
  size = 'sm',
  position = PopupPosition.BOTTOM,
  anchorAlign = AnchorAlign.START,
  title,
  showCheckbox = false,
  showSearch = false,
  minWidth = 150,
}) => {
  const handleOptionChange = React.useCallback(
    (option: ListItemOptions) => {
      if (!showCheckbox) {
        onClose();
      }
      onChange?.(option);
    },
    [onChange, onClose, showCheckbox]
  );

  return (
    <PopupProvider>
      <Popup
        isVisible={isOpen}
        onClose={onClose}
        anchor={anchor}
        position={position}
        anchorAlign={anchorAlign}
        noPadding
        className={contextMenuStyles.ContextMenuPopup}
      >
        <Column className={contextMenuStyles.ContextMenu} nonIntegration minWidth={minWidth} width={1}>
          {title && (
            <>
              <Row className={clsx([
                size === 'sm' && contextMenuStyles.sizeSm,
                size === 'md' && contextMenuStyles.sizeMd,
              ])}>
                <Typography>
                  {title}
                </Typography>
              </Row>
              <Column className={contextMenuStyles.divider}>
                <Divider orientation="horizontal" />
              </Column>
            </>
          )}
          {items.some((opt) => opt.submenu) ? (
            items.map((item, index) => (
              <SubMenuList
                key={index}
                item={item}
                size={size}
                onParentClose={onClose}
              />
            ))
          ) : (
            <List
              options={items}
              onChange={handleOptionChange}
              size={size}
              showCheckbox={showCheckbox}
              showSearch={showSearch}
            />
          )}
        </Column>
      </Popup>
    </PopupProvider>
  );
};
