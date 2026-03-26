import React from 'react';
import { AsyncSelect } from '@ui/InfiniteScrollSelect/AsyncSelect';
import { ThemeSizes } from '@common/themes/common/types';
import LevelSelectViewModel from './LevelSelectView.model';

export interface LevelSelectViewProps {
  value?: number;
  onChange?: (levelId: number) => void;
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
  allowClear?: boolean;
  viewModel: LevelSelectViewModel;
}

const LevelSelectView: React.FC<LevelSelectViewProps> = ({ viewModel }) => {
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
      allowClear={viewModel.props.allowClear}
      onSearchChange={viewModel.handleSearchChange}
      onLoadMore={() => viewModel.loadNextPage()}
      hasMore={viewModel.hasMore}
      isLoadingMore={viewModel.isLoadingMore}
    />
  );
};

export default LevelSelectView;
