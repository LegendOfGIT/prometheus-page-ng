import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { v4 as uuidV4 } from 'uuid';
import { WishlistItemsApiService } from 'src/app/service/wishlist-items-api.service';

import { User } from 'src/app/model/user';
import { StorageService } from './storage.service';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private static STORAGE_ID_ACTIVE_USER: string = 'active_user';
    private static STORAGE_ID_ANONYMOUS_USER: string = 'anonymous_user';

    private destroyedService$ = new Subject();
    private _anonymousUser: User | null = null;
    private _activeUser: User | null = null;

    constructor(private wishlistItemsService: WishlistItemsApiService,
                private storageService: StorageService,
                @Inject(PLATFORM_ID) private platformId: Object) {

      if (isPlatformServer(platformId)) {
        return;
      }

      this.initializeAnonymousUser();
      this.initializeActiveUser();

      const hashtagsFromUrl = this.getParameterFromUrl('hashtags');
      if (this.activeUser && hashtagsFromUrl) {
        this.activeUser.activeHashtags = hashtagsFromUrl.split(',');
        this.storeAllUsers();
      }
    }

    private getParameterFromUrl(parameterKey: string): string | null {
      return isPlatformBrowser(this.platformId) ? new URL(window.location.href).searchParams.get(parameterKey) : '';
    }

    private updateWishlist(userId: string): void {
      this.wishlistItemsService.getItems(userId)
        .pipe(takeUntil(this.destroyedService$))
        .subscribe((items) => {
          this.wishlistItemsService.items = items || [];
        });
    }

    private getUserFromStorageById(storageId: string): User | null {
      return this.storageService.getFromStorageById(storageId);
    }

    private storeUserWithId(storageId: string, user: User | null): void {
      if (null == user) {
        return;
      }

      this.storageService.storeWithId(storageId, user);
    }

    private removeUserFromStorageById(storageId: string): void {
      localStorage.removeItem(storageId);
    }

    private initializeActiveUser(): void {
      this._activeUser = this.getUserFromStorageById(UserService.STORAGE_ID_ACTIVE_USER);
    }
    private initializeAnonymousUser(): void {
      this._anonymousUser = this.getUserFromStorageById(UserService.STORAGE_ID_ANONYMOUS_USER);

      if (this._anonymousUser) {
        return;
      }

      this._anonymousUser = new User().setId(uuidV4());
      this.storeUserWithId(UserService.STORAGE_ID_ANONYMOUS_USER, this._anonymousUser);
    }

    private storeAllUsers(): void {
      this.storeUserWithId(UserService.STORAGE_ID_ANONYMOUS_USER, this._anonymousUser);
      this.storeUserWithId(UserService.STORAGE_ID_ACTIVE_USER, this._activeUser);
    }

    public logout(): void {
      this._activeUser = null;
      this.removeUserFromStorageById(UserService.STORAGE_ID_ACTIVE_USER);
      this.updateWishlist(this._anonymousUser?.id || '');
    }

    public setDisplayLocaleOfActiveUser(locale: string): void {
      this.activeUser!.localeForDisplay = locale;
      this.storeAllUsers();
    }

    public setHashTags(hashtags: Array<string>) {
      this.activeUser!.activeHashtags = hashtags;
      this.storeAllUsers();
    }

    get activeUser(): User | null {
      if (null == this._activeUser) {
        return this._anonymousUser;
      }

      return this._activeUser;
    }

    get isLoggedIn() : boolean {
      return !!this._activeUser;
    }

}
