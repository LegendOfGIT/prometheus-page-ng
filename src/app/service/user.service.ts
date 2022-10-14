import { Injectable } from '@angular/core';

import { v4 as uuidV4 } from 'uuid';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

import { User } from 'src/app/model/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private static STORAGE_ID_ACTIVE_USER: string = 'active_user';
    private static STORAGE_ID_ANONYMOUS_USER: string = 'anonymous_user';

    private _anonymousUser: User | null = null;
    private _activeUser: User | null = null;

    constructor(private socialAuthService: SocialAuthService) {
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
    }

    public setDisplayLocaleOfActiveUser(locale: string): void {
      this.activeUser!.localeForDisplay = locale;
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
