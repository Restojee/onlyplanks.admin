import React from 'react';
import { observer } from 'mobx-react-lite';
import { Column, Row } from '@ui/Layout';
import { Button } from '@ui/Button';
import { Typography } from '@ui/Typography';
import { UserSelect } from '@ui/UserSelect';
import { LevelSelect } from '@ui/LevelSelect';
import { TextArea } from '@ui/Textarea';
import { ImageUploader } from '@ui/ImageUploader';

export interface CompletedFormProps {
  mode: 'level' | 'user' | 'all'; 
  userId?: number;
  levelId?: number;
  description: string;
  image?: File ;
  onUserIdChange?: (userId: number) => void;
  onLevelIdChange?: (levelId: number) => void;
  onDescriptionChange: (value: string) => void;
  onImageChange: (file: File ) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const CompletedForm: React.FC<CompletedFormProps> = observer(({
  mode,
  userId,
  levelId,
  description,
  image,
  onUserIdChange,
  onLevelIdChange,
  onDescriptionChange,
  onImageChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <Column pa="md" gap="md">
      <Row>
        <Typography size="sm" fontWeight="bold">
          Форма добавления выполнения
        </Typography>
      </Row>

      {(mode === 'level' || mode === 'all') && (
        <Column gap="sm">
          <Typography size="sm">Пользователь</Typography>
          <UserSelect
            value={userId}
            onChange={onUserIdChange}
            size="sm"
          />
        </Column>
      )}

      {(mode === 'user' || mode === 'all') && (
        <Column gap="sm">
          <Typography size="sm">Уровень</Typography>
          <LevelSelect
            value={levelId}
            onChange={onLevelIdChange}
            size="sm"
          />
        </Column>
      )}

      <Column gap="sm">
        <Typography size="sm">Описание</Typography>
        <TextArea
          placeholder="Описание выполнения..."
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          rows={3}
          size="sm"
        />
      </Column>

      <Column gap="sm">
        <Typography size="sm">Изображение</Typography>
        <ImageUploader
          value={image}
          onChange={onImageChange}
        />
      </Column>

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

export default CompletedForm;
