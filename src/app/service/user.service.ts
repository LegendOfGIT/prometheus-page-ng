import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { v4 as uuidV4 } from 'uuid';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { WishlistItemsApiService } from 'src/app/service/wishlist-items-api.service';

import { User } from 'src/app/model/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private static STORAGE_ID_ACTIVE_USER: string = 'active_user';
    private static STORAGE_ID_ANONYMOUS_USER: string = 'anonymous_user';

    private destroyedService$ = new Subject();
    private _anonymousUser: User | null = null;
    private _activeUser: User | null = null;

    constructor(private socialAuthService: SocialAuthService,
                private wishlistItemsService: WishlistItemsApiService) {
      this.initializeAnonymousUser();
      this.initializeActiveUser();

      this.socialAuthService.authState
        .subscribe((user: SocialUser) => {
          this._activeUser = new User()
            .setId(user.id)
            .setEmailAddress(user.email)
            .setFirstName(user.firstName)
            .setLastName(user.lastName);

          this.storeUserWithId(UserService.STORAGE_ID_ACTIVE_USER, this._activeUser);
          this.updateWishlist(this._activeUser.id || '');
        });

    }

    private updateWishlist(userId: string): void {
      this.wishlistItemsService.getItems(userId)
        .pipe(takeUntil(this.destroyedService$))
        .subscribe((items) => {
          this.wishlistItemsService.items = items || [];
        });
    }

    private getUserFromStorageById(storageId: string): User | null {
      const storageValue = localStorage.getItem(storageId);
      if (!storageValue) {
        return null;
      }

      return JSON.parse(storageValue);
    }

    private storeUserWithId(storageId: string, user: User | null): void {
      if (null == user) {
        return;
      }

      localStorage.setItem(storageId, JSON.stringify(user));
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

    public setActiveSearchProfile(profileId: string) {
      this.activeUser!.activeSearchProfile = profileId;
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