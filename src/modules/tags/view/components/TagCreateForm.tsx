import React from 'react';
import { observer } from 'mobx-react-lite';
import { Column, Row } from '@ui/Layout';
import { Input } from '@common/components/Input';
import { Button } from '@common/components/Button';
import { Typography } from '@ui/Typography';
import { TagSelect } from '@common/components/TagSelect';

export interface TagCreateFormProps {
  name: string;
  description: string;
  parentTagId?: number;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onParentChange: (value?: number) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const TagCreateForm: React.FC<TagCreateFormProps> = ({
   name,
   description,
   parentTagId,
   onNameChange,
   onDescriptionChange,
   onParentChange,
   onSubmit,
   onCancel,
  }) => {
    const handleNameChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      onNameChange(e.target.value);
    }, [onNameChange]);

    const handleDescriptionChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      onDescriptionChange(e.target.value);
    }, [onDescriptionChange]);

    const handleParentChange = React.useCallback((id: number) => {
      onParentChange(id);
    }, [onParentChange]);

    return (
      <Column pa="md" gap="md">
        <Row>
          <Typography size="sm" fontWeight="bold">
            Форма добавления тега
          </Typography>
        </Row>

        <Input
          placeholder="Название тега"
          size="sm"
          value={name}
          onChange={handleNameChange}
        />

        <Input
          placeholder="Описание"
          size="sm"
          value={description}
          onChange={handleDescriptionChange}
        />

        <TagSelect
          value={parentTagId}
          onChange={handleParentChange}
          placeholder="Родительский тег"
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
    );
  }

export default TagCreateForm;
