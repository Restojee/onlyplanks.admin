import React from 'react';
import { DataTreeColumnDef, TreeNode, editable, DefaultEditor } from '@ui/DataTreeTable';
import { Completed } from '@common/api/completed/models';
import { EditableImagePreview } from '@common/components/DataTreeTable/components/EditableImagePreview';

interface ColumnOptions {
  storageUrl?: string;
}

export const getUserCompletedColumns = (options: ColumnOptions): DataTreeColumnDef<Completed>[] => ([
  {
    id: 'username',
    accessorFn: row => row.data.level.name,
    header: 'Уровень',
    size: 0.2,
  },
  {
    id: 'image',
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
            if (onCellEdit) {
              onCellEdit(row.original.id, 'image', file, row.original.data);
            }
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
