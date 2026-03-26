import { inject } from 'inversify';
import { AppService } from '@common/services/app';
import { AppServiceInjectKey } from '@/constants';
import Computed from '@common/hocs/withView/decorators/Computed';
import Action from '@common/hocs/withView/decorators/Action';
import { ViewModel } from '@common/hocs/withView';

class LayoutModel extends ViewModel<{}> {
  constructor(
    @inject(AppServiceInjectKey) public appService: AppService
  ) {
    super();
    this.closeRightSidebar = this.closeRightSidebar.bind(this);
  }

  @Computed()
  get rightSidebarOpen(): boolean {
    return this.appService.rightSidebarOpen;
  }

  @Computed()
  get currentPageTitle(): string {
    return this.appService.currentPageTitle;
  }

  @Computed()
  get rightSidebarTitle(): string {
    return this.appService.rightSidebarTitle;
  }

  @Computed()
  get rightSidebarComponent(): React.ComponentType<any>  {
    return this.appService.rightSidebarComponent;
  }

  @Computed()
  get rightSidebarProps(): any {
    return this.appService.rightSidebarProps;
  }

  @Action()
  public closeRightSidebar(): void {
    this.appService.closeRightSidebar();
  }
}

export default LayoutModel;
