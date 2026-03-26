import * as React from 'react';

interface UseWatchProps<T extends unknown[]> {
  callback: () => void;
  deps: T;
}
const useWatch = <T extends unknown[]>(options: UseWatchProps<T>) => {
  const isFirstRender = React.useRef(true);

  const { callback, deps } = options;

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    callback();
  }, deps);
};
export default useWatch;
