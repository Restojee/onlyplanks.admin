import { type ListItemOptions } from '@ui/Select/common/types';
import { ThemeSizes } from '@common/themes/common/types';

export interface ListProps {
  options?: ListItemOptions[];
  onChange?: (option: ListItemOptions) => void;
  emptyMessage?: string;
  className?: string;
  size?: ThemeSizes;
  showCheckbox?: boolean;
  showSearch?: boolean;
  onSearch?: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  error?: string ;
  sentinelRef?: React.RefObject<HTMLDivElement>;
  itemsContainerRef?: React.RefObject<HTMLDivElement>;
}
