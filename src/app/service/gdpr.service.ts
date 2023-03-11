import { Injectable } from '@angular/core';
import { GdprSettings } from '../model/gdpr-settings';

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
      console.log(settings);
      if (!settings) {
        return;
      }

      localStorage.setItem(GdprService.STORAGE_ID_GDPR_SETTINGS, JSON.stringify(settings));
    }
}
