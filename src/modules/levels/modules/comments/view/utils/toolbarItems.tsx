import React from 'react';
import { ToolbarElement } from '@ui/Toolbar';
import type { TreeNode } from '@ui/DataTreeTable';
import type { Comment } from '@common/api/comments/models';
import CreateCommentFormIcon from '../components/CreateCommentFormIcon';

interface LevelCommentsToolbarItemsParams {
  selectedRows?: TreeNode<Comment>[];
  userId?: number;
  text: string;
  onUserIdChange: (value: number) => void;
  onTextChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onDelete?: (selectedRows: TreeNode<Comment>[]) => void;
}

export const getLevelCommentsToolbarItems = (params: LevelCommentsToolbarItemsParams): ToolbarElement[] => {
  const {
    selectedRows = [],
    userId,
    text,
    onUserIdChange,
    onTextChange,
    onSubmit,
    onCancel,
    onDelete,
  } = params;

  const items: ToolbarElement[] = [];

  items.push({
    id: 'add',
    component: (
      <CreateCommentFormIcon
        userId={userId}
        text={text}
        onUserIdChange={onUserIdChange}
        onTextChange={onTextChange}
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
    tooltip: 'Удалить комментарии',
    align: 'left',
  });

  items.push({
    id: 'divider-1',
    type: 'divider',
    align: 'left',
  });

  return items;
};
