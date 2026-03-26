import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import type { TreeNode } from '@ui/DataTreeTable';
import { Row } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import type { UserAuditLogData } from '@/modules/userAuditLogs/model/entities/types';

export const getUserAuditLogColumns = (): ColumnDef<TreeNode<UserAuditLogData>>[] => ([
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
    id: 'action',
    header: 'Action',
    accessorFn: (row) => row.data.action,
    enableSorting: true,
    size: 0.16,
  },
  {
    id: 'actor',
    header: 'Actor',
    accessorFn: (row) => row.data.actorUserName,
    enableSorting: true,
    size: 0.14,
  },
  {
    id: 'target',
    header: 'Target',
    accessorFn: (row) => row.data.targetUserName,
    enableSorting: true,
    size: 0.14,
  },
  {
    id: 'entity',
    header: 'Entity',
    accessorFn: (row) => `${row.data.entityType}:${row.data.entityId}`,
    enableSorting: true,
    size: 0.14,
  },
  {
    id: 'ip',
    header: 'IP',
    accessorFn: (row) => row.data.ip,
    enableSorting: true,
    size: 0.12,
  },
  {
    id: 'metadata',
    header: 'Metadata',
    accessorFn: (row) => row.data.metadataJson,
    enableSorting: true,
    size: 0.18,
  },
]);
