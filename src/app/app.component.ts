import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    private wishlistItemsService: WishlistItemsApiService
  ) {

  }

  ngOnInit(): void {
    if (this.wishlistItemsService.items?.length) {
      return;
    }

    this.wishlistItemsService.getItems('')
      .pipe(takeUntil(this.destroyedService$))
      .subscribe((items) => { this.wishlistItemsService.items = items; });
  }


}
