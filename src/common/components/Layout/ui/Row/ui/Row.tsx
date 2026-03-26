import * as React from "react";
import { Stack } from "@ui/Layout/ui/Stack";
import { RowProps } from "@ui/Layout";

const Row = (props: RowProps) => <Stack orientation="horizontal" {...props}>{props.children}</Stack>;
export default React.memo(Row)
