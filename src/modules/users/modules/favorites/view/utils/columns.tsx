import { ColumnDef } from '@tanstack/react-table';
import { TreeNode } from '@ui/DataTreeTable';
import { Favorite } from '@common/api/favorites/models';

export const getUserFavoritesColumns = (): ColumnDef<TreeNode<Favorite>>[] => ([
  {
    id: 'description',
    accessorFn: row => row.data.level.name,
    header: 'Уровень',
    enableSorting: true,
    size: 0.6,
  },
  {
    id: 'createdAt',
    accessorFn: row => row.data.createdUtcDate,
    header: 'Создано',
    enableSorting: true,
    size: 0.4,
  },
]);
