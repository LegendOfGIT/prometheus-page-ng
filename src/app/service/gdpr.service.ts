import {Injectable} from '@angular/core';
import {GdprDecision, GdprSettings} from '../model/gdpr-settings';
import {ConsentScope} from "../model/consent-item";

@Injectable({
    providedIn: 'root'
})
export class GdprService {

    private static STORAGE_ID_GDPR_SETTINGS: string = 'gdpr_settings';
    private _settings: GdprSettings | null = null;

    public getSettings(): GdprSettings | null {
      const storageValue = localStorage.getItem(GdprService.STORAGE_ID_GDPR_SETTINGS);
      if (!storageValue) {
        return new GdprSettings();
      }

      return JSON.parse(storageValue);
    }

    public storeSettings(settings: GdprSettings | undefined): void {
      if (!settings) {
        return;
      }

      localStorage.setItem(GdprService.STORAGE_ID_GDPR_SETTINGS, JSON.stringify(settings));
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
