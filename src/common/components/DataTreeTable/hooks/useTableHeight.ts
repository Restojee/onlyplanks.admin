import { useEffect, useState, useRef, RefObject } from 'react';

interface UseTableHeightProps {
  wrapperRef: RefObject<HTMLDivElement>;
  headerRef: RefObject<HTMLDivElement>;
  footerRef: RefObject<HTMLDivElement>;
  minHeight: number;
}

export const useTableHeight = ({
  wrapperRef,
  headerRef,
  footerRef,
  minHeight,
}: UseTableHeightProps) => {
  const [bodyHeight, setBodyHeight] = useState<number>(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const header = headerRef.current;
    const footer = footerRef.current;

    if (!wrapper || !header || !footer) return;

    const updateHeight = () => {
      const wrapperHeight = wrapper.clientHeight;
      const headerHeight = header.clientHeight;
      const footerHeight = footer.clientHeight;
      
      const calculatedHeight = wrapperHeight - headerHeight - footerHeight;
      setBodyHeight(Math.max(calculatedHeight, 100));
    };

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(wrapper);
    resizeObserver.observe(header);
    resizeObserver.observe(footer);

    updateHeight();

    return () => {
      resizeObserver.disconnect();
    };
  }, [wrapperRef, headerRef, footerRef, minHeight]);

  return bodyHeight;
};
