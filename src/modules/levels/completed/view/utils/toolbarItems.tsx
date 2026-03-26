import React from 'react';
import { ToolbarElement } from '@ui/Toolbar';
import type { TreeNode } from '@ui/DataTreeTable';
import type { Completed } from '@common/api/completed/models';
import CreateCompletedFormIcon from '../components/CreateCompletedFormIcon';

interface LevelCompletedToolbarItemsParams {
  selectedRows?: TreeNode<Completed>[];
  userId?: number;
  description: string;
  image: File ;
  onUserIdChange: (value: number) => void;
  onDescriptionChange: (value: string) => void;
  onImageChange: (value: File ) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onDelete?: (selectedRows: TreeNode<Completed>[]) => void;
  storageUrl?: string;
}

export const getLevelCompletedToolbarItems = (params: LevelCompletedToolbarItemsParams): ToolbarElement[] => {
  const {
    selectedRows = [],
    userId,
    description,
    image,
    onUserIdChange,
    onDescriptionChange,
    onImageChange,
    onSubmit,
    onCancel,
    onDelete,
    storageUrl,
  } = params;

  const items: ToolbarElement[] = [];

  items.push({
    id: 'add',
    component: (
      <CreateCompletedFormIcon
        userId={userId}
        description={description}
        image={image}
        onUserIdChange={onUserIdChange}
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
    onClick: () => onDelete?.(selectedRows),
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
