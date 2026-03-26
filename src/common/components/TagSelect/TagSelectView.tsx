import React from 'react';
import { AsyncSelect } from '@ui/InfiniteScrollSelect/AsyncSelect';
import { ThemeSizes } from '@common/themes/common/types';
import TagSelectViewModel from './TagSelectView.model';

export interface TagSelectViewProps {
  value?: number;
  onChange?: (tagId: number) => void;
  placeholder?: string;
  size?: ThemeSizes;
  disabled?: boolean;
  append?: React.ReactNode;
  leftIcon?: string;
  nonIntegration?: boolean;
  integrated?: boolean;
  noBorder?: boolean;
  noPadding?: boolean;
  noHover?: boolean;
  viewModel: TagSelectViewModel;
}

const TagSelectView: React.FC<TagSelectViewProps> = ({ viewModel }) => {
 return (
    <AsyncSelect
      options={viewModel.options}
      onChange={viewModel.handleChange}
      value={viewModel.props.value}
      placeholder={viewModel.placeholder}
      size={viewModel.props.size || 'md'}
      disabled={viewModel.isDisabled}
      append={viewModel.props.append}
      leftIcon={viewModel.props.leftIcon}
      nonIntegration={viewModel.props.nonIntegration}
      integrated={viewModel.props.integrated}
      noBorder={viewModel.props.noBorder}
      noPadding={viewModel.props.noPadding}
      noHover={viewModel.props.noHover}
      onSearchChange={viewModel.handleSearchChange}
      onLoadMore={() => {}}
      hasMore={false}
      isLoadingMore={false}
    />
  );
};

export default TagSelectView;
