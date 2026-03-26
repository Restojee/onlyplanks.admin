import React from 'react';
import { Paper, Column, Row } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import { Checkbox } from '@common/components/Checkbox';
import { TextTags } from '@common/constants/textTags';
import type { WithViewProps } from '@common/hocs/withView/types';
import RoleOtherPermissionsModel from './RoleOtherPermissions.model';

export interface RoleOtherPermissionsProps {
  title?: string;
  keys: string[];
  availableOptions: { key: string; label: string }[];
  onChange: (keys: string[]) => void;
  disabled?: boolean;
}

const RoleOtherPermissions: React.FC<WithViewProps<RoleOtherPermissionsModel, RoleOtherPermissionsProps>> = ({ viewModel }) => {
  return (
    <Paper>
      <Column gap="md">
        <Typography tag={TextTags.H3} fontWeight="semiBold">
          {viewModel.title}
        </Typography>

        <Column gap="xs">
          {viewModel.options.map((o) => (
            <Row key={o.key} align="center" gap="sm">
              <Checkbox
                checked={viewModel.isChecked(o.key)}
                onChange={() => viewModel.toggle(o.key)}
                disabled={viewModel.disabled}
              />
              <Typography>{o.label}</Typography>
            </Row>
          ))}
        </Column>
      </Column>
    </Paper>
  );
};

export default RoleOtherPermissions;
