import { ListItemOptions } from '@ui/Select/common/types';


export const getOptionLabel = (option: ListItemOptions): string => {
  return typeof option.label === 'string' ? option.label : '';
};

export const matchesSearchQuery = (option: ListItemOptions, searchValue: string): boolean => {
  const label = getOptionLabel(option);
  return label.toLowerCase().includes(searchValue.toLowerCase());
};

export const filterOptionsBySearch = (
  options: ListItemOptions[],
  searchValue: string
): ListItemOptions[] => {
  if (!searchValue || !options) return options;
  return options.filter(option => matchesSearchQuery(option, searchValue));
};
