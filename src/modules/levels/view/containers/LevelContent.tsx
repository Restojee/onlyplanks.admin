import React from 'react';
import { withView } from '@common/hocs/withView';
import { WithViewProps } from '@common/hocs/withView/types';
import LevelContentModel, { LevelContentProps } from './LevelContent.model';
import { SidebarTabs } from '@ui/SidebarTabs';
import { ContentManagerToolbar } from '@common/components/ContentManagerToolbar';

const LevelContentView: React.FC<WithViewProps<LevelContentModel, LevelContentProps>> = ({ viewModel }) => {
  return (
    <SidebarTabs tabs={viewModel.tabs} defaultActiveKey="tags" />
  );
};

export const LevelContent = withView(LevelContentView, LevelContentModel);

export default LevelContent;
