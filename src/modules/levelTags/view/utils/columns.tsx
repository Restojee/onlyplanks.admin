import React from 'react';
import type { TreeNode, DataTreeColumnDef } from '@ui/DataTreeTable';
import { Row } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import type { LevelTagBindingData } from '@/modules/levelTags/model/entities/types';
import { editable, selectable, DefaultEditor } from '@ui/DataTreeTable';
import { UserSelect } from '@common/components/UserSelect';
import { LevelSelect } from '@common/components/LevelSelect';

export const getLevelTagColumns = (): DataTreeColumnDef<LevelTagBindingData>[] => ([
  {
    id: 'tag',
    header: 'Тег',
    accessorFn: (row) => row.data.tag?.name,
    enableSorting: true,
    size: 0.33,
    integrate: editable(DefaultEditor),
  },
  {
    id: 'level',
    header: 'Карта',
    accessorFn: (row) => row.data.level?.id,
    cell: (info) => (
      <Row>
        <Typography>{info.row.original.data.level?.name}</Typography>
      </Row>
    ),
    enableSorting: true,
    integrate: selectable(LevelSelect),
    size: 0.33,
  },
  {
    id: 'user',
    header: 'Привязал',
    accessorFn: (row) => row.data.user?.id,
    cell: (info) => (
      <Row>
        <Typography>{info.row.original.data.user?.username}</Typography>
      </Row>
    ),
    enableSorting: true,
    integrate: selectable(UserSelect),
    size: 0.2,
  },
  {
    id: 'createdUtcDate',
    header: 'Создана',
    accessorFn: (row) => row.data.createdUtcDate,
    cell: (info) => (
      <Row>
        <Typography>{info.row.original.data.createdUtcDate}</Typography>
      </Row>
    ),
    enableSorting: true,
    size: 0.14,
  },
]);
