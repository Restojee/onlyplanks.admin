import React from 'react';
import { ToolbarElement } from '@ui/Toolbar';
import { ButtonDropDown } from '@common/components/ButtonDropDown';
import { Column, Row } from '@ui/Layout';
import { Button } from '@common/components/Button';
import { Typography } from '@ui/Typography';
import type { TreeNode } from '@ui/DataTreeTable';
import type { Completed } from '@common/api/completed/models';
import { IconWithInputText } from '@common/components/IconWithInputText';
import CompletedForm from '@/modules/users/modules/completed/view/components/CompletedForm';

export type CompletedCreateFormState = {
  userId?: number;
  levelId?: number;
  description?: string;
  image?: File | null;
};

export const getCompletedToolbarItems = (params: {
  searchQuery?: string;
  onSearch?: (query: string) => void;
  selectedRows?: TreeNode<Completed>[];
  onCreate?: () => void;
  onDelete?: (rows: TreeNode<Completed>[]) => void;
  formState?: CompletedCreateFormState;
  onFormUserChange?: (userId: number ) => void;
  onFormLevelChange?: (levelId: number ) => void;
  onFormDescriptionChange?: (description: string) => void;
  onFormImageChange?: (image: File) => void;
  onFormCancel?: () => void;
}): ToolbarElement[] => {
  const items: ToolbarElement[] = [];

  items.push({
    id: 'add',
    component: (
      <ButtonDropDown icon="IconAdd" tooltip="Добавить выполнение" buttonSize="md">
        <Column pa="md" gap="md">
          <Row>
            <Typography size="sm" fontWeight="bold">
              Форма добавления выполнения
            </Typography>
          </Row>

          <CompletedForm
            mode="all"
            userId={params.formState?.userId}
            levelId={params.formState?.levelId}
            description={params.formState?.description}
            image={params.formState?.image}
            onUserIdChange={params.onFormUserChange}
            onLevelIdChange={params.onFormLevelChange}
            onDescriptionChange={params.onFormDescriptionChange || (() => {})}
            onImageChange={params.onFormImageChange || (() => {})}
            onSubmit={params.onCreate || (() => {})}
            onCancel={params.onFormCancel || (() => {})}
          />
        </Column>
      </ButtonDropDown>
    ),
    align: 'left',
  });

  items.push({
    id: 'delete',
    icon: 'IconDelete',
    onClick: () => params.onDelete?.(params.selectedRows || []),
    tooltip: 'Удалить',
    align: 'left',
  });

  items.push({
    id: 'divider-1',
    type: 'divider',
    align: 'left',
  });

  items.push({
    id: 'search',
    component: (
      <IconWithInputText
        icon="IconSearch"
        placeholder="Поиск..."
        size="md"
        value={params.searchQuery}
        tooltip="Поиск"
        onChange={params.onSearch}
        debounceDelay={500}
      />
    ),
    align: 'right',
  });

  return items;
};
