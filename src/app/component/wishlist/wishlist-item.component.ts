import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {WishlistItem} from '../../model/wishlist-item';
import {WishlistItemsApiService} from '../../service/wishlist-items-api.service';

@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.scss']
})
export class WishlistItemComponent implements OnInit, OnDestroy {
    private deleteTimers: DeleteItemTimer[] = [];

    @Input()
    public item: WishlistItem | undefined | null;
    @Input()
    public showAdministrativeControls: boolean = false;

    constructor(private itemsService: WishlistItemsApiService) {
    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
    }

    public removeItemOrCancelRemove(item: WishlistItem | undefined | null): void {
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

    public markItemAsBoughtOrNotBought(item: WishlistItem | undefined | null): void {
      this.itemsService.toggleItemWasBought(item);
    }

    public isDeletionTimerActive(item: WishlistItem | undefined | null): boolean {
      return this.deleteTimers
        .find((deleteTimer: DeleteItemTimer): boolean => deleteTimer.item === item) !== undefined;
    }
}

interface DeleteItemTimer {
  deleteTimerHandle: any;
  item: WishlistItem | undefined | null;
}
