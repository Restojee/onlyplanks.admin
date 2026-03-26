import { useMemo } from 'react';
import { type ListItemOptions } from '@ui/Select/common/types';

interface UseMenuOptionsProps {
  options: ListItemOptions[];
  onClose: () => void;
}

export const useMenuOptions = ({ options, onClose }: UseMenuOptionsProps) => {
  return useMemo(() => {
    const processOptions = (items: ListItemOptions[]): ListItemOptions[] => {
      return items.map(item => {
        const processedItem: ListItemOptions = {
          ...item,
          onItemClick: () => {
            item.onItemClick?.();
            onClose();
          },
        };

        
        if (item.submenu) {
          processedItem.submenu = processOptions(item.submenu);
        }

        return processedItem;
      });
    };

    return processOptions(options);
  }, [options, onClose]);
};
