import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ListItem } from '@ui/List/ui/Item/ListItem';
import { type ListProps } from '@ui/List/common/types';
import { Stack } from '@ui/Layout';
import { type ListItemOptions, ListItemProps } from '@ui/Select/common/types';
import { InputText } from '@common/components/Input/ui/InputText/InputText';
import clsx from 'clsx';
import styles from './List.module.scss';
import { Typography } from '@ui/Typography';
import Collection from '@ui/Collection/Collection';
import { CollectionData, CollectionProps } from '@ui/Collection/types';
import { If, When, Choose, ChooseWhen, Otherwise } from '@ui/If';
import { filterOptionsBySearch } from '@ui/List/utils/listUtils';

const List = (props: ListProps) => {
  const { t } = useTranslation();
  const {
    onChange,
    onSearch,
    options,
    emptyMessage = t('List.EmptyMessage'),
    placeholder = t('List.SearchPlaceholder'),
    className,
    size = 'sm',
    showCheckbox = false,
    showSearch = false,
    isLoading = false,
    error = null,
    sentinelRef,
    itemsContainerRef,
  } = props;

  const [searchValue, setSearchValue] = useState('');

  const handleClick = React.useCallback(
    (option: ListItemOptions) => {
      onChange?.(option);
    },
    [onChange, showCheckbox],
  );

  const handleCheckboxChange = React.useCallback(
    (option: ListItemOptions) => {
      onChange?.(option);
    },
    [onChange],
  );

  const handleSearchChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchValue(value);
      onSearch?.(value);
    },
    [onSearch]
  );

  const filteredOptions = useMemo(
    () => filterOptionsBySearch(options, searchValue),
    [options, searchValue]
  );

  const sizeClasses = clsx({
    [styles.sizeSm]: size === 'sm',
    [styles.sizeMd]: size === 'md',
  })

  const renderOptions = React.useMemo(
    (): ListItemProps[] =>
      filteredOptions?.map((option) => ({
        key: option.value,
        label: option.label,
        leftIcons: option.leftIcons,
        leftIcon: option.leftIcon,
        rightIcons: option.rightIcons,
        rightIcon: option.rightIcon,
        shortcut: option.shortcut,
        size:size,
        showCheckbox: showCheckbox,
        onClick: () => handleClick(option),
        onCheckboxChange: () => handleCheckboxChange(option),
        isSelected:option.isSelected || false,
      })),
    [filteredOptions, handleClick, handleCheckboxChange, size, showCheckbox],
  );

  const renderOptionsData = React.useMemo((): CollectionData<ListItemProps> => ({
    itemKey: 'key',
    Component: ListItem,
    items: renderOptions,
  }), [renderOptions])

  const selectedCount = useMemo((): number => {
    return options?.filter(opt => opt.isSelected).length || 0;
  }, [options]);

  return (
    <div className={
      clsx(
        styles.list,
        sizeClasses,
        className
      )
    }>
      <When condition={showSearch}>
        <div className={styles.searchWrapper}>
          <InputText
            value={searchValue}
            onChange={handleSearchChange}
            placeholder={placeholder}
            integrated
            rightIcon="IconSearch"
            noBorder
            size={size}
          />
        </div>
      </When>
      <div ref={itemsContainerRef} className={styles.itemsContainer}>
        <Stack orientation="vertical">
          <Choose>
            <ChooseWhen condition={!renderOptions.length}>
              <Typography className={clsx(styles.placeholder, sizeClasses)}>
                {emptyMessage}
              </Typography>
            </ChooseWhen>
            <Otherwise>
              <Collection data={renderOptionsData} />
              {sentinelRef && (
                <div ref={sentinelRef} style={{ height: '1px', width: '100%' }} />
              )}
            </Otherwise>
          </Choose>
        </Stack>
      </div>
      <When condition={showCheckbox}>
        <div className={styles.footer}>
          <Typography>Выбрано: {selectedCount}</Typography>
        </div>
      </When>
    </div>
  );
};

export default List;
