import { useEffect, useRef } from 'react';

export const useContainerWidth = (
  setContainerWidth: React.Dispatch<React.SetStateAction<number>>
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateWidth = () => {
      const width = container.clientWidth;
      if (width > 0) {
        setContainerWidth(width);
      }
    };

    const initialTimer = setTimeout(updateWidth, 0);

    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });
    resizeObserver.observe(container);

    return () => {
      clearTimeout(initialTimer);
      resizeObserver.disconnect();
    };
  }, [setContainerWidth]);

  return { containerRef };
};
