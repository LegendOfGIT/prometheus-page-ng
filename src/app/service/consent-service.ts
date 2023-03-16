import { Injectable } from '@angular/core';
import { GdprService } from './gdpr.service';
import { CookieService } from 'ngx-cookie-service';
import { ConsentConfiguration } from '../configurations/consent';
import { StorageLocation } from '../model/consent-item';

@Injectable({
    providedIn: 'root'
})
export class ConsentService {

  constructor(
    private gdprService: GdprService,
    private cookieService: CookieService
  ) {
  }

  private deleteAllCookiesWithoutConsent(): void {
    const patternsOfCookiesToDelete = ConsentConfiguration.ITEMS
      .filter(
        item =>
          StorageLocation.Cookie === item.storageLocation &&
          -1 === this.gdprService.getConsentScopesWithConsent().indexOf(item.scope))
      .map(item => item.namePattern);

    Object.keys(this.cookieService.getAll()).forEach(cookieName => {
      if(!patternsOfCookiesToDelete.find(pattern => new RegExp(pattern).exec(cookieName))) {
        return;
      }

      this.cookieService.delete(cookieName);
    });
  }

  private deleteAllLocalStorageItemsWithoutConsent(): void {

  }

  public deleteInformationStoredWithoutConsent() : void {
    this.deleteAllCookiesWithoutConsent();
    //this.deleteAllLocalStorageItemsWithoutConsent();
  }
}
