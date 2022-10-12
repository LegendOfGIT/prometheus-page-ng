import { I18nInterface } from './i18n.interface';

export class I18nDeDe implements I18nInterface {
  public getTranslations(): any {
    return {
      languageDeDe: 'deutsch',
      languageEnUs: 'englisch (US)',
      profileLogout: 'ausloggen'
    }
  }
}
