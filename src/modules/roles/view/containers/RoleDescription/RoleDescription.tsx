import React from 'react';
import { Column, Row } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import { Button } from '@ui/Button';
import { RolePermissions } from '@/modules/roles/view/containers/RolePermissions';
import type { RoleData } from '@/modules/roles/model/entities/types';
import { TextTags } from '@common/constants/textTags';
import type RoleDescriptionModel from './RoleDescription.model';

export interface RoleContentProps {
  role: RoleData;
  viewModel: RoleDescriptionModel;
}

const RoleContent: React.FC<RoleContentProps> = ({ viewModel }) => {
  return (
    <Column gap="lg" pa="md" height={1}>
      <Column gap="sm">
        <Typography tag={TextTags.H3} fontWeight="semiBold">
          {viewModel.role.name}
        </Typography>
        <Typography size="sm">
          {viewModel.role.description || 'Нет описания'}
        </Typography>
      </Column>

      <Row gap="lg">
        <Column gap="xs">
          <Typography size="xs">Пользователей</Typography>
          <Typography tag={TextTags.H3} fontWeight="bold">
            {viewModel.role.usersCount || 0}
          </Typography>
        </Column>

        <Column gap="xs">
          <Typography size="xs">Создана</Typography>
          <Typography size="sm">
            {new Date(viewModel.role.createdUtcDate).toLocaleDateString()}
          </Typography>
        </Column>
      </Row>

      <Column gap="md">
        <RolePermissions
          policies={viewModel.policies}
          onChange={viewModel.handlePoliciesChange}
          disabled={false}
        />
      </Column>

      <Row gap="sm" justify="end">
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

export default RoleContent;
