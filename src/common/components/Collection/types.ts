import * as React from "react";

export interface CollectionPropsGetter<Item = {}> {
  itemKey: keyof Item | string;
  items: Item[];
  Component: React.FC<Item>;
}
export type CollectionData<Item = {}> = CollectionPropsGetter<Item>
export interface CollectionProps<Item = {}> {
  data?: CollectionData<Item>
}
