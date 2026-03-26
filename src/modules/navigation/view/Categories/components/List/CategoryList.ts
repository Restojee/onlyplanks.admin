import { CollectionData } from "@ui/Collection/types";
import { CategoryItem } from "@/modules/navigation/view/Categories/common/types";
import { Category } from "@/modules/navigation/view/Categories";
import { CategoryItemMeta } from "@/modules/navigation/view/Categories/common/constants";
import { ViewModel } from "@common/hocs/withView";
import Computed from "@common/hocs/withView/decorators/Computed";
import OnWatch from "@common/hocs/withView/decorators/OnWatch";

export interface CategoryListProps {
  categories: CategoryItem[];
}

class CategoryList extends ViewModel<CategoryListProps> {
  constructor() {
    super();
  }

  @Computed()
  public get getCategoryItemProps(): CollectionData {
    return {
      items: this.props.categories,
      itemKey: CategoryItemMeta.Title,
      Component: Category.Item
    }
  }

  @OnWatch<CategoryList>(viewModel => viewModel.props.categories)
  public handleCategoriesChange(next: CategoryItem[], prev: CategoryItem[]) {
    
  }
}

export default CategoryList;
