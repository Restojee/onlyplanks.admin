import React, { useMemo, useCallback } from 'react';
import { Typography } from '@ui/Typography';
import { TextTags } from '@common/constants/textTags';
import { Checkbox } from '@common/components/Checkbox';
import { Column, Row } from '@ui/Layout';
import type RolePermissionsModel from '../../RolePermissions.model';
import type { PolicyGroup } from '../../RolePermissions.model';
import { GridRow, GridCell } from '../GridRow/GridRow';
import styles from '../../RolePermissions.module.scss';
import {PolicyInfo} from "@/modules/roles/model/entities";

export interface ToggleGroupProps {
  group: PolicyGroup;
  viewModel: RolePermissionsModel;
}

const columnSize = 70;

export const ToggleGroup: React.FC<ToggleGroupProps> = ({ group, viewModel }) => {
  const handleAllToggle = useCallback((policyKey: string, checked: boolean) => {
    viewModel.handleAllToggle(policyKey, checked);
  }, [viewModel]);

  const columns = useMemo(() => [
    {
      header: <Typography fontWeight="bold">Название</Typography>,
      minWidth: 200,
    },
    ...group.permissionLabels.map(label => ({
      header: (
        <Typography fontWeight="bold">
          {viewModel.getLabelDisplay(label)}
        </Typography>
      ),
      minWidth: columnSize,
    })),
  ], [group.permissionLabels, viewModel]);

  const gridTemplateColumns = useMemo(() => columns
    .map(col => col.minWidth ? `minmax(${col.minWidth}px, 1fr)` : '1fr')
    .join(' '), [columns]);

  const renderHeaderRow = useCallback((col: typeof columns[number], index: number) => (
    <Row
      key={index}
      justify={!index ? 'start' : 'end'}
      minWidth={col.minWidth}
    >
      {col.header}
    </Row>
  ), []);

  const renderPermissionCell = (label: string, policy: PolicyInfo) => (
    <GridCell key={label} justify="end" minWidth={columnSize}>
      <Checkbox
        checked={viewModel.getPermissionByLabel(policy, label)?.granted ?? false}
        onChange={(e) => handleAllToggle(policy.key, e.target.checked)}
        disabled={viewModel.disabled}
      />
    </GridCell>
  );

  const renderPolicyRow = (policy: PolicyGroup['policies'][number]) => {
    return (
      <GridRow key={policy.key} gridTemplateColumns={gridTemplateColumns}>
        <GridCell justify="start">
          <Typography>{policy.name}</Typography>
        </GridCell>

        {group.permissionLabels.map(item => renderPermissionCell(item, policy))}
      </GridRow>
    )
    }

  return (
    <Column gap="xs">
      <Typography tag={TextTags.H3} fontWeight="semiBold">
        {group.title}
      </Typography>

      <Row
        className={styles.headerRow}
        style={{ gridTemplateColumns } as React.CSSProperties}
      >
        {columns.map(renderHeaderRow)}
      </Row>

      <Column gap="xs">
        {group.policies.map(renderPolicyRow)}
      </Column>
    </Column>
  );
};
