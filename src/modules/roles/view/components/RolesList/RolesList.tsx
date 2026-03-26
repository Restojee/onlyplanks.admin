import React from 'react';
import { Grid, Paper, Column, Row } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import { RoleCard } from '@/modules/roles/view/components/RoleCard';
import { RolesEmptyState } from '@/modules/roles/view/components/RolesEmptyState';
import { TextTags } from '@common/constants/textTags';
import type { RoleData } from '@/modules/roles/model/entities/types';
import styles from './RolesList.module.scss';
import { Button } from '@ui/Button';

export interface RolesListProps {
  roles: RoleData[];
  selectedRoleId?: number;
  onRoleClick: (role: RoleData) => void;
  onRoleEdit: (role: RoleData) => void;
  onRoleDelete: (role: RoleData) => void;
  onRoleAssign: (role: RoleData) => void;
  onCreateRole: () => void;
}

export const RolesList: React.FC<RolesListProps> = ({
  roles,
  selectedRoleId,
  onRoleClick,
  onRoleEdit,
  onRoleDelete,
  onRoleAssign,
  onCreateRole,
}) => {
  return (
    <Paper className={styles.container} width={1}>
      <Column gap="lg">
        <Row align="center" width={1} justify="around">
          <Typography tag={TextTags.H3} fontWeight="semiBold">
            Роли системы
          </Typography>

          <Button
            variant="primary"
            icon="IconAdd"
            onClick={() => onCreateRole()}
          >
            Создать роль
          </Button>
        </Row>
        
        {roles.length > 0 ? (
          <Grid columns="3" gap="md">
            {roles.map(role => (
              <RoleCard
                key={role.id}
                role={role}
                isSelected={selectedRoleId === role.id}
                onClick={() => onRoleClick(role)}
                onEdit={() => onRoleEdit(role)}
                onDelete={() => onRoleDelete(role)}
                onAssign={() => onRoleAssign(role)}
              />
            ))}
          </Grid>
        ) : (
          <RolesEmptyState onCreateRole={onCreateRole} />
        )}
      </Column>
    </Paper>
  );
};

export default RolesList;
