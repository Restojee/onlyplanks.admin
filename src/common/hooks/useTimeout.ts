import * as React from 'react';

const useTimeout = (callback: Function, duration = 0) => {
  const saveCallback = React.useRef(callback);

  const [flipFlop, setFlipFlop] = React.useState<boolean>(false);

  React.useLayoutEffect(() => {
    saveCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (duration) {
      const timeout = setTimeout(saveCallback.current, duration);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [flipFlop]);

  return () => {
    setFlipFlop((prevState) => !prevState);
  };
};

export default useTimeout;
