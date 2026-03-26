import { DataTreeColumnDef, TreeNode, editable, DefaultEditor } from '@ui/DataTreeTable';
import { Comment } from '@common/api/comments/models';

export const getUserCommentsColumns = (): DataTreeColumnDef<Comment>[] => ([
  {
    id: 'text',
    accessorFn: row => row.data.text,
    header: 'Комментарий',
    size: 0.6,
    enableSorting: true,
    integrate: editable(DefaultEditor),
  },
  {
    id: 'createdAt',
    accessorFn: row => row.data.createdUtcDate,
    header: 'Создано',
    enableSorting: true,
    size: 0.4,
  },
]);
