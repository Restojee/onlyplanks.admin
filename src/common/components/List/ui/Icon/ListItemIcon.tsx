import { type ListItemIconProps } from '@ui/Select/common/types';
import { Flex } from '@ui/Layout';
import React from 'react';
import { IconButton } from '@ui/Button/ui/IconButton/IconButton';
import { Icon } from '@ui/Icon';

const ListItemIcon = (props: ListItemIconProps) => {
  const { size, source, disabled, pressed, isButton, onFocus, onBlur, onClick } = props;

  const renderIcon = React.useMemo(() => <Icon size={size} icon={source} />, [size, source]);

  const renderIconButton = React.useMemo(
    () => (
      <IconButton
        disabled={disabled}
        pressed={pressed}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        size={size}
      >
        {renderIcon}
      </IconButton>
    ),
    [onClick, onFocus, onBlur, disabled, pressed, renderIcon],
  );

  const renderContent = React.useMemo(
    () => (isButton ? renderIconButton : renderIcon),
    [
      isButton,
      renderIconButton,
      renderIcon
    ],
  );

  return <Flex>{renderContent}</Flex>;
};

export default ListItemIcon;
