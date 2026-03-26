import React, { useState, useEffect, useId } from 'react';
import { Popup, PopupPosition, AnchorAlign, usePopupContext, PopupProvider } from '@ui/Popup';
import List from '@ui/List/ui/Base/List';
import { ListItem } from '@ui/List/ui/Item/ListItem';
import { type ListItemOptions } from '@ui/Select/common/types';
import { ThemeSizes } from '@common/themes/common/types';

interface SubmenuListProps {
  item: ListItemOptions;
  size?: ThemeSizes;
  onParentClose?: () => void;
}

export const SubMenuList: React.FC<SubmenuListProps> = ({ item, size = 'sm', onParentClose }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const submenuId = useId();
  const popupContext = usePopupContext();

  
  useEffect(() => {
    if (item.submenu && popupContext) {
      popupContext.registerCloseHandler(submenuId, () => setIsSubmenuOpen(false));
      return () => {
        popupContext.unregisterCloseHandler(submenuId);
      };
    }
  }, [submenuId, popupContext, item.submenu]);

  const handleClick = () => {
    if (item.submenu) {
      
      if (!isSubmenuOpen && popupContext) {
        popupContext.closeOtherPopups(submenuId);
      }
      setIsSubmenuOpen(!isSubmenuOpen);
    } else {
      item.onItemClick?.();
    }
  };

  const menuItemElement = (
    <ListItem
      label={item.label}
      leftIcon={item.leftIcon}
      shortcut={item.shortcut}
      rightIcon={item.submenu ? { source: 'IconChevronRight' } : item.rightIcon}
      onClick={handleClick}
      size={size}
    />
  );

  if (item.submenu) {
    return (
      <Popup
        isVisible={isSubmenuOpen}
        onClose={() => setIsSubmenuOpen(false)}
        anchor={menuItemElement}
        position={PopupPosition.RIGHT}
        noPadding
        needOffset
        offset={4}
        nonIntegration={false}
        anchorAlign={AnchorAlign.START}
      >
        <PopupProvider>
          {item.submenu.some((opt) => opt.submenu) ? (
            
            item.submenu.map((subItem, index) => (
              <SubMenuList
                key={index}
                item={subItem}
                size={size}
                onParentClose={() => {
                  setIsSubmenuOpen(false);
                  onParentClose?.();
                }}
              />
            ))
          ) : (
            
            <List
              options={item.submenu}
              onChange={(option) => {
                option.onItemClick?.();
                setIsSubmenuOpen(false);
                onParentClose?.();
              }}
              size={size}
            />
          )}
        </PopupProvider>
      </Popup>
    );
  }

  return menuItemElement;
};
