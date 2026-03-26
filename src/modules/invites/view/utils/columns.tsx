import type { ColumnDef } from '@tanstack/react-table';
import type { TreeNode } from '@ui/DataTreeTable';
import type { InviteData } from '@/modules/invites/model/entities/types';

export const getInviteColumns = (): ColumnDef<TreeNode<InviteData>>[] => ([
  {
    id: 'token',
    header: 'Токен',
    accessorFn: (row) => row.data.token,
    enableSorting: true,
    size: 0.2,
  },
  {
    id: 'email',
    header: 'Email',
    accessorFn: (row) => row.data.email,
    enableSorting: true,
    size: 0.25,
  },
  {
    id: 'isUsed',
    header: 'Использован',
    accessorFn: (row) => (row.data.isUsed ? 'Да' : 'Нет'),
    enableSorting: true,
    size: 0.1,
  },
  {
    id: 'createdByUser',
    header: 'Создатель',
    accessorFn: (row) => row.data.createdByUser?.username ,
    enableSorting: true,
    size: 0.15,
  },
  {
    id: 'registeredUser',
    header: 'Зарегистрировался',
    accessorFn: (row) => row.data.registeredUser?.username ,
    enableSorting: true,
    size: 0.15,
  },
  {
    id: 'expirationDate',
    header: 'Истекает',
    accessorFn: (row) => row.data.expirationDate,
    enableSorting: true,
    size: 0.15,
  },
]);
