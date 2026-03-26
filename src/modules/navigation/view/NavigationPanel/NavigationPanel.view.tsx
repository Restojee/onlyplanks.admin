import * as React from "react";
import { Column, Row } from '@ui/Layout';
import Collection from "@ui/Collection/Collection";
import { withView } from "@common/hocs/withView";
import NavigationPanelViewModel from "@/modules/navigation/view/NavigationPanel/NavigationPanelViewModel";
import { WithViewProps } from "@common/hocs/withView/types";
import { Section } from "@/modules/navigation/view/Section";


type NavigationPanelComponent = React.FC<WithViewProps<NavigationPanelViewModel>>

const NavigationPanel: NavigationPanelComponent =
  ({ viewModel }) => (
    <Row>
      <Column>
        <Collection data={viewModel.getNavigationItemsProps} />
      </Column>
    </Row>
  )

export default withView<NavigationPanelViewModel>(NavigationPanel, NavigationPanelViewModel);
