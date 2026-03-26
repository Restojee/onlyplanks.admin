import * as React from 'react';

const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
  const timoutRef = React.useRef<NodeJS.Timeout>();
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return React.useCallback((...args: any[]) => {
    if (timoutRef.current) {
      clearTimeout(timoutRef.current);
    }
    timoutRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  }, [delay]);
};

export default useDebounce;
