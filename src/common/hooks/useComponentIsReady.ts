import * as React from 'react';

import useMounted from './useMounted';

interface Props {
  isReady?: boolean;
  callback: () => void;
}

const useComponentIsReady = ({ isReady = true, callback }: Props) => {
  const isMounted = useMounted();

  const callbackMemo = React.useCallback(callback, []);

  React.useEffect(() => {
    if (isReady && isMounted.current.mounted) {
      callbackMemo();
    }
  }, [callbackMemo, isMounted, isReady]);
};

export default useComponentIsReady;
