import React from 'react';
import { ToolbarElement } from '@ui/Toolbar';
import { ButtonDropDown } from '@common/components/ButtonDropDown';
import { Column, Row } from '@ui/Layout';
import { Button } from '@common/components/Button';
import { Typography } from '@ui/Typography';
import type { TreeNode } from '@ui/DataTreeTable';
import type { CommentRow } from '@common/api/comments/models';
import { LevelSelect } from '@common/components/LevelSelect';
import { UserSelect } from '@common/components/UserSelect';
import { TextArea } from '@common/components/Textarea';
import type { CommentCreateFormState } from '../components/Commented.model';
import { IconWithInputText } from '@common/components/IconWithInputText';

export const getCommentedToolbarItems = (params: {
  searchQuery?: string;
  onSearch?: (query: string) => void;
  selectedRows?: TreeNode<CommentRow>[];
  onCreate?: () => void;
  onDelete?: (rows: TreeNode<CommentRow>[]) => void;
  formState?: CommentCreateFormState;
  onFormLevelChange?: (levelId: number) => void;
  onFormUserChange?: (userId: number) => void;
  onFormTextChange?: (text: string) => void;
  onFormCancel?: () => void;
}): ToolbarElement[] => {
  const items: ToolbarElement[] = [];

  items.push({
    id: 'add',
    component: (
      <ButtonDropDown icon="IconAdd" tooltip="Добавить комментарий" buttonSize="md">
        <Column pa="md" gap="md">
          <Row>
            <Typography size="sm" fontWeight="bold">
              Форма добавления комментария
            </Typography>
          </Row>

          <LevelSelect
            value={params.formState?.levelId}
            onChange={params.onFormLevelChange}
            placeholder="Уровень"
            size="sm"
          />

          <UserSelect
            value={params.formState?.userId}
            onChange={params.onFormUserChange}
            placeholder="Пользователь"
            size="sm"
          />

          <TextArea
            value={params.formState?.text}
            onChange={(e) => params.onFormTextChange?.(e.target.value)}
            placeholder="Комментарий"
            rows={4}
            size="sm"
          />

          <Row gap="sm">
            <Button size="sm" onClick={params.onCreate}>
              Добавить
            </Button>
            <Button size="sm" onClick={params.onFormCancel}>
              Отмена
            </Button>
          </Row>
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
