export type WithViewProps<Instance, Props = {}> = {
  viewModel: Instance;
} & Props;

export type WithoutViewModel<Props> = Omit<Props, "viewModel">;
