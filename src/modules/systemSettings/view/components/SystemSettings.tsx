import React from 'react';
import { Column, Row } from '@ui/Layout';
import { Paper } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import { Form } from '@ui/FormGroup';
import { Button } from '@ui/Button';
import { InputText } from '@ui/Input/ui/InputText/InputText';
import { Select } from '@common/components/Combobox';
import { withView } from '@common/hocs/withView';
import type { WithViewProps } from '@common/hocs/withView/types';
import SystemSettingsModel from './SystemSettings.model';
import {RoleSelect} from "@ui/RoleSelect";

const SystemSettings: React.FC<WithViewProps<SystemSettingsModel>> = ({ viewModel }) => {
  return (
    <Row pa="md" gap="md" nonIntegration>
      <Paper>
        <Column gap="md" pa="md">
          <Typography size="xl" fontWeight="bold">
            Системные настройки
          </Typography>

          <Form.Field>
            <Form.Field.Label>Язык по умолчанию</Form.Field.Label>
            <Form.Field.Item>
              <Select
                options={[
                  { value: 'ru', label: 'Русский' },
                  { value: 'en', label: 'English' },
                ]}
                value={viewModel.settings.language}
                onChange={(opt) => viewModel.setLanguage(opt.value)}
                placeholder="Выберите язык"
                size="md"
              />
            </Form.Field.Item>
          </Form.Field>

          <Form.Field>
            <Form.Field.Label>
              Роль по умолчанию
            </Form.Field.Label>
            <Form.Field.Item>
              <RoleSelect
                value={viewModel.settings.defaultRoleId}
                onChange={viewModel.setDefaultRoleId}
                placeholder="Выберите роль"
                size="md"
              />
            </Form.Field.Item>
          </Form.Field>

          <Row gap="sm" pt="md">
            <Button
              size="md"
              onClick={viewModel.handleSave}
              disabled={viewModel.isLoading}
            >
              Сохранить
            </Button>
          </Row>
        </Column>
      </Paper>
    </Row>
  );
};

export default withView(SystemSettings as any, SystemSettingsModel);
