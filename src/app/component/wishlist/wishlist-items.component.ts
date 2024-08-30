import {Component, OnInit} from '@angular/core';

import {Item} from 'src/app/model/item';
import {WishlistItemsApiService} from 'src/app/service/wishlist-items-api.service';
import {Module, NavigationService} from 'src/app/service/navigation.service';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-wishlist-items',
  templateUrl: './wishlist-items.component.html',
  styleUrls: ['./wishlist-items.component.scss']
})
export class WishlistItemsComponent implements OnInit {
    constructor(
      private itemsService: WishlistItemsApiService,
      private activatedRoute: ActivatedRoute,
      navigationService: NavigationService
    ) {
      navigationService.activeModule = Module.WISHLIST;
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: Params): void => {
          if (params['wishlistId']) {
            this.itemsService.activeWishlistId = params['wishlistId'];
          }
        });
    }

    get items(): Array<Item | null> {
      return this.itemsService.items;
    }

    get WishlistTitle(): string {
      return this.itemsService.activeWishlist?.title ?? '';
    }
}
