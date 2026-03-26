import { DataTreeColumnDef, TreeNode, editable, DefaultEditor } from '@ui/DataTreeTable';
import { TipData } from '@/modules/tips/model/entities';
import { ToolbarElement } from '@ui/Toolbar';
import { IconWithInputText } from '@ui/IconWithInputText';
import React from 'react';
import TipCreateFormIcon from '@/modules/tips/view/components/TipCreateFormIcon';

export const getTipColumns = (): DataTreeColumnDef<TipData>[] => ([
  {
    id: 'title',
    accessorFn: (row) => row.data.title,
    header: 'Заголовок',
    size: 0.3,
    enableSorting: true,
    integrate: editable(DefaultEditor),
  },
  {
    id: 'text',
    accessorFn: (row) => row.data.text,
    header: 'Текст',
    size: 0.7,
    enableSorting: true,
    integrate: editable(DefaultEditor),
  },
  {
    id: 'createdUtcDate',
    accessorFn: (row) => row.data.createdUtcDate,
    header: 'Добавлена',
    size: 0.1,
    enableSorting: true,
  },
  {
    id: 'username',
    accessorFn: (row) => row.data.user.username,
    header: 'Автор',
    size: 0.1,
    enableSorting: true,
  },
])

export const createTipsToolbarItems = (handlers: {
  onAdd?: () => void;
  onEdit?: (selectedRows: TreeNode<TipData>[]) => void;
  onDelete?: (selectedRows: TreeNode<TipData>[]) => void;
  onSearch?: (query: string) => void;
  selectedRows?: TreeNode<TipData>[];
  formState?: {
    title: string;
    text: string;
  };
  onFormTitleChange?: (value: string) => void;
  onFormTextChange?: (value: string) => void;
  onFormCancel?: () => void;
}): ToolbarElement[] => {
  const items: ToolbarElement[] = [];
  items.push({
    id: 'add',
    component: (
      <TipCreateFormIcon
        title={handlers.formState.title}
        text={handlers.formState.text}
        onTitleChange={handlers.onFormTitleChange}
        onTextChange={handlers.onFormTextChange}
        onSubmit={handlers.onAdd}
        onCancel={handlers.onFormCancel}
      />
    ),
    align: 'left'
  })

  items.push({
    id: 'edit',
    icon: 'IconEdit',
    onClick: () => handlers.onEdit?.(handlers.selectedRows),
    tooltip: 'Редактировать',
    align: 'left',
  });

  
  items.push({
    id: 'delete',
    icon: 'IconDelete',
    onClick: () => handlers.onDelete?.(handlers.selectedRows),
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
        tooltip="Поиск"
        onSubmit={handlers.onSearch}
        debounceDelay={1000}
      />
    ),
    align: 'right',
  });

  return items;
};
