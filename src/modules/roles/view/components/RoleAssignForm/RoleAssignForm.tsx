import React from 'react';
import { observer } from 'mobx-react-lite';
import { Column, Row } from '@ui/Layout';
import { UserSelect } from '@ui/UserSelect';
import { Button } from '@ui/Button';
import { Typography } from '@ui/Typography';
import { Form } from '@ui/FormGroup';

export interface RoleAssignFormProps {
  roleName: string;
  formData: {
    userId?: number;
  };
  errors?: {
    userId?: string;
  };
  onUserChange: (userId: number) => void;
  onUserBlur?: () => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const RoleAssignForm: React.FC<RoleAssignFormProps> = observer(({
  roleName,
  formData,
  errors,
  onUserChange,
  onUserBlur,
  onSubmit,
  onCancel,
}) => {
  return (
    <Column gap="lg" pa="md">
      <Typography>
        Выберите пользователя для назначения роли
      </Typography>

      <Form.Field>
        <Form.Field.Label>Пользователь</Form.Field.Label>
        <Form.Field.Item error={errors?.userId}>
          <UserSelect
            value={formData.userId}
            onChange={onUserChange}
            placeholder="Выберите пользователя"
            size="md"
            leftIcon="IconUser"
            onBlur={onUserBlur}
          />
        </Form.Field.Item>
      </Form.Field>

      <Row gap="sm" justify="end">
        <Button variant="secondary" onClick={onCancel}>
          Отмена
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Назначить
        </Button>
      </Row>
    </Column>
  );
});

export default RoleAssignForm;
