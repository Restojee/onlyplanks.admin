import { NavigationSectionEntity } from "@/modules/navigation/model/entities/NavigationSectionEntity";

export const NavigationDataAccessInjectKey = 'NavigationDataAccess';
export const NavigationActionsInjectKey = 'NavigationActionsInject';
export const NavigationSelectorsInjectKey = 'NavigationSelectorsInject';
export const navigationPrx = 'Navigation';

export const NavigationItemCategoryMeta: Record<string, keyof NavigationSectionEntity> = {
  Title: "title",
}
