import { useEffect, useRef } from 'react';

export type TUnmountFn = () => void;

export default function useMounted(mountedCallback?: () => void | TUnmountFn) {
  const callback = useRef(mountedCallback);
  callback.current = mountedCallback;

  const state = useRef({
    mounted: false,
    unmounted: false,
  });

  useEffect(() => {
    state.current.mounted = true;
    state.current.unmounted = false;
    const unmountedFn = callback.current && callback.current();
    return () => {
      if (typeof unmountedFn === 'function') {
        unmountedFn();
      }
      state.current.unmounted = true;
    };
  }, []);

  return state;
}
