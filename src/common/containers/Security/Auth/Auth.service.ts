import { inject } from 'inversify';
import { AuthApiInjectKey, UserApiInjectKey } from '@common/containers/Security/Auth/constants';
import OnMounted from '@common/hocs/withView/decorators/OnMounted';
import State from '@common/hocs/withView/decorators/State';
import Computed from '@common/hocs/withView/decorators/Computed';
import UserApi from '@common/api/users/api';
import Action from '@common/hocs/withView/decorators/Action';
import AsyncAction from '@common/hocs/withView/decorators/AsyncAction';
import AuthApi from '@common/api/auth/api';
import { HttpConfigInjectKey } from '@common/http/constants';
import HttpConfig from '@common/http/HttpConfig';
import type { User } from '@common/api/users/models';

const POLICIES_STORAGE_KEY = 'userPolicies';
const OTHER_POLICIES_STORAGE_KEY = 'userOtherPolicies';

class AuthService {

  @State()
  public isAuthorized: boolean;

  @State()
  public user: User;

  @State()
  isLoading: boolean;

  @State()
  public policies: string[] = [];

  @State()
  public otherPolicies: string[] = [];

  constructor(
    @inject(UserApiInjectKey)
    private userApi: UserApi,
    @inject(AuthApiInjectKey)
    private authApi: AuthApi,
    @inject(HttpConfigInjectKey)
    private config: HttpConfig
  ) {
    this.isAuthorized = false;
    this.isLoading = true;
    this.policies = JSON.parse(localStorage.getItem(POLICIES_STORAGE_KEY) || '[]');
    this.otherPolicies = JSON.parse(localStorage.getItem(OTHER_POLICIES_STORAGE_KEY) || '[]');

    this.logout.bind(this);
    this.login.bind(this);
    this.me.bind(this);
  }

  @Computed()
  public get allPolicies(): string[] {
    return [...this.policies, ...this.otherPolicies];
  }

  public hasPolicy(policyKey: string): boolean {
    return this.allPolicies.includes(policyKey);
  }

  @OnMounted()
  public async me () {
    try {
      this.user = await this.userApi.me();
      this.isAuthorized = true;
    } finally {
      this.isLoading = false;
    }
  }

  @AsyncAction()
  public async login(userName: string, password: string) {
    const response = await this.authApi.adminLogin({ userName, password });
    this.config.updateToken(response.accessToken);
    this.policies = response.policies || [];
    this.otherPolicies = response.otherPolicies || [];
    localStorage.setItem(POLICIES_STORAGE_KEY, JSON.stringify(this.policies));
    localStorage.setItem(OTHER_POLICIES_STORAGE_KEY, JSON.stringify(this.otherPolicies));
    this.isAuthorized = true;
  }

  @Action()
  public logout() {
    this.config.updateToken(null);
    this.policies = [];
    this.otherPolicies = [];
    localStorage.removeItem(POLICIES_STORAGE_KEY);
    localStorage.removeItem(OTHER_POLICIES_STORAGE_KEY);
    this.isAuthorized = false;
  }
}

export default AuthService;
