import * as React from "react";
import { observer } from "mobx-react-lite";
import { DIContext } from "@common/hooks/useInjection";
import { Constructor } from "@common/utils/di/types";
import { WithoutViewModel, WithViewProps } from "@common/hocs/withView/types";
import { createObservers } from "@common/hocs/withView/utils/createObservers";
import { createWatchers } from "@common/hocs/withView/utils/createWatchers";
import { callOnInit } from "@common/hocs/withView/utils/callOnInit";
import { callOnUnmounted } from "@common/hocs/withView/utils/callOnUnmounted";
import { ViewModel } from "./ViewModel";
import { runInAction } from 'mobx';

const useValue = <T extends unknown>(state: () => T) => React.useState(state)[0];

function withView<
  Instance extends ViewModel<Props>,
  Props extends {} = {}>(
  ViewComponent: React.FC<WithViewProps<Instance, Props>>,
  ViewModelClass: Constructor<Instance>
) {
  const ObservableComponent = observer(ViewComponent);

  return React.forwardRef<HTMLElement, WithoutViewModel<Props>>(
    (props: Props, ref) => {
      const container = React.useContext(DIContext);

      const viewModel = useValue<Instance>(() => {
        let viewModel: Instance;
        try {
          viewModel = container.get(ViewModelClass);
        } catch (e) {
          container.add(ViewModelClass, ViewModelClass);
          viewModel = container.get(ViewModelClass);
        }

        viewModel.setProps(props)
        createObservers(viewModel);
        createWatchers(viewModel);
        callOnInit(viewModel);

        return viewModel;
      });

      React.useEffect(() => runInAction(() => {
        viewModel.setProps(props)
      }));

      React.useEffect(() => {
        return () => {
          callOnUnmounted(viewModel);
        };
      }, []);

      if (!container) {
        throw new Error("DI container not found. Ensure withModule is used.");
      }

      return <ObservableComponent ref={ref} {...props as Props} viewModel={viewModel} />;
    }
  );
}

export default withView;
