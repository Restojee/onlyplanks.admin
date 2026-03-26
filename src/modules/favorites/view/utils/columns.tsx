import React from 'react';
import type { DataTreeColumnDef } from '@ui/DataTreeTable';
import { editable, selectable, DefaultEditor } from '@ui/DataTreeTable';
import { Row } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import type { Favorite } from '@common/api/favorites/models';
import { UserSelect } from '@common/components/UserSelect';
import { LevelSelect } from '@common/components/LevelSelect';

export const getFavoritesColumns = (): DataTreeColumnDef<Favorite>[] => ([
  {
    id: 'level',
    header: 'Уровень',
    accessorFn: (row) => row.data.level?.name,
    enableSorting: true,
    integrate: selectable(LevelSelect),
    size: 0.25,
  },
  {
    id: 'user',
    header: 'Пользователь',
    accessorFn: (row) => row.data.user?.username,
    enableSorting: true,
    integrate: selectable(UserSelect),
    size: 0.2,
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
