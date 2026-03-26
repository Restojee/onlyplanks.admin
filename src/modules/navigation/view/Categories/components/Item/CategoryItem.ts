import { ViewModel } from "@common/hocs/withView";
import { routeMap } from '@/routes';

export interface CategoryItemProps {
  id: string;
  title: string;
  icon: string;
  caption?: string;
}

class CategoryItem extends ViewModel<CategoryItemProps> {
  constructor() {
    super();
  }

  public get id(): string {
    return this.props.id;
  }

  public get title(): string {
    return this.props.title;
  }

  public get icon(): string {
    return this.props.icon;
  }

  public get caption(): string {
    return this.props.caption;
  }

  public get urlWithCategory(): string {
    return routeMap[this.props.id];
  }
}

export default CategoryItem;
