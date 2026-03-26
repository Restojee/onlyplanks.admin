import React from 'react';
import { Column, Row } from '@ui/Layout';
import { Button } from '@ui/Button';
import { Typography } from '@ui/Typography';
import { UserSelect } from '@ui/UserSelect';
import { LevelSelect } from '@ui/LevelSelect';

export interface FavoriteFormProps {
  mode: 'level' | 'user' | 'all'; 
  userId?: number;
  levelId?: number;
  onUserIdChange?: (value: number) => void;
  onLevelIdChange?: (value: number) => void;
  onSubmit: () => void;
  onCancel: () => void;
  disabled?: boolean;
}

export const UserFavoriteForm: React.FC<FavoriteFormProps> = ({
  mode,
  userId,
  levelId,
  onUserIdChange,
  onLevelIdChange,
  onSubmit,
  onCancel,
  disabled = false,
}) => {
  return (
    <Column pa="md" gap="md">
      <Row>
        <Typography size="sm" fontWeight="bold">
          Форма добавления в избранное
        </Typography>
      </Row>

      {mode === 'level' && (
        <Column gap="sm">
          <Typography size="sm">Пользователь</Typography>
          <UserSelect
            value={userId}
            onChange={onUserIdChange}
            placeholder="Выберите пользователя"
            size="sm"
            disabled={disabled}
          />
        </Column>
      )}

      {mode === 'all' && (
        <Column gap="sm">
          <Typography size="sm">Пользователь</Typography>
          <UserSelect
            value={userId}
            onChange={onUserIdChange}
            placeholder="Выберите пользователя"
            size="sm"
            disabled={disabled}
          />
        </Column>
      )}

      {mode === 'user' && (
        <Column gap="sm">
          <Typography size="sm">Уровень</Typography>
          <LevelSelect
            value={levelId}
            onChange={onLevelIdChange}
            placeholder="Выберите уровень"
            size="sm"
            disabled={disabled}
          />
        </Column>
      )}

      {mode === 'all' && (
        <Column gap="sm">
          <Typography size="sm">Уровень</Typography>
          <LevelSelect
            value={levelId}
            onChange={onLevelIdChange}
            placeholder="Выберите уровень"
            size="sm"
            disabled={disabled}
          />
        </Column>
      )}

      <Row gap="sm">
        <Button size="sm" onClick={onSubmit} disabled={disabled}>
          Добавить
        </Button>
        <Button size="sm" onClick={onCancel} disabled={disabled}>
          Отмена
        </Button>
      </Row>
    </Column>
  );
}

export default UserFavoriteForm;
