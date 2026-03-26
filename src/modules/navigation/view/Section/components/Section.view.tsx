import { Column } from "@ui/Layout";
import * as React from "react";
import { Section } from "@/modules/navigation/view/Section";
import { SectionMainViewProps } from "@/modules/navigation/view/Section/types";
import { Category } from "@/modules/navigation/view/Categories";

const SectionMainView = React.memo<SectionMainViewProps>(
  ({ title, categories }) => (
    <>
      <Column width={1} gutter={5} px="lg">
        <Section.Header title={title} />
      </Column>
      <Category.List categories={categories} />
    </>
  )
);

export default SectionMainView;
