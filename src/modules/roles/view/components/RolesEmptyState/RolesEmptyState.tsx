import React from 'react';
import { Column } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import { Button } from '@ui/Button';
import { Icon } from '@ui/Icon';

export interface RolesEmptyStateProps {
  onCreateRole: () => void;
}

export const RolesEmptyState: React.FC<RolesEmptyStateProps> = ({ onCreateRole }) => {
  return (
    <Column align="center" justify="center" gap="lg" pa="xl" height={1}>
      <Icon icon="IconUserGroup" size="xl" />
      <Column align="center" gap="sm">
        <Typography size="lg" fontWeight="semiBold">
          Роли не найдены
        </Typography>
        <Typography size="sm">
          Создайте первую роль для управления доступом
        </Typography>
      </Column>
    </Column>
  );
};

export default RolesEmptyState;
