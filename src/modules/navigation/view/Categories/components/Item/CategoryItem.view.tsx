import { Center, Flex, Row } from '@ui/Layout';
import { Icon } from "@ui/Icon";
import * as React from "react";
import { withView } from "@common/hocs/withView";
import CategoryItem from "@/modules/navigation/view/Categories/components/Item/CategoryItem";
import { WithViewProps } from "@common/hocs/withView/types";
import { CategoryItemViewProps } from "@/modules/navigation/view/Categories/common/types";
import RouterLink from "@ui/Link/ui/RouterLink";
import { Typography } from "@ui/Typography";

import "./CategoryItem.scss"
import { useTranslation } from "react-i18next";
import withAutoClasses from '@common/hooks/useAutoClasses';
import classNames from 'clsx';

const classRoot = 'UiCategoryItem';

type CategoryItemViewComponent = React.FC<WithViewProps<CategoryItem, CategoryItemViewProps>>;
const CategoryItemView: CategoryItemViewComponent = ({ viewModel, disabled }) => (
  <RouterLink
    className={classNames(classRoot, disabled && 'disabled')}
    to={viewModel.urlWithCategory}
    color="palettePanelCategory"
    fontSize="lg"
  >
    <Row gap="sm" pa="sm" align="center" width={1}>
      <Center width={24} height={24} nonIntegration>
        <Icon icon={viewModel.icon} variant="secondary" disabled={disabled} noHover />
      </Center>
      <Typography color="paletteTextNormal" disabled={disabled} ellipsis>
        {viewModel.title}
      </Typography>
    </Row>
  </RouterLink>
)

export default withView(CategoryItemView, CategoryItem);
