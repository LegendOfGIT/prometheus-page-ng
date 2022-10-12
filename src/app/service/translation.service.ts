import { Injectable } from '@angular/core';

import { I18nInterface } from 'src/app/i18n/i18n.interface';
import { I18nDeDe } from 'src/app/i18n/i18n.de_DE';
import { I18nEnUs } from 'src/app/i18n/i18n.en_US';

@Injectable({
    providedIn: 'root'
})
export class TranslationService  {

  private localeMapping = {
    'en_US': new I18nEnUs(),
    'de_DE': new I18nDeDe()
  };

  public _activeLocale;

  constructor() {
    this._activeLocale = localStorage.getItem('activeLocale') || 'en_US';
  }

  set activeLocale(activeLocale: string) {
    this._activeLocale = activeLocale;
    localStorage.setItem('activeLocale', activeLocale);
  }

  public getTranslations(): any {
    const i18Key = this._activeLocale as keyof typeof this.localeMapping;
    return this.localeMapping[i18Key].getTranslations();
  }
}
