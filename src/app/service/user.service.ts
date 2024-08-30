import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Subject } from 'rxjs';
import { Request } from 'express';

import { v4 as uuidV4 } from 'uuid';
import { WishlistItemsApiService } from 'src/app/service/wishlist-items-api.service';

import { DEFAULT_HASHTAGS, User } from 'src/app/model/user';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private static STORAGE_ID_ACTIVE_USER: string = 'active_user';
    private static STORAGE_ID_ANONYMOUS_USER: string = 'anonymous_user';

    private _anonymousUser: User | null = null;
    private _activeUser: User | null = null;
    private _activeHashtags: Array<string> | undefined;

    constructor(private storageService: StorageService,
                @Inject(PLATFORM_ID) private platformId: Object) {

      if (isPlatformServer(platformId)) {
        return;
      }

      this.initializeAnonymousUser();
      this.initializeActiveUser();

      const hashtagsFromUrl: string | null = this.getParameterFromUrl('hashtags');
      if (this.activeUser) {
        this.activeUser.activeHashtags = hashtagsFromUrl ? hashtagsFromUrl.split(',') : this.activeUser.activeHashtags || DEFAULT_HASHTAGS;
        this.activeUser.activeHashtags = this.activeUser.activeHashtags.map(hashtag => hashtag.substring(0, 20));
        this.storeAllUsers();
      }
    }

    private getParameterFromUrl(parameterKey: string): string | null {
      return isPlatformBrowser(this.platformId) ? new URL(window.location.href).searchParams.get(parameterKey) : '';
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

    private initializeActiveUser(): void {
      this._activeUser = this.getUserFromStorageById(UserService.STORAGE_ID_ACTIVE_USER);
      if (this._activeUser && this.synchronizeUserWithUserStructure(this._activeUser)) {
        this.storeUserWithId(UserService.STORAGE_ID_ACTIVE_USER, this._activeUser);
      }
    }
    private initializeAnonymousUser(): void {
      this._anonymousUser = this.getUserFromStorageById(UserService.STORAGE_ID_ANONYMOUS_USER);
      if (this._anonymousUser) {
        if (this.synchronizeUserWithUserStructure(this._anonymousUser)) {
          this.storeUserWithId(UserService.STORAGE_ID_ANONYMOUS_USER, this._anonymousUser);
        }
        return;
      }

      this._anonymousUser = new User().setId(uuidV4());
      this.storeUserWithId(UserService.STORAGE_ID_ANONYMOUS_USER, this._anonymousUser);
    }

    private synchronizeUserWithUserStructure(userEntity: User): boolean {
      const userStructure: User = new User();
      const keysOfEntity: string[] = Object.keys(userEntity);
      const keysOfStructure: string[] = Object.keys(userStructure);

      const propertiesToAdd: string[] = keysOfStructure.filter((key: string): boolean => -1 === keysOfEntity.indexOf(key));
      propertiesToAdd.forEach((property: string): void => { // @ts-ignore
        userEntity[property] = userStructure[property]; });

      const propertiesToRemove: string[] = keysOfEntity.filter((key: string): boolean => -1 === keysOfStructure.indexOf(key));
      propertiesToRemove.forEach((property: string): void => { // @ts-ignore
        delete userEntity[property]; });

      return propertiesToAdd.length > 0 || propertiesToRemove.length > 0;
    }

    private storeAllUsers(): void {
      this.storeUserWithId(UserService.STORAGE_ID_ANONYMOUS_USER, this._anonymousUser);
      this.storeUserWithId(UserService.STORAGE_ID_ACTIVE_USER, this._activeUser);
    }

    public setDisplayLocaleOfActiveUser(locale: string): void {
      this.activeUser!.localeForDisplay = locale;
      this.storeAllUsers();
    }

    public setActiveWishlistId(activeWishlistId: string): void {
      this.activeUser!.activeWishlistId = activeWishlistId;
      this.storeAllUsers();
    }

    public setHashTags(hashtags: Array<string>): void {
      this._activeHashtags = hashtags;

      if (this.activeUser) {
        this.activeUser.activeHashtags = hashtags;
      }

      this.storeAllUsers();
    }

    public activeWishlistId(): string {
      return this.activeUser?.activeWishlistId ?? '';
    }

    public getHashtags(): Array<string> {
      return this.activeUser?.activeHashtags || this._activeHashtags || DEFAULT_HASHTAGS;
    }

    public getFirstHashtag(): string {
      return this.getHashtags().length ? this.getHashtags()[0] : '';
    }

    public static getUserAgent(request: Request): string {
      if (request) {
        return request.headers['user-agent'] || '';
      }

      return window.navigator.userAgent || '';
    }

    public static isBotRequest(request: Request): boolean {
      const agent: string = this.getUserAgent(request).toLowerCase();

      return ['amazonbot', 'bingbot', 'googlebot', 'semrushbot', 'spider']
        .find((botPattern: string): boolean => -1 !== agent.indexOf(botPattern)) !== undefined;
    }

    get activeUser(): User | null {
      if (null == this._activeUser) {
        return this._anonymousUser;
      }

      return this._activeUser;
    }
}
