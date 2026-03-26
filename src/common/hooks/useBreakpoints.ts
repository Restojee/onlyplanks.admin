import useDebounce from '@common/hooks/useDebounce';
import * as React from 'react';

const useBreakPoints = (mediaString: string) => {
  const [match, setMatch] = React.useState<boolean>();

  const matchMediaFn = useDebounce(() => {
    const media = window.matchMedia(mediaString);
    setMatch(media.matches);
  }, 200);

  React.useEffect(() => {
    const media = window.matchMedia(mediaString);

    setMatch(media.matches);

    window.addEventListener('resize', matchMediaFn);

    return () => {
      window.removeEventListener('resize', matchMediaFn);
    };
  }, [mediaString]);

  return match;
};

export default useBreakPoints;
