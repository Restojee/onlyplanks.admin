import React from 'react';
import { observer } from 'mobx-react-lite';
import { Column, Row } from '@ui/Layout';
import { Input } from '@common/components/Input';
import { Button } from '@common/components/Button';
import { Typography } from '@ui/Typography';
import { ButtonDropDown } from '@common/components/ButtonDropDown';

export interface TipCreateFormProps {
  title: string;
  text: string;
  onTitleChange: (value: string) => void;
  onTextChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const TipCreateFormIcon: React.FC<TipCreateFormProps> = ({
  title,
  text,
  onTitleChange,
  onTextChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <ButtonDropDown
      icon="IconAdd"
      tooltip="Добавить заметку"
      buttonSize="md"
    >
      <Column pa="md" gap="md">
        <Row>
          <Typography size="sm" fontWeight="bold">
            Форма добавления полезной информации
          </Typography>
        </Row>

        <Input
          placeholder="Заголовок"
          size="sm"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />

        <Input
          placeholder="Текст заметки"
          size="sm"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
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
}

export default TipCreateFormIcon;
