import React from 'react';
import { ToolbarElement } from '@ui/Toolbar';
import type { TreeNode } from '@ui/DataTreeTable';
import type { Favorite } from '@common/api/favorites/models';
import CreateFavoriteFormIcon from '../components/CreateFavoriteFormIcon';

interface UserFavoritesToolbarItemsParams {
  selectedRows: TreeNode<Favorite>[];
  levelId?: number;
  onLevelIdChange: (value: number) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onDelete: (selectedRows: TreeNode<Favorite>[]) => void;
}

export const getUserFavoritesToolbarItems = (params: UserFavoritesToolbarItemsParams): ToolbarElement[] => {
  const {
    selectedRows = [],
    levelId,
    onLevelIdChange,
    onSubmit,
    onCancel,
    onDelete,
  } = params;

  const items: ToolbarElement[] = [];

  items.push({
    id: 'add',
    component: (
      <CreateFavoriteFormIcon
        levelId={levelId}
        onLevelIdChange={onLevelIdChange}
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
    tooltip: 'Удалить из избранного',
    align: 'left',
  });

  items.push({
    id: 'divider-1',
    type: 'divider',
    align: 'left',
  });

  return items;
};
