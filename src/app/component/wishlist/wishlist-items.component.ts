import {Component} from '@angular/core';

import {Item} from 'src/app/model/item';
import {WishlistItemsApiService} from 'src/app/service/wishlist-items-api.service';
import {Module, NavigationService} from 'src/app/service/navigation.service';

@Component({
  selector: 'app-wishlist-items',
  templateUrl: './wishlist-items.component.html',
  styleUrls: ['./wishlist-items.component.scss']
})
export class WishlistItemsComponent{

    constructor(
      private itemsService: WishlistItemsApiService,
      navigationService: NavigationService
    ) {
      navigationService.activeModule = Module.WISHLIST;
    }

    get items(): Array<Item | null> {
      return this.itemsService.items;
    }

}
