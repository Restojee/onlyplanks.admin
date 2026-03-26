import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import type { TreeNode } from '@ui/DataTreeTable';
import { Row } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import type { UserSessionData } from '@/modules/userSessions/model/entities/types';

export const getUserSessionColumns = (): ColumnDef<TreeNode<UserSessionData>>[] => ([
  {
    id: 'userName',
    header: 'Пользователь',
    accessorFn: (row) => row.data.userName,
    enableSorting: true,
    size: 0.2,
  },
  {
    id: 'ip',
    header: 'IP',
    accessorFn: (row) => row.data.ip,
    enableSorting: true,
    size: 0.15,
  },
  {
    id: 'device',
    header: 'Устройство',
    accessorFn: (row) => row.data.device,
    enableSorting: true,
    size: 0.15,
  },
  {
    id: 'success',
    header: 'Успех',
    accessorFn: (row) => (row.data.success ? 'Да' : 'Нет'),
    enableSorting: true,
    size: 0.08,
  },
  {
    id: 'failureReason',
    header: 'Причина',
    accessorFn: (row) => row.data.failureReason,
    enableSorting: true,
    size: 0.2,
  },
  {
    id: 'createdUtcDate',
    header: 'Дата',
    accessorFn: (row) => row.data.createdUtcDate,
    cell: (info) => (
      <Row>
        <Typography size="sm">{String(info.getValue())}</Typography>
      </Row>
    ),
    enableSorting: true,
    size: 0.12,
  },
  {
    id: 'userAgent',
    header: 'User-Agent',
    accessorFn: (row) => row.data.userAgent,
    enableSorting: true,
    size: 0.3,
  },
]);
