import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { Item } from 'src/app/model/item';
import { WishlistItemsApiService } from 'src/app/service/wishlist-items-api.service';

@Component({
  selector: 'app-wishlist-items',
  templateUrl: './wishlist-items.component.html',
  styleUrls: ['./wishlist-items.component.scss']
})
export class WishlistItemsComponent{

    constructor(
      private itemsService: WishlistItemsApiService
    ) {
    }

    get items(): Array<Item | null> {
      return this.itemsService.items;
    }

}
