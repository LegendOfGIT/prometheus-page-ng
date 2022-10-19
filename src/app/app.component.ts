import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserService } from './service/user.service';
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
    private wishlistItemsService: WishlistItemsApiService
  ) {

  }

  ngOnInit(): void {
    if (this.wishlistItemsService.items?.length) {
      return;
    }

    this.wishlistItemsService.getItems(this.userService.activeUser?.id || '')
      .pipe(takeUntil(this.destroyedService$))
      .subscribe((items) => { this.wishlistItemsService.items = items || []; });
  }


}
