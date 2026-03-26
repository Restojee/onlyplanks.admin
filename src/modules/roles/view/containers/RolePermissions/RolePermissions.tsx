import React from 'react';
import { Column } from '@ui/Layout';
import type { PolicyInfo } from '@/modules/roles/model/entities/types';
import type RolePermissionsModel from './RolePermissions.model';
import type { PolicyGroup } from './RolePermissions.model';
import { MatrixGroup } from './components/MatrixGroup/MatrixGroup';
import { ToggleGroup } from './components/ToggleGroup/ToggleGroup';

export interface RolePermissionsProps {
  policies: PolicyInfo[];
  onChange?: (policies: PolicyInfo[]) => void;
  disabled?: boolean;
  title?: string;
  viewModel: RolePermissionsModel;
}

const RolePermissionsView: React.FC<RolePermissionsProps> = ({ viewModel }) => {
  const renderGroup = React.useCallback((group: PolicyGroup) => (
    group.isMatrix ? (
      <MatrixGroup key={group.label} group={group} viewModel={viewModel} />
    ) : (
      <ToggleGroup key={group.label} group={group} viewModel={viewModel} />
    )
  ), [viewModel]);

  return (
    <Column gap="lg">
      {viewModel.policyGroups.map(renderGroup)}
    </Column>
  );
}

export default RolePermissionsView;
