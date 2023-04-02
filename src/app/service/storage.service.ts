import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    }

    private isOnClientSide(): boolean {
      return isPlatformBrowser(this.platformId);
    }

    public getFromStorageById(storageId: string): any | null {
      const storageValue = this.isOnClientSide() ? localStorage.getItem(storageId) : undefined;
      if (!storageValue) {
        return null;
      }

      return JSON.parse(storageValue);
    }

    public storeWithId(storageId: string, entity: any | null): void {
      if (!this.isOnClientSide() || null == entity) {
        return;
      }

      localStorage.setItem(storageId, JSON.stringify(entity));
    }
}
