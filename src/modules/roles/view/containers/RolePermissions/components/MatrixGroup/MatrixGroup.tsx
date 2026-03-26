import React, { useMemo, useCallback } from 'react';
import { Typography } from '@ui/Typography';
import { TextTags } from '@common/constants/textTags';
import { Checkbox } from '@common/components/Checkbox';
import { Column, Row } from '@ui/Layout';
import type RolePermissionsModel from '../../RolePermissions.model';
import type { PolicyGroup } from '../../RolePermissions.model';
import { GridRow, GridCell } from '../GridRow/GridRow';
import { PermissionCheckbox } from '../PermissionCheckbox/PermissionCheckbox';
import styles from '../../RolePermissions.module.scss';

export interface MatrixGroupProps {
  group: PolicyGroup;
  viewModel: RolePermissionsModel;
}

const columnSize = 70;

export const MatrixGroup: React.FC<MatrixGroupProps> = ({ group, viewModel }) => {
  const handlePermissionChange = useCallback((policyKey: string, permKey: string, checked: boolean) => {
    viewModel.handlePermissionChange(policyKey, permKey, checked);
  }, [viewModel]);

  const handleAllToggle = useCallback((policyKey: string, checked: boolean) => {
    viewModel.handleAllToggle(policyKey, checked);
  }, [viewModel]);

  const columns = useMemo(() => [
    {
      header: <Typography>Название</Typography>,
      minWidth: 100,
    },
    ...group.permissionLabels.map(label => ({
      header: (
          <Typography>
              {viewModel.getLabelDisplay(label)}
          </Typography>
      ),
      minWidth: columnSize,
    })),
    {
      header: (
        <Typography>
          {viewModel.getLabelDisplay('все')}
        </Typography>
      ),
      minWidth: columnSize,
    },
  ], [group.permissionLabels, viewModel]);

  const gridTemplateColumns = useMemo(() => columns
    .map(col => col.minWidth ? `minmax(${col.minWidth}px, 1fr)` : '1fr')
    .join(' '), [columns]);

  const renderHeaderRow = useCallback((col: typeof columns[number], index: number) => (
    <Row
      key={index}
      justify={index === 0 ? 'start' : 'end'}
      minWidth={col.minWidth}
    >
      {col.header}
    </Row>
  ), []);

  const renderPolicyRow = useCallback((policy: PolicyGroup['policies'][number]) => {
    const renderPermissionCell = useCallback((label: string) => (
      <GridCell key={label} justify="end" minWidth={columnSize}>
        <PermissionCheckbox
          permission={viewModel.getPermissionByLabel(policy, label)}
          policyKey={policy.key}
          disabled={viewModel.disabled}
          onChange={handlePermissionChange}
        />
      </GridCell>
    ), [policy, viewModel, handlePermissionChange]);

    return (
      <GridRow key={policy.key} gridTemplateColumns={gridTemplateColumns}>
        <GridCell justify="start">
          <Typography>{policy.name}</Typography>
        </GridCell>

        {group.permissionLabels.map(renderPermissionCell)}

        <GridCell justify="end" minWidth={columnSize}>
          <Checkbox
            checked={viewModel.areAllGranted(policy)}
            onChange={(e) => handleAllToggle(policy.key, e.target.checked)}
            disabled={viewModel.disabled}
          />
        </GridCell>
      </GridRow>
    );
  }, [group.permissionLabels, gridTemplateColumns, viewModel, handleAllToggle]);

  return (
    <Column gap="xs">
      <Typography tag={TextTags.H3} fontWeight="semiBold">
        {group.title}
      </Typography>

      <Row
        className={styles.headerRow}
        pa="md"
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
