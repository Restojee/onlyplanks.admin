import React, { useRef, useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import styles from './VirtualScroll.module.scss';

interface VirtualScrollProps {
  children: React.ReactNode;
  className?: string;
  useCustomScrollbar?: boolean;
  enableHorizontal?: boolean;
}

export const VirtualScroll: React.FC<VirtualScrollProps> = ({
  children,
  className,
  useCustomScrollbar = true,
  enableHorizontal = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  
  const [scrollbarVisible, setScrollbarVisible] = useState(false);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragStartScrollTop, setDragStartScrollTop] = useState(0);
  
  
  const [horizontalScrollbarVisible, setHorizontalScrollbarVisible] = useState(false);
  const [thumbWidth, setThumbWidth] = useState(0);
  const [thumbLeft, setThumbLeft] = useState(0);
  const [isHorizontalDragging, setIsHorizontalDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartScrollLeft, setDragStartScrollLeft] = useState(0);

  const updateScrollbar = useCallback(() => {
    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const content = contentRef.current;

    
    const containerHeight = container.clientHeight;
    const contentHeight = content.scrollHeight;
    const scrollTop = container.scrollTop;

    const isVerticalScrollable = contentHeight > containerHeight;
    setScrollbarVisible(isVerticalScrollable);

    if (isVerticalScrollable) {
      const thumbHeightCalc = (containerHeight / contentHeight) * containerHeight;
      const thumbTopCalc = (scrollTop / contentHeight) * containerHeight;

      setThumbHeight(Math.max(thumbHeightCalc, 40));
      setThumbTop(thumbTopCalc);
    }

    
    if (enableHorizontal) {
      const containerWidth = container.clientWidth;
      const contentWidth = content.scrollWidth;
      const scrollLeft = container.scrollLeft;

      const isHorizontalScrollable = contentWidth > containerWidth;
      setHorizontalScrollbarVisible(isHorizontalScrollable);

      if (isHorizontalScrollable) {
        const thumbWidthCalc = (containerWidth / contentWidth) * containerWidth;
        const thumbLeftCalc = (scrollLeft / contentWidth) * containerWidth;

        setThumbWidth(Math.max(thumbWidthCalc, 40));
        setThumbLeft(thumbLeftCalc);
      }
    }
  }, [enableHorizontal, children]);

  useEffect(() => {
    updateScrollbar();
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => updateScrollbar();
    const handleResize = () => updateScrollbar();

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateScrollbar, children]);

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStartY(e.clientY);
    setDragStartScrollTop(containerRef.current?.scrollTop || 0);
  };

  const handleHorizontalThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsHorizontalDragging(true);
    setDragStartX(e.clientX);
    setDragStartScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !contentRef.current) return;

      const container = containerRef.current;
      const content = contentRef.current;
      const deltaY = e.clientY - dragStartY;
      const containerHeight = container.clientHeight;
      const contentHeight = content.scrollHeight;

      const scrollDelta = (deltaY / containerHeight) * contentHeight;
      container.scrollTop = dragStartScrollTop + scrollDelta;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStartY, dragStartScrollTop]);

  useEffect(() => {
    if (!isHorizontalDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !contentRef.current) return;

      const container = containerRef.current;
      const content = contentRef.current;
      const deltaX = e.clientX - dragStartX;
      const containerWidth = container.clientWidth;
      const contentWidth = content.scrollWidth;

      const scrollDelta = (deltaX / containerWidth) * contentWidth;
      container.scrollLeft = dragStartScrollLeft + scrollDelta;
    };

    const handleMouseUp = () => {
      setIsHorizontalDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isHorizontalDragging, dragStartX, dragStartScrollLeft]);

  const containerClasses = clsx(
    styles.container,
    {
      [styles.customScrollbar]: useCustomScrollbar,
      [styles.standardScrollbar]: !useCustomScrollbar,
    },
    className
  );

  return (
    <div className={styles.wrapper}>
      <div ref={containerRef} className={containerClasses}>
        <div ref={contentRef} className={styles.content}>
          {children}
        </div>
      </div>
      {useCustomScrollbar && scrollbarVisible && (
        <div className={styles.scrollbarTrackVertical}>
          <div
            className={clsx(styles.scrollbarThumb, { [styles.dragging]: isDragging })}
            style={{
              height: `${thumbHeight}px`,
              top: `${thumbTop}px`,
            }}
            onMouseDown={handleThumbMouseDown}
          />
        </div>
      )}
      {useCustomScrollbar && enableHorizontal && horizontalScrollbarVisible && (
        <div className={styles.scrollbarTrackHorizontal}>
          <div
            className={clsx(styles.scrollbarThumbHorizontal, { [styles.dragging]: isHorizontalDragging })}
            style={{
              width: `${thumbWidth}px`,
              left: `${thumbLeft}px`,
            }}
            onMouseDown={handleHorizontalThumbMouseDown}
          />
        </div>
      )}
    </div>
  );
};
