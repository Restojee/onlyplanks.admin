import React from 'react';
import { Toolbar, ToolbarItem } from '@ui/Toolbar';
import { ButtonIcon } from '@ui/ButtonIcon';

export interface ContentManagerToolbarProps {
  onCreate?: () => void;
  onDelete?: () => void;
  createDisabled?: boolean;
  deleteDisabled?: boolean;
  customItems?: ToolbarItem[];
}

export const ContentManagerToolbar: React.FC<ContentManagerToolbarProps> = ({
  onCreate,
  onDelete,
  createDisabled = false,
  deleteDisabled = false,
  customItems = [],
}) => {
  const items = React.useMemo(() => {
    return [
      {
        id: 'create',
        component: (
          <ButtonIcon
            icon="IconAdd"
            onClick={onCreate}
            tooltip="Добавить"
            size="md"
            disabled={createDisabled || !onCreate}
          />
        ),
      },
      {
        id: 'delete',
        component: (
          <ButtonIcon
            icon="IconDelete"
            onClick={onDelete}
            tooltip="Удалить"
            disabled={deleteDisabled || !onDelete}
            size="md"
          />
        ),
      },
      ...customItems,
    ]
  }, [onDelete, onCreate, customItems, createDisabled, deleteDisabled]);

  return <Toolbar items={items} />;
};

export default React.memo(ContentManagerToolbar);
