import * as React from "react";
import { CollectionProps } from "@ui/Collection/types";

const Collection = <Item extends {}>(props: CollectionProps<Item>) => {

  const { data } = props;
  const { items, itemKey, Component } = data;

  return React.useMemo(() => items?.map((item: Item) =>
    <Component key={item[itemKey as keyof Item] as React.Key} {...item} />
  ), [items, itemKey, Component])
};

export default Collection;
