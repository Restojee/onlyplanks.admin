import React from 'react';
import { observer } from 'mobx-react-lite';
import { Column, Row } from '@ui/Layout';
import { Input } from '@common/components/Input';
import { Button } from '@common/components/Button';
import { Typography } from '@ui/Typography';
import { ButtonDropDown } from '@common/components/ButtonDropDown';
import { RoleSelect } from '@common/components/RoleSelect';

export interface UserCreateFormProps {
  username: string;
  email: string;
  password: string;
  roleId?: number;
  onUsernameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onRoleIdChange: (value: number) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const UserCreateFormIcon: React.FC<UserCreateFormProps> = observer(({
  username,
  email,
  password,
  roleId,
  onUsernameChange,
  onEmailChange,
  onPasswordChange,
  onRoleIdChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <ButtonDropDown
      icon="IconAdd"
      tooltip="Добавить пользователя"
      buttonSize="md"
    >
      <Column pa="md" gap="md">
        <Row>
          <Typography size="sm" fontWeight="bold">
            Форма добавления пользователя
          </Typography>
        </Row>

        <Input
          placeholder="Имя пользователя"
          size="sm"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
        />

        <Input
          placeholder="Email"
          size="sm"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
        />

        <Input
          placeholder="Пароль"
          size="sm"
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
        />

        <RoleSelect
          value={roleId}
          onChange={onRoleIdChange}
          placeholder="Выберите роль"
          size="sm"
        />

        <Row gap="sm">
          <Button size="sm" onClick={onSubmit}>
            Добавить
          </Button>
          <Button size="sm" onClick={onCancel}>
            Отмена
          </Button>
        </Row>
      </Column>
    </ButtonDropDown>
  );
})

export default UserCreateFormIcon;
