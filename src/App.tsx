import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Theme } from "@common/themes/core/Theme";
import Palette from "@common/themes/core/Pallete";
import { Layout } from "@common/containers/Layout";
import withModule from "@common/hocs/withModule";
import { PaletteInjectKey, ThemeInjectKey } from "@common/themes/common/constants";
import HttpConfig from "@common/http/HttpConfig";
import { HttpHandler } from "@common/http/HttpHandler";
import { HttpConfigInjectKey, HttpHandlerInjectKey } from "@common/http/constants";
import { HistoryServiceInjectKey } from "@common/services/router/common/constants";
import HistoryService from "@common/services/router/HistoryService";
import { observer } from "mobx-react-lite";
import { Column } from "@common/components/Layout";
import { IntlService, IntlServiceInjectKey } from "@common/services/intl";
import { AppService } from "@common/services/app";
import { AsyncService, AsyncServiceInjectKey } from "@common/services/async";
import Auth from '@common/containers/Security/Auth/Auth';
import { AppServiceInjectKey } from './constants';
import { PopupProvider } from '@ui/Popup';
import GlobalLoader from '@ui/GlobalLoader/GlobalLoader';
import AppRoutes from '@/routes';
import { NotificationContainer, NotificationProvider } from '@ui/Notification';
import { ModalContainer, ModalProvider } from '@ui/Modal';
import SystemSettingsApi from '@common/api/systemSettings/api';
import { SystemSettingsApiInjectKey } from '@common/api/systemSettings/constants';
import SystemSettingsService from '@common/services/systemSettings/SystemSettingsService';
import { SystemSettingsServiceInjectKey } from '@common/services/systemSettings/constants';

const App: React.FC = observer(() => {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <ModalProvider>
          <PopupProvider>
            <Column>
              <GlobalLoader />
              <Auth>
                <Layout>
                  <AppRoutes />
                </Layout>
              </Auth>
            </Column>
          </PopupProvider>
          <NotificationContainer />
          <ModalContainer />
        </ModalProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
})

export default withModule({
  key: 'AppModule',
  component: App,
  providers: [
    {
      key: ThemeInjectKey,
      provide: Theme,
    },
    {
      key: PaletteInjectKey,
      provide: Palette
    },
    {
      key: HttpConfigInjectKey,
      provide: HttpConfig,
    },
    {
      key: HttpHandlerInjectKey,
      provide: HttpHandler
    },
    {
      key: IntlServiceInjectKey,
      provide: IntlService
    },
    {
      key: HistoryServiceInjectKey,
      provide: HistoryService
    },
    {
      key: AppServiceInjectKey,
      provide: AppService
    },
    {
      key: AsyncServiceInjectKey,
      provide: AsyncService
    },
    {
      key: SystemSettingsApiInjectKey,
      provide: SystemSettingsApi
    },
    {
      key: SystemSettingsServiceInjectKey,
      provide: SystemSettingsService
    }
  ]
})
