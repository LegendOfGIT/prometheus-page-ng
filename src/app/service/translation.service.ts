import { Injectable } from '@angular/core';

import { I18nDeDe } from 'src/app/i18n/i18n.de_DE';
import { I18nEnUs } from 'src/app/i18n/i18n.en_US';

import { UserService } from './user.service';
import {HttpClient} from "@angular/common/http";
import {ApiBase} from "./api-base";
import {ApplicationConfiguration} from "../configurations/app";
import {endpoints} from "../../environments/endpoints";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TranslationService extends ApiBase {
  private localeMapping = {
    'en_US': new I18nEnUs(),
    'de_DE': new I18nDeDe()
  };

  constructor(private userService: UserService,
              private httpClient: HttpClient) {
    super(ApplicationConfiguration.API_BASE);
  }

  public getTranslations(locale: string = ''): any {
    const localeForDisplay = locale ? locale : this.userService.activeUser?.localeForDisplay || 'de_DE';

    const i18Key = localeForDisplay as keyof typeof this.localeMapping;

    if (!this.localeMapping[i18Key]) {
      return {};
    }

    return this.localeMapping[i18Key].getTranslations();
  }

  public getTranslationsFromApi(locale: string = ''): Observable<any> {
    locale = locale || 'de_DE';

    return this.httpClient.get(
      this.get(endpoints.contentGetTranslations, { locale })
    )
  }

  public saveTranslations(locale: string = '', translations: any): Observable<Object> {
    return this.httpClient.post(
      this.get(endpoints.contentUpdateTranslations, {}),
      {
        locale,
        translations
      }
    )
  }
}
