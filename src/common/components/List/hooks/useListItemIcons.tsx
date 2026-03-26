import * as React from 'react';
import {
  type ListItemIconPositions,
  type ListItemIconProps,
  type ListItemOptions,
} from '@ui/Select/common/types';
import ListItemIcon from '@ui/List/ui/Icon/ListItemIcon';

type UseListItemOptions = Pick<ListItemOptions, 'disabled' | 'size'>;
export const useListItemIcons = (options: UseListItemOptions) => {
  const { disabled } = options;

  return React.useCallback(
    (icon?: ListItemIconProps, icons?: ListItemIconProps[], position?: ListItemIconPositions) => {
      const iconsForRender = icon ? [icon] : icons;
      return iconsForRender?.map((icon) => (
        <ListItemIcon source={icon.source} position={position} />
      ));
    },
    [disabled],
  );
};
