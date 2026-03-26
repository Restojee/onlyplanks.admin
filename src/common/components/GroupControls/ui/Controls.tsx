import React from 'react';
import { type GroupControlsProps } from '@ui/GroupControls/common/types';
import { GroupControlsItemComponent } from '@ui/GroupControls/ui/GroupControlsItem';

const GroupControlsComponent: React.FC<GroupControlsProps> = () => <div />;

export const Controls = Object.assign(GroupControlsComponent, {
  Item: GroupControlsItemComponent,
});
