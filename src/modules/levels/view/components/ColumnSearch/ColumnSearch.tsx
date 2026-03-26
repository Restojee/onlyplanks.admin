import React from 'react';
import { Input } from '@common/components/Input';
import { ButtonIconDropDownMenu } from '@common/components/DropDownButtonList';
import styles from './ColumnSearch.module.scss';
import { AnchorAlign } from '@ui/Popup';

export interface ColumnSearchProps {
  searchText: string;
  selectedColumns: string[];
  columns: Array<{ value: string; label: string }>;
  onSearchTextChange: (text: string) => void;
  onSelectedColumnsChange: (columns: string[]) => void;
  placeholder?: string;
}

export const ColumnSearch: React.FC<ColumnSearchProps> = ({
  searchText,
  selectedColumns,
  columns,
  onSearchTextChange,
  onSelectedColumnsChange,
  placeholder = 'Поиск по полям...',
}) => {
  const handleOptionChange = React.useCallback((option: { value: unknown }) => {
    const value = option.value as string;
    const newValue = selectedColumns.includes(value)
      ? selectedColumns.filter(v => v !== value)
      : [...selectedColumns, value];
    onSelectedColumnsChange(newValue);
  }, [onSelectedColumnsChange, selectedColumns]);

  const columnOptions = columns.map(col => ({
    value: col.value,
    label: col.label,
    isSelected: selectedColumns.includes(col.value),
  }));

  return (
    <div className={styles.container}>
      <Input
        value={searchText}
        onChange={(e) => onSearchTextChange(e.target.value)}
        placeholder={placeholder}
        size="sm"
        leftIcon="IconSearch"
        append={
          <ButtonIconDropDownMenu
            icon="IconAdjustmentsHorizontal"
            options={columnOptions}
            onChange={handleOptionChange}
            tooltip="Выбрать поля для поиска"
            buttonSize="sm"
            menuSize="sm"
            anchorAlign={AnchorAlign.END}
            showCheckbox={true}
            title="Поля для поиска"
          />
        }
      />
    </div>
  );
};

export default ColumnSearch;
