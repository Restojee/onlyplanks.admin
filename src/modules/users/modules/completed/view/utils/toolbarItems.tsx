import React from 'react';
import { ToolbarElement } from '@ui/Toolbar';
import type { TreeNode } from '@ui/DataTreeTable';
import type { Completed } from '@common/api/completed/models';
import CreateCompletedFormIcon from '../components/CreateCompletedFormIcon';

interface UserCompletedToolbarItemsParams {
  selectedRows?: TreeNode<Completed>[];
  levelId?: number;
  description: string;
  image: File ;
  onLevelIdChange: (value: number) => void;
  onDescriptionChange: (value: string) => void;
  onImageChange: (value: File ) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onDelete?: (selectedRows: TreeNode<Completed>[]) => void;
}

export const getUserCompletedToolbarItems = (params: UserCompletedToolbarItemsParams): ToolbarElement[] => {
  const {
    selectedRows = [],
    levelId,
    description,
    image,
    onLevelIdChange,
    onDescriptionChange,
    onImageChange,
    onSubmit,
    onCancel,
    onDelete,
  } = params;

  const items: ToolbarElement[] = [];

  items.push({
    id: 'add',
    component: (
      <CreateCompletedFormIcon
        levelId={levelId}
        description={description}
        image={image}
        onLevelIdChange={onLevelIdChange}
        onDescriptionChange={onDescriptionChange}
        onImageChange={onImageChange}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    ),
    align: 'left',
  });

  items.push({
    id: 'delete',
    icon: 'IconDelete',
    onClick: () => onDelete(selectedRows),
    tooltip: 'Удалить',
    align: 'left',
  });

  items.push({
    id: 'divider-1',
    type: 'divider',
    align: 'left',
  });

  return items;
};
