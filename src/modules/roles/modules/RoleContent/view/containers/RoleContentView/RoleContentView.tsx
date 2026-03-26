import React from 'react';
import { Column, Row } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import { Button } from '@ui/Button';
import { RolePermissions } from '@/modules/roles/view/containers/RolePermissions';
import type { RoleData } from '@/modules/roles/model/entities/types';
import RoleContentViewModel from './RoleContentView.model';
import { withView } from '@common/hocs/withView';
import { WithViewProps } from '@common/hocs/withView/types';
import styles from './RoleContentView.module.scss';

export interface RoleContentViewProps {
  role: RoleData;
}

const RoleContentView: React.FC<WithViewProps<RoleContentViewModel, RoleContentViewProps>> = ({ viewModel }) => {
  return (
    <Column nonIntegration gap="lg" pa="md" height={1}>
      <Column gap="sm" className={styles.header}>
        <Typography size="lg" fontWeight="semiBold" className={styles.title}>
          {viewModel.role.name}
        </Typography>
        <Typography className={styles.description}>
          {viewModel.role.description || 'Нет описания'}
        </Typography>
      </Column>

      <Row gap="lg" className={styles.statsRow}>
        <Column gap="xs" className={styles.statItem}>
          <Typography className={styles.statLabel}>Пользователей</Typography>
          <Typography size="lg"  fontWeight="bold" className={styles.statValue}>
            {viewModel.role.usersCount || 0}
          </Typography>
        </Column>

        <Column gap="xs" className={styles.statItem}>
          <Typography className={styles.statLabel}>Создана</Typography>
          <Typography size="lg" fontWeight="semiBold" className={styles.statValueSecondary}>
            {new Date(viewModel.role.createdUtcDate).toLocaleDateString()}
          </Typography>
        </Column>
      </Row>

      <Column gap="md" className={styles.permissionsContainer}>
        <RolePermissions
          title="Права доступа"
          policies={viewModel.policies}
          onChange={viewModel.handlePoliciesChange}
          disabled={false}
        />
      </Column>

      <Row gap="sm" justify="end" className={styles.actions}>
        <Button variant="secondary" onClick={viewModel.handleCancel}>
          Отмена
        </Button>
        <Button
          variant="primary"
          onClick={viewModel.handleSave}
          disabled={!viewModel.hasChanges}
        >
          Сохранить изменения
        </Button>
      </Row>
    </Column>
  );
};

export default withView(RoleContentView, RoleContentViewModel);
