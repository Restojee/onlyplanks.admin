import React from 'react';
import { ToolbarElement } from '@ui/Toolbar';
import { IconWithInputText } from '@common/components/IconWithInputText';

export const getUserSessionsToolbarItems = (params: {
  searchQuery?: string;
  onSearch?: (query: string) => void;
}): ToolbarElement[] => {
  const items: ToolbarElement[] = [];

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
