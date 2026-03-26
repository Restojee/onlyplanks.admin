export interface CategoryItem {
  title: string;
  icon: string;
  caption?: string;
}

type CategoryMainOptions = Pick<CategoryItem, 'title' | 'caption' | 'icon'>;
interface CategoryMainProps {
  isCompact?: boolean;
  disabled?: boolean;
}

export interface CategoryListViewProps extends CategoryMainProps{
  categories?: CategoryItem[];
}

export interface CategoryItemViewProps
  extends CategoryMainOptions, CategoryMainProps {}
