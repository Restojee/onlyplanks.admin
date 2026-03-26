import { inject } from 'inversify';
import { AuthServiceInjectKey } from '@common/containers/Security/Auth/constants';
import AuthService from '@common/containers/Security/Auth/Auth.service';
import { IntlService, IntlServiceInjectKey, SupportedLanguage } from '@common/services/intl';
import Action from '@common/hocs/withView/decorators/Action';
import Computed from '@common/hocs/withView/decorators/Computed';
import { ViewModel } from '@common/hocs/withView';

class SidePanelModel extends ViewModel<{}> {

  public static languageNames: Record<SupportedLanguage, string> = {
    [SupportedLanguage.RU]: 'Русский',
    [SupportedLanguage.EN]: 'English'
  };

  constructor(
    @inject(AuthServiceInjectKey)
    private authService: AuthService,
    @inject(IntlServiceInjectKey)
    private intlService: IntlService,
  ) {
    super();
    this.logout.bind(this)
  }

  @Computed()
  public get userName(): string {
    return this.authService.user?.username ?? 'Пользователь';
  }

  @Computed()
  public get supportedLanguages(): SupportedLanguage[] {
    return [SupportedLanguage.RU, SupportedLanguage.EN];
  }

  @Computed()
  public get getLanguageName(): (language: SupportedLanguage) => string {
    return (language: SupportedLanguage) => {
      return SidePanelModel.languageNames[language];
    };
  }

  @Computed()
  public get isLanguageActive(): (language: SupportedLanguage) => boolean {
    return (language: SupportedLanguage) => {
      return this.intlService.actualLanguage === language;
    };
  }

  @Action()
  public async changeLanguage(language: SupportedLanguage): Promise<void> {
    await this.intlService.changeLanguage(language);
  }

  @Action()
  public logout = () => {
    this.authService.logout();
  }
}

export default SidePanelModel;
