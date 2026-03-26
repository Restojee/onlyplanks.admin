import React from 'react';
import { Column, Row } from '@ui/Layout';
import { RolesStats } from '@/modules/roles/view/components/RolesStats';
import { RolesList } from '@/modules/roles/view/components/RolesList';
import { Scroll } from '@ui/Scroll';
import type RolesGridModel from './RolesGrid.model';
import styles from './RolesGrid.module.scss';

export interface RolesGridProps {
  viewModel: RolesGridModel;
}

const RolesGridView: React.FC<RolesGridProps> = ({ viewModel }) => {
  return (
    <Scroll className={styles.container}>
      <Column minWidth={1000} gap="xl" pa="lg">
        <Row width={1} justify="around" align="center">
          <RolesStats
            totalRoles={viewModel.totalRoles}
            totalUsers={viewModel.totalUsers}
            activeModules={viewModel.activeModules}
            selectedCount={viewModel.selectedRole ? 1 : 0}
          />
        </Row>

        <RolesList
          roles={viewModel.roles}
          selectedRoleId={viewModel.selectedRole?.id}
          onRoleClick={(role) => viewModel.handleSelectRole(role)}
          onRoleEdit={(role) => viewModel.handleEditRole(role)}
          onRoleDelete={(role) => viewModel.handleDeleteRole(role)}
          onRoleAssign={(role) => viewModel.handleOpenAssignModal(role)}
          onCreateRole={() => viewModel.handleCreateRole()}
        />
      </Column>
    </Scroll>
  );
};

export default RolesGridView;
