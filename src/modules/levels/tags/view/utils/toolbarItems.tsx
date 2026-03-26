import React from 'react';
import { ToolbarElement } from '@ui/Toolbar';
import type { TreeNode } from '@ui/DataTreeTable';
import type { TagData } from '@/modules/levels/common/types';

interface LevelTagsToolbarItemsParams {
  selectedRows?: TreeNode<TagData>[];
  onAttach?: (selectedRows: TreeNode<TagData>[]) => void;
  onDetach?: (selectedRows: TreeNode<TagData>[]) => void;
  onClose?: () => void;
}

export const getLevelTagsToolbarItems = (params: LevelTagsToolbarItemsParams): ToolbarElement[] => {
  const {
    selectedRows = [],
    onAttach,
    onDetach,
    onClose,
  } = params;

  const items: ToolbarElement[] = [];

  items.push({
    id: 'attach',
    icon: 'IconAdd',
    onClick: () => onAttach?.(selectedRows),
    tooltip: 'Прикрепить выбранные теги',
    align: 'left',
  });

  items.push({
    id: 'detach',
    icon: 'IconDelete',
    onClick: () => onDetach?.(selectedRows),
    tooltip: 'Открепить выбранные теги',
    align: 'left',
  });

  items.push({
    id: 'divider-1',
    type: 'divider',
    align: 'left',
  });

  return items;
};
