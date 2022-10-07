import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';

import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent{

  private destroy = new Subject<boolean>();

  constructor(private router: Router,
              private socialAuthService: SocialAuthService,
              private userService: UserService) {
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

  get activeUser() {
    return this.userService.activeUser;
  }

}
