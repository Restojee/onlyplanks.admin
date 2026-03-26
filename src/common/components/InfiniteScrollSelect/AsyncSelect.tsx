import React, { useState } from 'react';
import { Combobox } from '@common/components/Combobox/Combobox';
import { InputText } from '@ui/Input/ui/InputText/InputText';
import { type ListItemOptions } from '@ui/Select/common/types';
import { ThemeSizes } from '@common/themes/common/types';
import { PopupPosition } from '@ui/Popup';
import { InfiniteScrollList } from '@common/components/InfiniteScrollList';
import { ButtonIcon } from '@ui/ButtonIcon';
import { Row } from '@ui/Layout';

interface InfiniteScrollSelectProps {
  options: ListItemOptions[];
  onChange?: (option: ListItemOptions) => void;
  placeholder?: string;
  size?: ThemeSizes;
  disabled?: boolean;
  value?: any;
  allowClear?: boolean;
  nonIntegration?: boolean;
  integrated?: boolean;
  noBorder?: boolean;
  noPadding?: boolean;
  noHover?: boolean;
  rightIcon?: string;
  append?: React.ReactNode;
  leftIcon?: string;
  onBlur?: () => void;
  onSearchChange?: (value: string) => void;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoadingMore: boolean;
}

export const AsyncSelect: React.FC<InfiniteScrollSelectProps> = ({
  options,
  onChange,
  placeholder = 'Выберите...',
  size = 'md',
  disabled = false,
  value,
  allowClear = true,
  nonIntegration = false,
  integrated = false,
  noBorder = false,
  noPadding = false,
  noHover = false,
  rightIcon,
  append,
  leftIcon,
  onBlur,
  onSearchChange,
  onLoadMore,
  hasMore,
  isLoadingMore,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(opt => opt.value === value);
  const displayValue = typeof selectedOption?.label === 'string' ? selectedOption.label : '';

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOptionChange = (option: ListItemOptions) => {
    onChange?.(option);
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange?.({ label: 'Не выбрано', value: undefined });
  };

  const handleClearMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleClear();
  };

  const showClear = allowClear && !disabled && value;

  const rightNode = React.useMemo(() => {
    if (append) {
      return append;
    }

    return (
      <Row gap="xs" align="center">
        {showClear && (
          <ButtonIcon
            icon="IconReject"
            size={size}
            onClick={handleClear}
            onMouseDown={handleClearMouseDown}
          />
        )}
        <ButtonIcon
          icon="IconChevronDown"
          size={size}
          onClick={handleInputClick}
        />
      </Row>
    );
  }, [append, showClear, handleClear, handleClearMouseDown, handleInputClick, size]);

  const optionsWithSelection: ListItemOptions[] = React.useMemo(() => {
    const base = options.map((opt) => ({
      ...opt,
      isSelected: opt.value === value,
    }));

    if (!allowClear) {
      return base;
    }

    return [
      { label: 'Не выбрано', value: undefined, isSelected: value === undefined },
      ...base,
    ];
  }, [options, value, allowClear]);

  return (
    <Combobox
      trigger={
        <InputText
          onClick={handleInputClick}
          onBlur={onBlur}
          value={displayValue}
          placeholder={placeholder}
          size={size}
          nonIntegration={nonIntegration}
          integrated={integrated}
          noBorder={noBorder}
          noPadding={noPadding}
          noHover={noHover}
          append={rightNode}
          leftIcon={leftIcon}
          readOnly={true}
        />
      }
      content={
        <InfiniteScrollList
          options={optionsWithSelection}
          onChange={handleOptionChange}
          onLoadMore={onLoadMore}
          hasMore={hasMore}
          isLoading={isLoadingMore}
          size={size}
          showSearch={true}
          onSearch={onSearchChange}
        />
      }
      isOpen={isOpen}
      onClose={handleClose}
      position={PopupPosition.BOTTOM}
      size={size}
    />
  );
};

export default AsyncSelect;
