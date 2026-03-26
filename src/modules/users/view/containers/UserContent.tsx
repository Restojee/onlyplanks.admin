import React from 'react';
import { withView } from '@common/hocs/withView';
import { WithViewProps } from '@common/hocs/withView/types';
import UserContentModel, { UserContentProps } from './UserContent.model';
import { SidebarTabs } from '@ui/SidebarTabs';
import { ContentManagerToolbar } from '@common/components/ContentManagerToolbar';

const UserContentView: React.FC<WithViewProps<UserContentModel, UserContentProps>> = ({ viewModel }) => {
  return (
    <SidebarTabs tabs={viewModel.tabs} defaultActiveKey="completed" />
  );
};

export const UserContent = withView(UserContentView, UserContentModel);

export default UserContent;
