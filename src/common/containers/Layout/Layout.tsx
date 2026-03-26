import * as React from "react";
import { Column, Paper, Row } from "@ui/Layout";
import SidePanel from "@common/containers/SidePanel/SidePanel";
import { Scroll } from "@common/components/Scroll";
import { layoutClassPrx } from "@common/containers/Layout/constants";
import { Splitter, SplitterDirection } from "@common/components/Splitter";
import { RightSidebar } from "@common/components/RightSidebar";
import { withView } from "@common/hocs/withView";
import { WithViewProps } from "@common/hocs/withView/types";
import LayoutModel from "./Layout.model";

import "./Layout.scss";
import { Divider } from '@ui/Divider';
import { Typography } from '@ui/Typography';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<WithViewProps<LayoutModel, LayoutProps>> = ({ viewModel, children }) => {
  const mainContent = (
    <Paper bgColor="paletteBackgroundTertiary">
      <Column>
        {viewModel.currentPageTitle && (
          <Row py="sm" px="md">
            <Typography size="lg" fontWeight="bold">{viewModel.currentPageTitle}</Typography>
          </Row>
        )}
        <Divider orientation="horizontal" />
        <Scroll>
          {children}
        </Scroll>
      </Column>
    </Paper>
  );

  const rightSidebar =
    <RightSidebar
      title={viewModel.rightSidebarTitle}
      component={viewModel.rightSidebarComponent}
      props={viewModel.rightSidebarProps}
      onClose={viewModel.closeRightSidebar}
    />

  return (
    <Paper className={layoutClassPrx} bgColor="paletteBackgroundPrimary">
      <Row height={1}>
        <SidePanel />
        <Column width={1} height={1}>
          <Splitter
            direction={SplitterDirection.Horizontal}
            minSize={400}
            maxSize={800}
            defaultSize={600}
          >
            {mainContent}
            {viewModel.rightSidebarOpen && rightSidebar}
          </Splitter>
        </Column>
      </Row>
    </Paper>
  );
};

export default withView(Layout as any, LayoutModel);
