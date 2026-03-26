import { type ListProps } from '@ui/Select/common/types';
import Combobox from '@ui/Combobox/Combobox';
import List from '@ui/List/ui/Base/List';
import * as React from 'react';

const SelectCore: React.FC<ListProps> = (props) => {
  const [isSelectOpen, setIsSelectOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(0);

  const { options } = props;

  return (
    <div>
      <List options={options} />
    </div>
  );
};

export default SelectCore;
