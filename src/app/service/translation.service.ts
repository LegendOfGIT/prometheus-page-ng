import { Injectable } from '@angular/core';

import { I18nDeDe } from 'src/app/i18n/i18n.de_DE';
import { I18nEnUs } from 'src/app/i18n/i18n.en_US';

import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class TranslationService  {

  private localeMapping = {
    'en_US': new I18nEnUs(),
    'de_DE': new I18nDeDe()
  };

  constructor(private userService: UserService) {
  }

  public getTranslations(locale: string = ''): any {
    const localeForDisplay = locale ? locale : this.userService.activeUser?.localeForDisplay;

    const i18Key = this.userService.activeUser
      ? localeForDisplay as keyof typeof this.localeMapping
      : 'de_DE';

    if (!this.localeMapping[i18Key]) {
      return {};
    }

    return this.localeMapping[i18Key].getTranslations();
  }
}
