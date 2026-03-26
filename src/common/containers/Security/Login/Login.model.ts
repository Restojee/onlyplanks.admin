import { inject } from 'inversify';
import FormBuilder from '@common/services/form/FormBuilder';
import State from '@common/hocs/withView/decorators/State';
import AuthApi from '@common/api/auth/api';
import { LoginFormEntity } from '@common/containers/Security/Login/Login.entity';
import Action from '@common/hocs/withView/decorators/Action';
import AsyncAction from '@common/hocs/withView/decorators/AsyncAction';
import { FormEvent } from 'react';
import { AuthApiInjectKey, AuthServiceInjectKey } from '@common/containers/Security/Auth/constants';
import AuthService from '@common/containers/Security/Auth/Auth.service';
import { IntlService, IntlServiceInjectKey } from '@common/services/intl';
import { ViewModel } from '@common/hocs/withView';

class LoginModel extends ViewModel<{}> {

  @State()
  public form: FormBuilder<LoginFormEntity>;

  @State()
  public entity: LoginFormEntity;

  constructor(
    @inject(AuthApiInjectKey)
    private authApi: AuthApi,

    @inject(AuthServiceInjectKey)
    private authService: AuthService,

    @inject(IntlServiceInjectKey)
    private intlService: IntlService
  ) {
    super();
    this.entity = new LoginFormEntity();
    this.form = new FormBuilder(this.entity);

    this.handleSubmit.bind(this);
    this.buildForm.call(this);
  }

  @Action()
  public buildForm(): void {
    const t = this.intlService.t;
    this.form.group(groupBuilder => {
      groupBuilder.TextInput
        .make('login')
        .title(t('LoginForm.Login'))
    })
    this.form.group(groupBuilder => {
      groupBuilder.TextInput
        .make('password')
        .password()
        .title(t('LoginForm.Password'))
    })
    this.form.group(groupBuilder => {
      groupBuilder.Button
        .make()
        .withProps({
          title: t('LoginForm.Send'),
        })
        .submit()
    })

    this.form.withSubmit(this.handleSubmit.bind(this));
  }

  @AsyncAction()
  public async handleSubmit(_event: FormEvent) {
    const { login, password } = this.form.store.getValues();
    await this.authService.login(login, password)
  }
}

export default LoginModel;
