import React from 'react';
import { Row } from '@ui/Layout';
import { Checkbox } from '@common/components/Checkbox';
import type { PolicyPermission } from '@/modules/roles/model/entities/types';
import styles from '../../RolePermissions.module.scss';

export interface PermissionCheckboxProps {
  permission?: PolicyPermission;
  policyKey: string;
  disabled: boolean;
  onChange: (policyKey: string, permKey: string, checked: boolean) => void;
}

const columnSize = 70;

export const PermissionCheckbox: React.FC<PermissionCheckboxProps> = React.memo(({
  permission,
  policyKey,
  disabled,
  onChange,
}) => {
  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (permission) {
      onChange(policyKey, permission.key, e.target.checked);
    }
  }, [onChange, policyKey, permission]);

  return (
    <Row justify="end" minWidth={columnSize} maxWidth={columnSize}>
      {permission && (
        <Checkbox
          checked={permission.granted}
          onChange={handleChange}
          disabled={disabled}
        />
      )}
    </Row>
  );
});

PermissionCheckbox.displayName = 'PermissionCheckbox';
