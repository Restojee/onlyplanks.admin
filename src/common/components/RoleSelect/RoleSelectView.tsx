import React from 'react';
import { AsyncSelect } from '@ui/InfiniteScrollSelect/AsyncSelect';
import type RoleSelectViewModel from './RoleSelectView.model';

const handleLoadMore = (): void => {};

export interface RoleSelectViewProps {
  value?: number;
  onChange?: (roleId: number) => void;
  placeholder?: string;
  size?: 'sm' | 'md';
  disabled?: boolean;
  append?: React.ReactNode;
  leftIcon?: string;
  nonIntegration?: boolean;
  integrated?: boolean;
  noBorder?: boolean;
  noPadding?: boolean;
  noHover?: boolean;
  allowClear?: boolean;
  viewModel: RoleSelectViewModel;
}

const RoleSelectView: React.FC<RoleSelectViewProps> = ({ viewModel }) => {
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
      onLoadMore={handleLoadMore}
      hasMore={false}
      isLoadingMore={false}
    />
  );
};

export default RoleSelectView;
