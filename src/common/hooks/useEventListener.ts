import * as React from 'react';

const useEventListener = <T extends Event>(
  eventName: string,
  handler: (event: T) => void,
  element: HTMLElement | typeof window  = window,
) => {
  const eventListener = React.useCallback(
    (event: T) => {
      handler(event);
    },
    [handler],
  );

  React.useEffect(() => {
    const isSupported = element && element.addEventListener;

    if (!isSupported) {
      return;
    }

    element.addEventListener(eventName, eventListener as EventListener);

    return () => {
      element.removeEventListener(eventName, eventListener as EventListener);
    };
  }, [eventName, element]);
};

export default useEventListener;
