import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {WishlistItemsApiService} from 'src/app/service/wishlist-items-api.service';
import {Module, NavigationService} from 'src/app/service/navigation.service';
import {WishlistItem} from '../../model/wishlist-item';

@Component({
  selector: 'app-wishlist-items',
  templateUrl: './wishlist-items.component.html',
  styleUrls: ['./wishlist-items.component.scss']
})
export class WishlistItemsComponent implements OnInit {
    private deleteTimers: DeleteItemTimer[] = [];
    private deleteWishlistTimerHandle: any;

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

    public removeItemOrCancelRemove(item: WishlistItem | null): void {
      const deleteTimer: DeleteItemTimer | undefined = this.deleteTimers
        .find((deleteTimer: DeleteItemTimer): boolean => deleteTimer.item === item);

      if (deleteTimer) {
        clearTimeout(deleteTimer.deleteTimerHandle);
        this.deleteTimers = this.deleteTimers.filter((deleteTimer: DeleteItemTimer): boolean => deleteTimer.item !== item)
        return;
      }

      this.deleteTimers.push({
        deleteTimerHandle: setTimeout(
          () => this.itemsService.removeItemFromWishlist(item?.id ?? ''),
          5000),
        item
      });
    }

    public deleteWishlistOrCancelDelete(): void {
      if (this.deleteWishlistTimerHandle) {
        clearTimeout(this.deleteWishlistTimerHandle);
        this.deleteWishlistTimerHandle = undefined;
        return;
      }

      this.deleteWishlistTimerHandle = setTimeout(
        () => this.itemsService
          .deleteWishlist()
          .subscribe(() => this.router.navigate(['/', 'wishlists'])),
        5000
      );
    }

    public isDeletionTimerActive(item: WishlistItem | null): boolean {
      return this.deleteTimers
        .find((deleteTimer: DeleteItemTimer): boolean => deleteTimer.item === item) !== undefined;
    }

    get WishlistDeletionTimerActive(): boolean {
      return this.deleteWishlistTimerHandle !== undefined;
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

interface DeleteItemTimer {
  deleteTimerHandle: any;
  item: WishlistItem | null;
}
