import type { ToolbarElement } from '@ui/Toolbar';
import type { TreeNode } from '@ui/DataTreeTable';
import type { InviteData } from '@/modules/invites/model/entities/types';
import React from 'react';
import InviteCreateFormIcon from '@/modules/invites/view/components/InviteCreateFormIcon';

export const getInviteToolbarItems = (handlers: {
  selectedRows?: TreeNode<InviteData>[];
  onCreate?: () => void;
  onRevoke?: (selectedRows: TreeNode<InviteData>[]) => void;
  formState?: {
    email: string;
  };
  onFormEmailChange?: (value: string) => void;
  onFormCancel?: () => void;
}): ToolbarElement[] => {
  const items: ToolbarElement[] = [];

  items.push({
    id: 'create',
    component: (
      <InviteCreateFormIcon
        email={handlers.formState.email}
        onEmailChange={handlers.onFormEmailChange}
        onSubmit={handlers.onCreate}
        onCancel={handlers.onFormCancel}
      />
    ),
    align: 'left',
  });

  items.push({
    id: 'revoke',
    icon: 'IconDelete',
    onClick: () => handlers.onRevoke?.(handlers.selectedRows),
    tooltip: 'Отозвать',
    align: 'left',
  });

  return items;
};
