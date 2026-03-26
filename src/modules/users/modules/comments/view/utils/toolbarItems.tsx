import React from 'react';
import { ToolbarElement } from '@ui/Toolbar';
import type { TreeNode } from '@ui/DataTreeTable';
import type { Comment } from '@common/api/comments/models';
import CreateCommentFormIcon from '../components/CreateCommentFormIcon';

interface UserCommentsToolbarItemsParams {
  selectedRows: TreeNode<Comment>[];
  levelId?: number;
  text: string;
  onLevelIdChange: (value: number) => void;
  onTextChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onDelete: (selectedRows: TreeNode<Comment>[]) => void;
}

export const getUserCommentsToolbarItems = (params: UserCommentsToolbarItemsParams): ToolbarElement[] => {
  const {
    selectedRows = [],
    levelId,
    text,
    onLevelIdChange,
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
        levelId={levelId}
        text={text}
        onLevelIdChange={onLevelIdChange}
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
    onClick: () => onDelete(selectedRows),
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
