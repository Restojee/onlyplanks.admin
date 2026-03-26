import { EIcon } from '@ui/Icon/common/types';

export const getIconPath = (icon: EIcon | string) => {
  return 'icons/' + icon + '.svg';
}
