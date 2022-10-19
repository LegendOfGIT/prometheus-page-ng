import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

import { UserService } from 'src/app/service/user.service';
import { WishlistItemsApiService } from 'src/app/service/wishlist-items-api.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public isSearchFieldActive: boolean = false;
  public searchPatternControl: FormControl = new FormControl();

  public lastLoggedInFlag: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private wishlistService: WishlistItemsApiService
  ) {
    this.activatePageReloadOnEveryRouteNavigation();
    this.subscribeSearchPatternChanges();
    this.lastLoggedInFlag = this.userService.isLoggedIn;
  }

  private activatePageReloadOnEveryRouteNavigation() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  private subscribeSearchPatternChanges(): void {
    this.searchPatternControl.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(() => {
        this.router.navigate([''], { queryParams: { search: this.searchPatternControl.value } });
      });
  }

  get hasJustLoggedIn(): boolean {
    if (this.lastLoggedInFlag != this.userService.isLoggedIn) {
      this.lastLoggedInFlag = this.userService.isLoggedIn;
      return true;
    }

    this.lastLoggedInFlag = this.userService.isLoggedIn;
    return false;
  }

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  get userHasAtLeastOneWishlistItem(): boolean {
    return this.wishlistService.items?.length > 0;
  }

}
