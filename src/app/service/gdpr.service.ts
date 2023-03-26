import {Injectable} from '@angular/core';
import {GdprDecision, GdprSettings} from '../model/gdpr-settings';
import {ConsentScope} from '../model/consent-item';
import {StorageService} from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class GdprService {

    private static STORAGE_ID_GDPR_SETTINGS: string = 'gdpr_settings';

    constructor(private storageService: StorageService) {
    }

    public getSettings(): GdprSettings | null {
      return this.storageService.getFromStorageById(GdprService.STORAGE_ID_GDPR_SETTINGS);
    }

    public storeSettings(settings: GdprSettings | undefined): void {
      if (!settings) {
        return;
      }

      this.storageService.storeWithId(GdprService.STORAGE_ID_GDPR_SETTINGS, settings);
    }

    public getConsentScopesWithConsent(): Array<ConsentScope> {
      if (GdprDecision.DeclinedAll === this.getSettings()?.gdprDecision || GdprDecision.NoDecision) {
        return [];
      }

      return [
        ConsentScope.Essential,
        ConsentScope.Functional,
        ConsentScope.Marketing
      ];
    }
}
