import { DataTreeColumnDef, TreeNode, editable, DefaultEditor } from '@ui/DataTreeTable';
import type { LevelData } from '@/modules/levels/common/types';
import React from 'react';
import { EditableImagePreview } from '@common/components/DataTreeTable/components/EditableImagePreview/EditableImagePreview';
import type { EditableIntegrateComponentProps } from '@common/components/DataTreeTable/integrations';

interface ColumnOptions {
  storageUrl?: string;
}

function getName(row: TreeNode<LevelData>): string {
  return row.data.name;
}

function getDescription(row: TreeNode<LevelData>): string {
  return row.data.description;
}

function getImageUrl(options: ColumnOptions, row: TreeNode<LevelData>): string {
  const name = row.data.image?.name;
  if (!name) {
    return null;
  }

  return options.storageUrl ? `${options.storageUrl}/${name}` : name;
}

function getCreatedUtcDate(row: TreeNode<LevelData>): string {
  return row.data.createdUtcDate;
}

function getUsername(row: TreeNode<LevelData>): string {
  return row.data.user?.username;
}

function LevelImageEditor(props: EditableIntegrateComponentProps<LevelData>) {
  const { value, onSave } = props;

  const handleSave = React.useCallback(function handleSave(file: File): void {
    onSave?.(file);
  }, [onSave]);

  return (
    <EditableImagePreview
      value={String(value)}
      onSave={handleSave}
      onlyPreview
    />
  );
}

export const getLevelColumns = (options: ColumnOptions): DataTreeColumnDef<LevelData>[] => {
  return [
    {
      id: 'name',
      accessorFn: getName,
      header: 'Название',
      size: 0.1,
      enableSorting: true,
      integrate: editable(DefaultEditor),
    },
    {
      id: 'description',
      accessorFn: getDescription,
      header: 'Описание',
      size: 0.5,
      enableSorting: true,
      integrate: editable(DefaultEditor),
    },
    {
      id: 'image',
      accessorFn: (row) => getImageUrl(options, row),
      header: 'Картинка',
      size: 0.2,
      enableSorting: true,
      integrate: editable(LevelImageEditor),
    },
    {
      id: 'createdUtcDate',
      accessorFn: getCreatedUtcDate,
      header: 'Добавлена',
      size: 0.1,
      enableSorting: true,
    },
    {
      id: 'username',
      accessorFn: getUsername,
      header: 'Автор',
      size: 0.15,
      enableSorting: true,
    },
  ];
};
