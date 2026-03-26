import { withView } from '@common/hocs/withView';
import AuthModel from '@common/containers/Security/Auth/Auth.model';
import React, { PropsWithChildren } from 'react';
import { WithViewProps } from '@common/hocs/withView/types';
import Login from '@common/containers/Security/Login/Login';
import withModule from '@common/hocs/withModule';
import { PaletteInjectKey, ThemeInjectKey } from '@common/themes/common/constants';
import { Theme } from '@common/themes/core/Theme';
import Palette from '@common/themes/core/Pallete';
import { AuthApiInjectKey, AuthServiceInjectKey, UserApiInjectKey } from '@common/containers/Security/Auth/constants';
import AuthApi from '@common/api/auth/api';
import UserApi from '@common/api/users/api';
import AuthService from '@common/containers/Security/Auth/Auth.service';

const Auth: React.FC<WithViewProps<AuthModel, PropsWithChildren>> = ({ viewModel, children }) => {
  const { isAuthorized, isLoading } = viewModel;

  if (isLoading) {
    return null;
  }

  if (isAuthorized) {
    return children;
  }

  return <Login />
}

export default withModule({
  key: 'AuthModule',
  component: withView(Auth, AuthModel),
  providers: [
    {
      key: AuthServiceInjectKey,
      provide: AuthService,
    },
    {
      key: AuthApiInjectKey,
      provide: AuthApi,
    },
    {
      key: UserApiInjectKey,
      provide: UserApi,
    },
  ]
})
