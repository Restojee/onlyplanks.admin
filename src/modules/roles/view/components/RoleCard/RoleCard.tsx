import React from 'react';
import clsx from 'clsx';
import { Paper, Column, Row } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import { Button } from '@ui/Button';
import type { RoleData } from '@/modules/roles/model/entities/types';
import { TextTags } from '@common/constants/textTags';
import type RoleCardModel from './RoleCard.model';
import styles from './RoleCard.module.scss';

export interface RoleCardProps {
  role: RoleData;
  isSelected?: boolean;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onAssign?: () => void;
  viewModel: RoleCardModel;
}

const RoleCardView: React.FC<RoleCardProps> = ({ viewModel }) => {
  return (
    <Paper
      className={clsx(styles.card, viewModel.isSelected && styles.selected)}
      onClick={viewModel.handleClick}
    >
      <Column gap="md" pa="md">
        <Row justify="between" align="start">
          <Column gap="xs" className={styles.header}>
            <Typography tag={TextTags.H4} fontWeight="semiBold" className={styles.title}>
              {viewModel.role.name}
            </Typography>
            <Typography size="sm">
              {viewModel.role.description || 'Нет описания'}
            </Typography>
          </Column>
        </Row>

        <Row gap="lg" className={styles.stats}>
          <Column gap="xs">
            <Typography size="xs">Пользователей</Typography>
            <Typography fontWeight="bold">{viewModel.role.usersCount || 0}</Typography>
          </Column>

          <Column gap="xs">
            <Typography size="xs">Права доступа</Typography>
            <Typography size="sm">
              {viewModel.getPermissionSummary(viewModel.role.policies)}
            </Typography>
          </Column>
        </Row>

        <Row gap="sm" className={styles.actions}>
          <Button
            variant="secondary"
            size="sm"
            icon="IconEdit"
            onClick={viewModel.handleEdit}
          >
            Изменить
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon="IconInvite"
            onClick={viewModel.handleAssign}
          >
            Назначить
          </Button>

          <Button
            variant="danger"
            size="sm"
            icon="IconDelete"
            onClick={viewModel.handleDelete}
          />
        </Row>
      </Column>
    </Paper>
  );
};

export default RoleCardView;
