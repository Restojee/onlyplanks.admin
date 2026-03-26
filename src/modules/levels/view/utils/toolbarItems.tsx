import React from 'react';
import { ToolbarElement } from '@common/components/Toolbar';
import { IconWithInputText } from '@common/components/IconWithInputText';
import { ButtonDropDown } from '@common/components/ButtonDropDown';
import type { TreeNode } from '@ui/DataTreeTable';
import LevelCreateForm from '@/modules/levels/view/components/LevelCreateForm';
import type { LevelData } from '@/modules/levels/common/types';
import CreateLevelFormIcon from '@/modules/levels/view/components/CreateLevelFormIcon';

interface LevelToolbarItemsParams {
  selectedRows?: TreeNode<LevelData>[];
  onAdd?: () => void;
  onEdit?: (selectedRows: TreeNode<LevelData>[]) => void;
  onDelete?: (selectedRows: TreeNode<LevelData>[]) => void;
  onManageTags?: (selectedRows: TreeNode<LevelData>[]) => void;
  onSearch?: (query: string) => void;
  formState?: {
    name: string;
    description: string;
  };
  searchQuery?: string;
  onFormNameChange?: (value: string) => void;
  onFormDescriptionChange?: (value: string) => void;
  onFormCancel?: () => void;
}

export const getLevelToolbarItems = (params: LevelToolbarItemsParams): ToolbarElement[] => {
  const {
    selectedRows,
    onAdd,
    onEdit,
    onDelete,
    onManageTags,
    onSearch,
    formState,
    onFormNameChange,
    onFormDescriptionChange,
    onFormCancel,
    searchQuery,
  } = params;

  const handleEdit = (): void => {
    onEdit?.(selectedRows);
  }

  const handleDelete = (): void => {
    onDelete?.(selectedRows);
  }

  const items: ToolbarElement[] = [];

  items.push({
    id: 'add',
    component: (
      <CreateLevelFormIcon
        name={formState.name}
        description={formState.description}
        onNameChange={onFormNameChange}
        onDescriptionChange={onFormDescriptionChange}
        onSubmit={onAdd}
        onCancel={onFormCancel}
      />
    ),
    align: 'left',
  });

  
  items.push({
    id: 'edit',
    icon: 'IconEdit',
    onClick: handleEdit,
    tooltip: 'Редактировать',
    align: 'left',
  });

  
  items.push({
    id: 'delete',
    icon: 'IconDelete',
    onClick: handleDelete,
    tooltip: 'Удалить',
    align: 'left',
  });

  items.push({
    id: 'divider-2',
    type: 'divider',
    align: 'left',
  });

  if (onSearch) {
    items.push({
      id: 'search',
      component: (
        <IconWithInputText
          icon="IconSearch"
          placeholder="Поиск по имени..."
          size="md"
          value={searchQuery}
          tooltip="Поиск по имени"
          onChange={onSearch}
          debounceDelay={1000}
        />
      ),
      align: 'right',
    });
  }

  return items;
};
