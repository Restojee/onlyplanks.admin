import Computed from "@common/hocs/withView/decorators/Computed";
import Action from "@common/hocs/withView/decorators/Action";
import { ViewModel } from "@common/hocs/withView";
import { IntlService, IntlServiceInjectKey, SupportedLanguage } from "@common/services/intl";
import { inject } from "inversify";

export class LanguageSwitcherViewModel extends ViewModel<{}> {

  public static languageNames: Record<SupportedLanguage, string> = {
    [SupportedLanguage.RU]: 'Русский',
    [SupportedLanguage.EN]: 'English'
  };

  constructor(@inject(IntlServiceInjectKey) private intlService: IntlService) {
    super();
  }

  @Computed()
  public get supportedLanguages(): SupportedLanguage[] {
    return [SupportedLanguage.RU, SupportedLanguage.EN];
  }

  @Computed()
  public get getLanguageName(): (language: SupportedLanguage) => string {
    return (language: SupportedLanguage) => {
      return LanguageSwitcherViewModel.languageNames[language];
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
    await this.intlService.changeLanguage(language)
  }
}
