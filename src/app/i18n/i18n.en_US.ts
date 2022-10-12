import { I18nInterface } from './i18n.interface';

export class I18nEnUs implements I18nInterface {
  public getTranslations(): any {
    return {
      languageDeDe: 'german',
      languageEnUs: 'english (US)',
      profileLogout: "logout"
    }
  }
}
