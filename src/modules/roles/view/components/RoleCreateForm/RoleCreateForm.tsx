import React from 'react';
import { observer } from 'mobx-react-lite';
import { Column, Row } from '@ui/Layout';
import { TextArea } from '@common/components/Textarea';
import { Button } from '@ui/Button';
import { Typography } from '@ui/Typography';
import { InputText } from '@ui/Input/ui/InputText/InputText';
import { Form } from '@ui/FormGroup';
import type { RoleFormData } from '@/modules/roles/model/entities/types';

export interface RoleCreateFormProps {
  formData: RoleFormData;
  errors?: {
    name?: string;
    description?: string;
  };
  onNameChange: (value: string) => void;
  onNameBlur?: () => void;
  onDescriptionChange: (value: string) => void;
  onDescriptionBlur?: () => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const RoleCreateForm: React.FC<RoleCreateFormProps> = observer(({
  formData,
  errors,
  onNameChange,
  onNameBlur,
  onDescriptionChange,
  onDescriptionBlur,
  onSubmit,
  onCancel,
}) => {
  return (
    <Column gap="lg" pa="md">
      <Typography>
        Введите название и описание новой роли
      </Typography>

      <Form.Field>
        <Form.Field.Label>Название роли</Form.Field.Label>
        <Form.Field.Item error={errors?.name}>
          <InputText
            placeholder="Например: Редактор"
            value={formData.name}
            onChange={(e) => onNameChange(e.target.value)}
            onBlur={onNameBlur}
          />
        </Form.Field.Item>
      </Form.Field>

      <Form.Field>
        <Form.Field.Label>Описание</Form.Field.Label>
        <Form.Field.Item error={errors?.description}>
          <TextArea
            placeholder="Краткое описание роли"
            value={formData.description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            onBlur={onDescriptionBlur}
          />
        </Form.Field.Item>
      </Form.Field>

      <Row gap="sm" justify="end">
        <Button variant="secondary" onClick={onCancel}>
          Отмена
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Создать
        </Button>
      </Row>
    </Column>
  );
});

export default RoleCreateForm;
