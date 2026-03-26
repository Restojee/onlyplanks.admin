import React from 'react';
import { ToolbarElement } from '@ui/Toolbar';
import { IconWithInputText } from '@ui/IconWithInputText';
import {DataTreeColumnDef, TreeNode, editable, DefaultEditor, selectable} from '@ui/DataTreeTable';
import { TagData } from '@/modules/tags/model/entities';
import TagCreateFormIcon from '@/modules/tags/view/components/TagCreateFormIcon';
import { TagSelect } from '@common/components/TagSelect';

export const getTagColumns = (): DataTreeColumnDef<TagData>[] => ([
  {
    id: 'name',
    accessorFn: (row) => row.data.name,
    header: 'Название',
    size: 0.2,
    enableSorting: true,
    integrate: editable(DefaultEditor),
  },
  {
    id: 'parentTagId',
    accessorFn: (row) => row.data.parentTagId,
    header: 'Родитель',
    size: 0.2,
    enableSorting: true,
    integrate: selectable(TagSelect),
    cell: (ctx) => ctx.row.original.data.parentTag?.name,
  },
  {
    id: 'description',
    accessorFn: (row) => row.data.description,
    header: 'Описание',
    size: 0.6,
    enableSorting: true,
    integrate: editable(DefaultEditor),
  },
])



 
export const createTagsToolbarItems = (handlers: {
  onAdd?: () => void;
  onEdit?: (selectedRows: TreeNode<TagData>[]) => void;
  onDelete?: (selectedRows: TreeNode<TagData>[]) => void;
  onManageLevels?: (selectedRows: TreeNode<TagData>[]) => void;
  onSearch?: (query: string) => void;
  selectedRows?: TreeNode<TagData>[];
  formState?: {
    name: string;
    description: string;
    parentTagId?: number;
  };
  onFormNameChange?: (value: string) => void;
  onFormDescriptionChange?: (value: string) => void;
  onFormParentChange?: (value?: number) => void;
  onFormCancel?: () => void;
}): ToolbarElement[] => {
  const items: ToolbarElement[] = [];
  
  items.push({
    id: 'add',
    component: (
      <TagCreateFormIcon
        name={handlers.formState.name}
        description={handlers.formState.description}
        parentTagId={handlers.formState.parentTagId}
        onNameChange={handlers.onFormNameChange}
        onDescriptionChange={handlers.onFormDescriptionChange}
        onParentChange={handlers.onFormParentChange}
        onSubmit={handlers.onAdd}
        onCancel={handlers.onFormCancel}
      />
    ),
    align: 'left'
  })

  items.push({
    id: 'edit',
    icon: 'IconEdit',
    onClick: () => handlers.onEdit?.(handlers.selectedRows || []),
    tooltip: 'Редактировать',
    align: 'left',
  });

  items.push({
    id: 'delete',
    icon: 'IconDelete',
    onClick: () => handlers.onDelete?.(handlers.selectedRows || []),
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


