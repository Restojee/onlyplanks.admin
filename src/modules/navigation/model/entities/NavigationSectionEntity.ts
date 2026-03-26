import { NavigationItemCategoryEntity } from "@/modules/navigation/model/entities/NavigationItemCategoryEntity";

export class NavigationSectionEntity {
  constructor(
    public id: string,
    public title: string,
    public categories: NavigationItemCategoryEntity[]
  ) {}
}
