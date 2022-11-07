import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserService } from './service/user.service';
import { SearchProfilesApiService } from './service/search-profiles-api.service';
import { WishlistItemsApiService } from './service/wishlist-items-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  private destroyedService$ = new Subject();

  title = 'prometheus-page';

  constructor(
    private userService: UserService,
    private searchProfilesApiService: SearchProfilesApiService,
    private wishlistItemsService: WishlistItemsApiService
  ) {

  }

  ngOnInit(): void {
    this.initialiseSearchProfiles();
    this.initialiseWishlist();
  }

  private initialiseSearchProfiles(): void {
    if (this.searchProfilesApiService.items?.length) {
      return;
    }

    this.searchProfilesApiService.getItems(this.userService.activeUser?.id || '')
      .pipe(takeUntil(this.destroyedService$))
      .subscribe((items) => { this.searchProfilesApiService.items = items || []; });
  }

  private initialiseWishlist(): void {
    if (this.wishlistItemsService.items?.length) {
      return;
    }

    this.wishlistItemsService.getItems(this.userService.activeUser?.id || '')
      .pipe(takeUntil(this.destroyedService$))
      .subscribe((items) => { this.wishlistItemsService.items = items || []; });
  }

}
