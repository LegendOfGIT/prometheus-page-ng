import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

import {GoogleLoginProvider, SocialAuthService} from '@abacritt/angularx-social-login';

import {UserService} from 'src/app/service/user.service';
import {TranslationService} from 'src/app/service/translation.service';
import {Module, NavigationService} from "../../service/navigation.service";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent{

  private destroy = new Subject<boolean>();

  constructor(private router: Router,
              private socialAuthService: SocialAuthService,
              private userService: UserService,
              private translationService: TranslationService,
              navigationService: NavigationService)
  {
    navigationService.activeModule = Module.PROFILE;
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => {
        this.router.navigate(['']);
      });
  }

  logoutUser(): void {
    this.userService.logout();
  }

  switchLanguage(locale: string): void {
     this.userService.setDisplayLocaleOfActiveUser(locale);
     window.location.reload();
  }

  get isLoggedIn() {
    return this.userService.isLoggedIn;
  }

  get activeUser() {
    return this.userService.activeUser;
  }

  get i18n(): any {
    return this.translationService.getTranslations();
  }

}
