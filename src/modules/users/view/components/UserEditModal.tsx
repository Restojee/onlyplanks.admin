import React from 'react';
import { Column, Row } from '@ui/Layout';
import { Input } from '@common/components/Input';
import { Button } from '@common/components/Button';
import { Typography } from '@ui/Typography';
import type { UserData } from '@/modules/users/model/entities';

export interface UserEditModalProps {
  user: UserData;
  onSave: (id: number, data: Partial<UserData>) => void;
  onCancel: () => void;
}

export const UserEditModal: React.FC<UserEditModalProps> = ({ user, onSave, onCancel }) => {
  const [username, setUsername] = React.useState(user.username);
  const [email, setEmail] = React.useState(user.email);

  const handleSave = () => {
    onSave(user.id, { username, email });
  };

  return (
    <Column pa="md" gap="md" style={{ minWidth: '400px' }}>
      <Row>
        <Typography size="md" fontWeight="bold">
          Редактирование пользователя
        </Typography>
      </Row>

      <Input
        placeholder="Имя пользователя"
        size="md"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <Input
        placeholder="Email"
        size="md"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Row gap="sm">
        <Button size="md" onClick={handleSave}>
          Сохранить
        </Button>
        <Button size="md" onClick={onCancel}>
          Отмена
        </Button>
      </Row>
    </Column>
  );
};

export default UserEditModal;
