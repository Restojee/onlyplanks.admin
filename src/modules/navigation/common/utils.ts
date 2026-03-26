import { t } from "@common/locales";
import { navigationPrx } from "@/modules/navigation/common/constants";

export const getNavSection = (key: string) => `${navigationPrx}.Section.${key}`
export const getNavCategory = (key: string) => `${navigationPrx}.Category.${key}`
