import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from './user.service';
import { ApiBase } from './api-base';
import { ApplicationConfiguration } from 'src/app/configurations/app';
import { endpoints } from 'src/environments/endpoints';

@Injectable({
    providedIn: 'root'
})
export class TranslationService extends ApiBase {
  private requestedLocale = '';
  private translations: any = {};

  constructor(private userService: UserService,
              private httpClient: HttpClient) {
    super(ApplicationConfiguration.API_BASE);
  }

  public getTranslations(locale: string = ''): any {
    const localeForDisplay: string = locale ? locale : this.userService.activeUser?.localeForDisplay || 'de_DE';
    if (this.requestedLocale !== localeForDisplay) {
      this.getTranslationsFromApi(localeForDisplay).subscribe((translations) => this.translations = translations);
      this.requestedLocale = localeForDisplay;
    }

    return this.translations;
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

  get TranslationsLoaded(): boolean {
    return Object.keys(this.translations).length > 0;
  }
}
