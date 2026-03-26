import { ColumnDef } from '@tanstack/react-table';
import { TreeNode } from '@ui/DataTreeTable';
import { Favorite } from '@common/api/favorites/models';

export const getLevelFavoritesColumns = (): ColumnDef<TreeNode<Favorite>>[] => ([
  {
    id: 'username',
    accessorFn: row => row.data.user.username,
    header: 'Пользователь',
    enableSorting: true,
    size: 0.2,
  },
  {
    id: 'createdAt',
    accessorFn: row => row.data.createdUtcDate,
    header: 'Создано',
    enableSorting: true,
    size: 0.2,
  },
]);
