import React, { useRef } from 'react';
import List from '@ui/List/ui/Base/List';
import { type ListItemOptions } from '@ui/Select/common/types';
import { ThemeSizes } from '@common/themes/common/types';
import { useInfiniteScroll } from '@common/hooks/useInfiniteScroll';

export interface InfiniteScrollListProps {
  options: ListItemOptions[];
  onChange?: (option: ListItemOptions) => void;
  onLoadMore: () => void | Promise<void>;
  hasMore: boolean;
  isLoading: boolean;
  size?: ThemeSizes;
  showCheckbox?: boolean;
  showSearch?: boolean;
  onSearch?: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
}



 
export const InfiniteScrollList: React.FC<InfiniteScrollListProps> = ({
  options,
  onChange,
  onLoadMore,
  hasMore,
  isLoading,
  size = 'sm',
  showCheckbox = false,
  showSearch = false,
  onSearch,
  placeholder,
  emptyMessage,
  className,
}) => {
  const itemsContainerRef = useRef<HTMLDivElement>(null);
  
  const sentinelRef = useInfiniteScroll({
    onLoadMore,
    hasMore,
    isLoading,
    rootRef: itemsContainerRef,
    rootMargin: '150px',
    threshold: 0.01,
  });

  return (
    <List
      options={options}
      onChange={onChange}
      size={size}
      showCheckbox={showCheckbox}
      showSearch={showSearch}
      onSearch={onSearch}
      placeholder={placeholder}
      emptyMessage={emptyMessage}
      isLoading={isLoading && !hasMore}
      className={className}
      sentinelRef={hasMore ? sentinelRef : undefined}
      itemsContainerRef={itemsContainerRef}
    />
  );
};

export default InfiniteScrollList;
