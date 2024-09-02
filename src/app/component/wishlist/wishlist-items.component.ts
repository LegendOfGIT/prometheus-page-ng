import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {WishlistItemsApiService} from 'src/app/service/wishlist-items-api.service';
import {Module, NavigationService} from 'src/app/service/navigation.service';
import {WishlistItem} from '../../model/wishlist-item';
import {MessagesService} from '../../service/messages.service';

@Component({
  selector: 'app-wishlist-items',
  templateUrl: './wishlist-items.component.html',
  styleUrls: ['./wishlist-items.component.scss']
})
export class WishlistItemsComponent implements OnInit {
    constructor(
      private itemsService: WishlistItemsApiService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      navigationService: NavigationService
    ) {
      navigationService.activeModule = Module.WISHLIST;
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: Params): void => {
          if (params['wishlistId']) {
            this.itemsService.activeWishlistId = params['wishlistId'];
            this.itemsService.getItems();
          }
        });
    }

    public removeItem(item: WishlistItem | null): void {
      this.itemsService.removeItemFromWishlist(item?.id ?? '');
    }

    public deleteWishlist(): void {
      this.itemsService.deleteWishlist().subscribe(() => this.router.navigate(['/', 'wishlists']));
    }

    get items(): Array<WishlistItem | null> {
      return this.itemsService.items;
    }

    get WishlistDescription(): string {
      return this.itemsService.activeWishlist?.description ?? '';
    }

    get WishlistTitle(): string {
      return this.itemsService.activeWishlist?.title ?? '';
    }
}
