import { CategoryItemViewProps } from "@/modules/navigation/view/Categories/common/types";

export interface SectionMainViewProps {
  title: string;
  categories: CategoryItemViewProps[];
  caption?: string;
  isCompact?: boolean;
}

export interface SectionHeaderViewProps {
  title: string;
}
