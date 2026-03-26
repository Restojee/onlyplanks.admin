import React from 'react';
import { observer } from 'mobx-react-lite';
import { Column, Row } from '@ui/Layout';
import { Input } from '@ui/Input';
import { Button } from '@ui/Button';
import { Typography } from '@ui/Typography';
import { UserSelect } from '@ui/UserSelect';
import { LevelSelect } from '@ui/LevelSelect';

export interface CommentFormProps {
  mode: 'level' | 'user'; 
  userId?: number;
  levelId?: number;
  text: string;
  onUserIdChange?: (value: number) => void;
  onLevelIdChange?: (value: number) => void;
  onTextChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  disabled?: boolean;
}

export const CommentForm: React.FC<CommentFormProps> = observer(({
  mode,
  userId,
  levelId,
  text,
  onUserIdChange,
  onLevelIdChange,
  onTextChange,
  onSubmit,
  onCancel,
  disabled = false,
}) => {
  return (
    <Column pa="md" gap="md">
      <Row>
        <Typography size="sm" fontWeight="bold">
          Форма добавления комментария
        </Typography>
      </Row>

      {mode === 'level' && (
        <UserSelect
          value={userId}
          onChange={onUserIdChange}
          placeholder="Выберите пользователя"
          size="sm"
          disabled={disabled}
        />
      )}

      {mode === 'user' && (
        <LevelSelect
          value={levelId}
          onChange={onLevelIdChange}
          placeholder="Выберите уровень"
          size="sm"
          disabled={disabled}
        />
      )}

      <Input
        placeholder="Текст комментария"
        size="sm"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        disabled={disabled}
      />

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
});

export default CommentForm;
