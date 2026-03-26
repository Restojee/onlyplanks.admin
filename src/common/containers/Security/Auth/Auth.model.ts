import { inject } from 'inversify';
import { AuthServiceInjectKey } from './constants';
import AuthService from '@common/containers/Security/Auth/Auth.service';
import Computed from '@common/hocs/withView/decorators/Computed';
import OnMounted from '@common/hocs/withView/decorators/OnMounted';
import { ViewModel } from '@common/hocs/withView';

class AuthModel extends ViewModel<{}> {

  constructor(
    @inject(AuthServiceInjectKey)
    public authService: AuthService
  ) {
    super();
  }

  @OnMounted()
  public async me() {
    this.authService.me()
  }

  @Computed()
  public get isAuthorized(): boolean {
    return this.authService.isAuthorized;
  }

  @Computed()
  public get isLoading(): boolean {
    return this.authService.isLoading;
  }
}

export default AuthModel;
