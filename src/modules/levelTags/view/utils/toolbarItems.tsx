import React from 'react';
import { ToolbarElement } from '@ui/Toolbar';
import { IconWithInputText } from '@common/components/IconWithInputText';
import type { TreeNode } from '@ui/DataTreeTable';
import { ButtonDropDown } from '@common/components/ButtonDropDown';
import { Column, Row } from '@ui/Layout';
import { Select } from '@common/components/Combobox/Select';
import { LevelSelect } from '@common/components/LevelSelect';
import { UserSelect } from '@common/components/UserSelect';
import { Button } from '@common/components/Button';
import { Typography } from '@ui/Typography';
import type { ListItemOptions } from '@ui/Select/common/types';
import type { LevelTagBindingData } from '@/modules/levelTags/model/entities/types';

export type LevelTagCreateFormState = {
  tagId?: number;
  levelId?: number;
  userId?: number;
};

export const getLevelTagsToolbarItems = (params: {
  searchQuery?: string;
  onSearch?: (query: string) => void;
  selectedRows?: TreeNode<LevelTagBindingData>[];
  onCreate?: () => void;
  onDelete?: (rows: TreeNode<LevelTagBindingData>[]) => void;
  formState?: LevelTagCreateFormState;
  tagOptions: ListItemOptions[];
  onFormTagChange?: (option: ListItemOptions) => void;
  onFormLevelChange?: (levelId: number) => void;
  onFormUserChange?: (userId: number) => void;
  onFormCancel?: () => void;
}): ToolbarElement[] => {
  const items: ToolbarElement[] = [];

  items.push({
    id: 'add',
    component: (
      <ButtonDropDown icon="IconAdd" tooltip="Добавить привязку" buttonSize="md">
        <Column pa="md" gap="md">
          <Row>
            <Typography size="sm" fontWeight="bold">
              Форма добавления привязки
            </Typography>
          </Row>

          <Select
            options={params.tagOptions}
            value={params.formState?.tagId}
            onChange={params.onFormTagChange}
            placeholder="Тег"
            size="sm"
          />

          <LevelSelect
            value={params.formState?.levelId}
            onChange={params.onFormLevelChange}
            placeholder="Карта"
            size="sm"
          />

          <UserSelect
            value={params.formState?.userId}
            onChange={params.onFormUserChange}
            placeholder="Пользователь"
            size="sm"
          />

          <Row gap="sm">
            <Button size="sm" onClick={params.onCreate}>
              Добавить
            </Button>
            <Button size="sm" onClick={params.onFormCancel}>
              Отмена
            </Button>
          </Row>
        </Column>
      </ButtonDropDown>
    ),
    align: 'left',
  });

  items.push({
    id: 'delete',
    icon: 'IconDelete',
    onClick: () => params.onDelete?.(params.selectedRows || []),
    tooltip: 'Удалить',
    align: 'left',
  });

  items.push({
    id: 'divider-1',
    type: 'divider',
    align: 'left',
  });

  items.push({
    id: 'search',
    component: (
      <IconWithInputText
        icon="IconSearch"
        placeholder="Поиск..."
        size="md"
        value={params.searchQuery}
        tooltip="Поиск"
        onChange={params.onSearch}
        debounceDelay={500}
      />
    ),
    align: 'right',
  });

  return items;
};
