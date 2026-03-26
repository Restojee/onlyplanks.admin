import { inject } from 'inversify';
import { AsyncService, AsyncServiceInjectKey } from '@common/services/async';
import { Computed, State } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';

class GlobalLoaderModel extends ViewModel<{}> {

  constructor(
    @inject(AsyncServiceInjectKey)
    private asyncService: AsyncService
  ) {
    super();
  }

  @Computed()
  get isLoading(): boolean {
    return this.asyncService.isLoading;
  }
}

export default GlobalLoaderModel
