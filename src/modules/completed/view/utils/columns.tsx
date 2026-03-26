import React from 'react';
import type { DataTreeColumnDef } from '@ui/DataTreeTable';
import { editable, selectable } from '@ui/DataTreeTable';
import { Row } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import type { Completed } from '@common/api/completed/models';
import { DefaultEditor } from '@ui/DataTreeTable';
import { UserSelect } from '@common/components/UserSelect';
import { LevelSelect } from '@common/components/LevelSelect';
import { EditableImagePreview } from '@common/components/DataTreeTable/components/EditableImagePreview/EditableImagePreview';
import type { EditableIntegrateComponentProps } from '@common/components/DataTreeTable/integrations';

interface ColumnOptions {
  storageUrl?: string;
}

const CompletedImageEditor: React.FC<EditableIntegrateComponentProps<Completed>> = ({ value, onSave }) => {
  return (
    <EditableImagePreview
      value={String(value)}
      onSave={(file) => onSave?.(file)}
      onlyPreview
    />
  );
};

export const getCompletedColumns = (options: ColumnOptions): DataTreeColumnDef<Completed>[] => ([
  {
    id: 'level',
    header: 'Уровень',
    accessorFn: (row) => row.data.level?.name,
    enableSorting: true,
    integrate: selectable(LevelSelect),
    size: 0.1,
  },
  {
    id: 'user',
    header: 'Пользователь',
    cell: (info) => (
      <Row>
        <Typography>{info.row.original.data.user?.username}</Typography>
      </Row>
    ),
    enableSorting: true,
    integrate: selectable(UserSelect),
    size: 0.1,
  },
  {
    id: 'image',
    header: 'Изображение',
    accessorFn: row => {
      const name = row.data.image?.name;
      if (!name) {
        return null;
      }

      return options.storageUrl ? `${options.storageUrl}/${name}` : name;
    },
    integrate: editable(CompletedImageEditor),
    size: 0.25,
  },
  {
    id: 'description',
    header: 'Описание',
    accessorFn: (row) => row.data.description,
    enableSorting: true,
    integrate: editable(DefaultEditor),
    size: 0.2,
  },
  {
    id: 'createdUtcDate',
    header: 'Создано',
    accessorFn: (row) => row.data.createdUtcDate,
    enableSorting: true,
    size: 0.2,
  },
]);
