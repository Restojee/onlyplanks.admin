import React, { useState } from 'react';
import { Popup, PopupPosition, AnchorAlign, PopupProvider } from '@ui/Popup';
import { ButtonIcon } from '@common/components/ButtonIcon';
import { ThemeSizes } from '@common/themes/common/types';

interface ButtonDropDownProps {
  icon: string;
  children: React.ReactNode;
  tooltip?: string;
  disabled?: boolean;
  buttonSize?: ThemeSizes;
  position?: PopupPosition;
  anchorAlign?: AnchorAlign;
  width?: number;
  onOpen?: () => void;
  onClose?: () => void;
}

export const ButtonDropDown: React.FC<ButtonDropDownProps> = ({
  icon,
  children,
  tooltip,
  disabled = false,
  buttonSize = 'sm',
  position = PopupPosition.BOTTOM,
  anchorAlign = AnchorAlign.START,
  width,
  onOpen,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    if (disabled) return;
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState) {
      onOpen?.();
    } else {
      onClose?.();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <PopupProvider>
      <Popup
        isVisible={isOpen}
        onClose={handleClose}
        anchor={
          <ButtonIcon
            icon={icon}
            onClick={handleButtonClick}
            tooltip={tooltip}
            disabled={disabled}
            size={buttonSize}
            outlined
          />
        }
        position={position}
        anchorAlign={anchorAlign}
        noPadding
        width={width}
        size="sm"
      >
        <div>{children}</div>
      </Popup>
    </PopupProvider>
  );
};
