import { useEffect, useRef, useCallback } from 'react';

export interface UseInfiniteScrollOptions {
  

 
  onLoadMore: () => void | Promise<void>;
  
  

 
  hasMore: boolean;
  
  

 
  isLoading: boolean;
  
  

 
  rootRef?: React.RefObject<HTMLElement>;
  
  

 
  rootMargin?: string;
  
  

 
  threshold?: number;
}




 
export const useInfiniteScroll = ({
  onLoadMore,
  hasMore,
  isLoading,
  rootRef,
  rootMargin = '150px',
  threshold = 0.01,
}: UseInfiniteScrollOptions) => {
  const observerRef = useRef<IntersectionObserver >(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      if (entry.isIntersecting && hasMore && !isLoading) {
        onLoadMore();
      }
    },
    [hasMore, isLoading, onLoadMore]
  );

  useEffect(() => {
    const root = rootRef?.current || null;
    
    const options: IntersectionObserverInit = {
      root,
      rootMargin,
      threshold,
    };

    observerRef.current = new IntersectionObserver(handleIntersection, options);

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observerRef.current.observe(currentSentinel);
    }

    return () => {
      if (observerRef.current && currentSentinel) {
        observerRef.current.unobserve(currentSentinel);
      }
      observerRef.current?.disconnect();
    };
  }, [handleIntersection, rootMargin, threshold, rootRef]);

  return sentinelRef;
}

export default useInfiniteScroll;
