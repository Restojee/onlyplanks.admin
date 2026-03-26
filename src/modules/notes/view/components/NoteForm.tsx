import React, { ChangeEvent } from 'react';
import { Column, Row } from '@ui/Layout';
import { Button } from '@ui/Button';
import { Typography } from '@ui/Typography';
import { UserSelect } from '@ui/UserSelect';
import { LevelSelect } from '@ui/LevelSelect';
import { Input } from '@ui/Input';

export interface NoteFormProps {
  userId?: number;
  levelId?: number;
  description?: string;
  onUserIdChange?: (value: number) => void;
  onLevelIdChange?: (value: number) => void;
  onDescriptionChange?: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  disabled?: boolean;
}

export const NoteForm: React.FC<NoteFormProps> = ({
  userId,
  levelId,
  description,
  onUserIdChange,
  onLevelIdChange,
  onDescriptionChange,
  onSubmit,
  onCancel,
  disabled = false,
}) => {
  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    onDescriptionChange?.(event.target.value);
  };

  return (
    <Column pa="md" gap="md">
      <Row>
        <Typography size="sm" fontWeight="bold">
          Форма добавления заметки
        </Typography>
      </Row>

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

      <Column gap="sm">
        <Typography size="sm">Описание</Typography>
        <Input
          value={description || ''}
          onChange={handleDescriptionChange}
          placeholder="Введите описание"
          size="sm"
          disabled={disabled}
        />
      </Column>

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

export default NoteForm;
