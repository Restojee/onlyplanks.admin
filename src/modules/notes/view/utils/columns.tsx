import React from 'react';
import type { DataTreeColumnDef } from '@ui/DataTreeTable';
import { editable, selectable, DefaultEditor } from '@ui/DataTreeTable';
import type { Note } from '@common/api/notes/models';
import { UserSelect } from '@common/components/UserSelect';
import { LevelSelect } from '@common/components/LevelSelect';

export const getNotesColumns = (): DataTreeColumnDef<Note>[] => ([
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
    accessorFn: (row) => row.data.description ?? row.data.text,
    enableSorting: true,
    integrate: editable(DefaultEditor),
    size: 0.35,
  },
  {
    id: 'createdUtcDate',
    header: 'Создано',
    accessorFn: (row) => row.data.createdUtcDate,
    enableSorting: true,
    size: 0.2,
  },
]);
