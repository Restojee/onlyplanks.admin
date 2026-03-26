import React from 'react';
import { AnchorAlign, PopupPosition } from '@ui/Popup';
import { ButtonIcon } from '@common/components/ButtonIcon';
import { Avatar } from '@common/components/Avatar';
import { type ListItemOptions } from '@ui/Select/common/types';
import { ThemeSizes } from '@common/themes/common/types';
import { ContextMenu } from '@common/components/ContextMenu';
import { useDropDownMenu } from './hooks/useDropDownMenu';
import { useMenuOptions } from './hooks/useMenuOptions';
import styles from './ButtonIconDropDownMenu.module.scss';

interface DropDownButtonListProps {
   
  icon?: string;
   
  imageSrc?: string;
   
  imageSize?: ThemeSizes;
   
  avatarHoverIcon?: string;
   
  options: ListItemOptions[];
   
  onChange?: (option: ListItemOptions) => void;
   
  tooltip?: string;
   
  disabled?: boolean;
   
  showCheckbox?: boolean;
   
  showSearch?: boolean;
   
  menuSize?: ThemeSizes;
   
  title?: string;
   
  buttonSize?: ThemeSizes;
   
  position?: PopupPosition;
   
  anchorAlign?: AnchorAlign;
   
  customAnchor?: React.ReactElement;
   
  minWidth?: number;
}


export const ButtonIconDropDownMenu: React.FC<DropDownButtonListProps> = ({
  icon,
  imageSrc,
  imageSize = 'md',
  avatarHoverIcon,
  options,
  onChange,
  tooltip,
  disabled = false,
  showCheckbox = false,
  showSearch = false,
  menuSize = 'sm',
  buttonSize = 'sm',
  title,
  position = PopupPosition.BOTTOM,
  anchorAlign = AnchorAlign.START,
  customAnchor,
  minWidth = 150,
}) => {
  const { isOpen, handleButtonClick, handleClose, handleOptionChange } = useDropDownMenu({
    disabled,
    showCheckbox,
    onChange,
  });

  const processedOptions = useMenuOptions({ options, onClose: handleClose });

  const anchor = React.useMemo(() => {
    if (customAnchor) {
      return React.cloneElement(customAnchor, {
        onClick: handleButtonClick,
      });
    }

    if (imageSrc !== undefined) {
      return (
        <Avatar
          src={imageSrc}
          name={title}
          size={imageSize}
          hoverIcon={avatarHoverIcon}
          onClick={handleButtonClick}
          tooltip={tooltip}
        />
      );
    }

    return (
      <ButtonIcon
        icon={icon!}
        onClick={handleButtonClick}
        tooltip={tooltip}
        disabled={disabled}
        size={buttonSize}
        className={isOpen ? styles.active : undefined}
      />
    );
  }, [customAnchor, imageSrc, title, imageSize, avatarHoverIcon, handleButtonClick, tooltip, icon, disabled, buttonSize, isOpen]);

  return (
    <ContextMenu
      items={processedOptions}
      anchor={anchor}
      isOpen={isOpen}
      onClose={handleClose}
      onChange={handleOptionChange}
      size={menuSize}
      position={position}
      anchorAlign={anchorAlign}
      title={title}
      showCheckbox={showCheckbox}
      showSearch={showSearch}
      minWidth={minWidth}
    />
  );
};
