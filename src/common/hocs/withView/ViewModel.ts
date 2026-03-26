import { makeObservable, observable, action } from 'mobx';




 
export abstract class ViewModel<TProps extends {} = {}> {
  public props: TProps = {} as TProps;

  constructor() {
    makeObservable(this, {
      props: observable.ref,
      setProps: action,
    });
  }

  public setProps(newProps: TProps): void {
    this.props = newProps;
  }
}

export default ViewModel;
