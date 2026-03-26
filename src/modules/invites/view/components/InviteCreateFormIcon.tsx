import React from 'react';
import { Column, Row } from '@ui/Layout';
import { Input } from '@common/components/Input';
import { Button } from '@common/components/Button';
import { Typography } from '@ui/Typography';
import { ButtonDropDown } from '@common/components/ButtonDropDown';

export interface InviteCreateFormProps {
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const InviteCreateFormIcon: React.FC<InviteCreateFormProps> = ({
  email,
  onEmailChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <ButtonDropDown
      icon="IconAdd"
      tooltip="Создать инвайт"
      buttonSize="md"
    >
      <Column pa="md" gap="md">
        <Row>
          <Typography size="sm" fontWeight="bold">
            Создание инвайта
          </Typography>
        </Row>

        <Input
          placeholder="Email"
          size="sm"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
        />

        <Row gap="sm">
          <Button size="sm" onClick={onSubmit}>
            Создать
          </Button>
          <Button size="sm" onClick={onCancel}>
            Отмена
          </Button>
        </Row>
      </Column>
    </ButtonDropDown>
  );
}

export default InviteCreateFormIcon;
