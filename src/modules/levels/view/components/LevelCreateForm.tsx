import React from 'react';
import { observer } from 'mobx-react-lite';
import { Column, Row } from '@ui/Layout';
import { Input } from '@common/components/Input';
import { Button } from '@common/components/Button';
import { Typography } from '@ui/Typography';

export interface LevelCreateFormProps {
  name: string;
  description: string;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const LevelCreateForm: React.FC<LevelCreateFormProps> = observer(({
  name,
  description,
  onNameChange,
  onDescriptionChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <Column pa="md" gap="md">
      <Row>
        <Typography size="sm" fontWeight="bold">
          Форма добавления уровня
        </Typography>
      </Row>

      <Input
        placeholder="Название уровня"
        size="sm"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      />

      <Input
        placeholder="Описание"
        size="sm"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
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
  );
});

export default LevelCreateForm;
