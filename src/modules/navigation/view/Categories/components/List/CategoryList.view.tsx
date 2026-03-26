import { withView } from "@common/hocs/withView";
import * as React from "react";
import { Column } from "@ui/Layout";
import Collection from "@ui/Collection/Collection";
import { WithViewProps } from "@common/hocs/withView/types";
import CategoryList from "@/modules/navigation/view/Categories/components/List/CategoryList";
import { CategoryListViewProps } from "@/modules/navigation/view/Categories/common/types";

type CategoryListViewComponent = React.FC<WithViewProps<CategoryList, CategoryListViewProps>>;

const classRoot = 'CategoryListView';
const CategoryListView: CategoryListViewComponent = ({ viewModel }) => (
  <Column width={1} className={classRoot} py="sm" px="xs">
    <Collection data={viewModel.getCategoryItemProps} />
  </Column>
);

export default withView(CategoryListView, CategoryList);
