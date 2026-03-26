import { ColumnDef } from '@tanstack/react-table';
import { TreeNode } from '@ui/DataTreeTable';
import type { TagData } from '@/modules/levels/common/types';
import { Row } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import { Icon } from '@ui/Icon';

export const getLevelTagsColumns = (isTagAttached: (tagId: number) => boolean): ColumnDef<TreeNode<TagData>>[] => ([
  {
    id: 'name',
    accessorFn: (row) => (
      <Row gap="xs">
        <Typography>
          { row.data.name }
        </Typography>
        { isTagAttached(row.data.id) && <Icon icon="IconAttach" />}
      </Row>
    ),
    header: 'Название',
    enableSorting: true,
  },
]);
