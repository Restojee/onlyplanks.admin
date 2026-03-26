import React from 'react';
import { ButtonIconDropDownMenu } from '@common/components/DropDownButtonList';
import styles from './SelectLevelUser.module.scss';
import { AnchorAlign } from '@ui/Popup';
import { UserSelect } from '@ui/UserSelect';

export type UserSearchType = 'completed' | 'comments' | 'favorites' | 'author';

export interface SelectLevelUserProps {
  selectedUserId?: number;
  selectedSearchTypes: UserSearchType[];
  onUserChange: (userId: number) => void;
  onSearchTypesChange: (types: UserSearchType[]) => void;
}

const searchTypeOptions = [
  { value: 'completed', label: 'Выполненные' },
  { value: 'comments', label: 'Комментарии' },
  { value: 'favorites', label: 'Избранное' },
  { value: 'author', label: 'Авторство' },
];

export const SelectLevelUser: React.FC<SelectLevelUserProps> = ({
  selectedUserId,
  selectedSearchTypes,
  onUserChange,
  onSearchTypesChange,
}) => {
  const searchTypeOptionsWithSelection = searchTypeOptions.map(opt => ({
    ...opt,
    isSelected: selectedSearchTypes.includes(opt.value as UserSearchType),
  }));

  return (
    <div className={styles.container}>
      <UserSelect
        value={selectedUserId}
        onChange={onUserChange}
        size="sm"
        leftIcon="IconUser"
        append={
          <ButtonIconDropDownMenu
            icon="IconAdjustmentsHorizontal"
            options={searchTypeOptionsWithSelection}
            onChange={(option) => {
              const newValue = selectedSearchTypes.includes(option.value as UserSearchType)
                ? selectedSearchTypes.filter(v => v !== option.value)
                : [...selectedSearchTypes, option.value as UserSearchType];
              onSearchTypesChange(newValue);
            }}
            tooltip="Выбрать типы поиска"
            buttonSize="sm"
            menuSize="sm"
            anchorAlign={AnchorAlign.END}
            showCheckbox={true}
            title="Типы поиска по пользователю"
          />
        }
      />
    </div>
  );
};

export default SelectLevelUser;
