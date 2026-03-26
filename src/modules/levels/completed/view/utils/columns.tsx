import React from 'react';
import { DataTreeColumnDef, TreeNode, editable, DefaultEditor } from '@ui/DataTreeTable';
import { Completed } from '@common/api/completed/models';
import { Preview } from '@ui/Preview';
import { EditableImagePreview } from '@common/components/DataTreeTable/components/EditableImagePreview';

export interface ColumnOptions {
  storageUrl?: string;
}
export const getLevelCompletedColumns = (options: ColumnOptions): DataTreeColumnDef<Completed>[] => ([
  {
    id: 'username',
    accessorFn: row => row.data.user.username,
    header: 'Пользователь',
    size: 0.2,
  },
  {
    id: 'image',
    accessorFn: row => row.data.image?.name,
    header: 'Изображение',
    size: 0.3,
    cell: ({ row, table }) => {
      const imageName = row.original.data.image?.name;
      const imageUrl = imageName ? `${options.storageUrl}/${imageName}` : null;

      return (
        <EditableImagePreview
          value={imageUrl}
          onSave={(file) => {
            const onCellEdit = (table.options as any).meta?.onCellEdit;
            onCellEdit(row.original.id, 'image', file, row.original.data);
          }}
        />
      );
    },
  },
  {
    id: 'description',
    accessorFn: row => row.data.description,
    header: 'Описание',
    size: 0.3,
    integrate: editable(DefaultEditor),
  },
  {
    id: 'createdAt',
    accessorFn: row => row.data.createdUtcDate,
    header: 'Создано',
    size: 0.2,
  },
]);
