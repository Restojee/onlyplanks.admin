import React, { useState, useRef, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import styles from './Splitter.module.scss';

export enum SplitterDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

interface SplitterProps {
  children: [React.ReactNode, React.ReactNode];
  direction?: SplitterDirection;
  minSize?: number;
  maxSize?: number;
  defaultSize?: number;
  className?: string;
}

export const Splitter: React.FC<SplitterProps> = ({
  children,
  direction = SplitterDirection.Horizontal,
  minSize = 200,
  maxSize = 800,
  defaultSize = 300,
  className,
}) => {
  const [secondPanelSize, setSecondPanelSize] = useState<number>(defaultSize);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();

      let newSize: number;
      if (direction === SplitterDirection.Horizontal) {
        newSize = containerRect.right - e.clientX;
      } else {
        newSize = containerRect.bottom - e.clientY;
      }

      const clampedSize = Math.max(minSize, Math.min(maxSize, newSize));
      setSecondPanelSize(clampedSize);
    },
    [isDragging, direction, minSize, maxSize]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const [firstChild, secondChild] = children;

  const containerClasses = clsx(
    styles.splitter,
    {
      [styles.horizontal]: direction === SplitterDirection.Horizontal,
      [styles.vertical]: direction === SplitterDirection.Vertical,
      [styles.dragging]: isDragging,
    },
    className
  );

  const secondPanelStyle =
    direction === SplitterDirection.Horizontal
      ? { width: `${secondPanelSize}px` }
      : { height: `${secondPanelSize}px` };

  return (
    <div ref={containerRef} className={containerClasses}>
      <div className={styles.firstPanel}>{firstChild}</div>
      <div className={styles.resizerContainer}>
        <div className={styles.divider} />
        <div className={styles.resizer} onMouseDown={handleMouseDown} />
      </div>
      { secondChild && (
        <div className={styles.secondPanel} style={secondPanelStyle}>
          {secondChild}
        </div>
      )}
    </div>
  );
};
