import React from 'react';
import { DataTreeColumnDef, TreeNode, editable, DefaultEditor } from '@ui/DataTreeTable';
import { UserData } from '@/modules/users/model/entities';
import { ToolbarElement } from '@ui/Toolbar';
import UserCreateFormIcon from '@/modules/users/view/components/UserCreateFormIcon';
import { Typography } from '@ui/Typography';
import { Row } from '@ui/Layout';
import { EditableImagePreview } from '@common/components/DataTreeTable/components/EditableImagePreview';
import { Avatar } from '@ui/Avatar';
import { selectable } from '@ui/DataTreeTable';
import { RoleSelect } from '@common/components/RoleSelect';

export const getUserColumns = (options: { storageUrl: string; onAvatarUpdate: (userId: number, file: File) => void }): DataTreeColumnDef<UserData>[] => ([
  {
    id: 'user',
    header: 'Пользователь',
    size: 0.4,
    enableSorting: true,
    accessorFn: (row) => row.data.username,
    cell: (ctx) => (
      <Row gap="sm" align="center">
        <Avatar />
        <Typography>{ctx.row.original.data.username}</Typography>
      </Row>
    ),
  },
  {
    id: 'roleId',
    accessorFn: (row) => row.data.role?.name,
    header: 'Роль',
    size: 0.15,
    enableSorting: true,
    integrate: selectable(RoleSelect),
  },
  {
    id: 'email',
    accessorFn: (row) => row.data.email,
    header: 'Email',
    size: 0.3,
    enableSorting: true,
    integrate: editable(DefaultEditor),
  },
  {
    id: 'createdUtcDate',
    accessorFn: (row) => row.data.createdUtcDate,
    header: 'Дата создания',
    size: 0.15,
    enableSorting: true,
  },
]);

export const createUsersToolbarItems = (handlers: {
  onAdd?: () => void;
  onEdit?: (selectedRows: TreeNode<UserData>[]) => void;
  onDelete?: (selectedRows: TreeNode<UserData>[]) => void;
  selectedRows?: TreeNode<UserData>[];
  formState?: {
    username: string;
    email: string;
    password: string;
    roleId?: number;
  };
  onFormUsernameChange?: (value: string) => void;
  onFormEmailChange?: (value: string) => void;
  onFormPasswordChange?: (value: string) => void;
  onFormRoleIdChange?: (value: number) => void;
  onFormCancel?: () => void;
}): ToolbarElement[] => {
  const items: ToolbarElement[] = [];

  items.push({
    id: 'add',
    component: (
      <UserCreateFormIcon
        username={handlers.formState?.username || ''}
        email={handlers.formState?.email || ''}
        password={handlers.formState?.password || ''}
        roleId={handlers.formState?.roleId}
        onUsernameChange={handlers.onFormUsernameChange}
        onEmailChange={handlers.onFormEmailChange}
        onPasswordChange={handlers.onFormPasswordChange}
        onRoleIdChange={handlers.onFormRoleIdChange}
        onSubmit={handlers.onAdd}
        onCancel={handlers.onFormCancel}
      />
    ),
    align: 'left'
  });

  items.push({
    id: 'edit',
    icon: 'IconEdit',
    onClick: () => handlers.onEdit?.(handlers.selectedRows),
    tooltip: 'Редактировать',
    align: 'left',
  });

  items.push({
    id: 'delete',
    icon: 'IconDelete',
    onClick: () => handlers.onDelete?.(handlers.selectedRows),
    tooltip: 'Удалить',
    align: 'left',
  });

  return items;
};
