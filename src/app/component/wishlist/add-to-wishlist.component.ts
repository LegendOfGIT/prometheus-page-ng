import { Component, Input } from '@angular/core';

import { Item } from '../../model/item';
import { UserService } from '../../service/user.service';
import { WishlistItemsApiService } from '../../service/wishlist-items-api.service';
import { TrackingService } from 'src/app/service/tracking.service';
import { TrackingActivityItem } from 'src/app/model/tracking-activity-item';
import { TrackingInterestLevel } from 'src/app/model/tracking-interest-level';

@Component({
  selector: 'app-add-to-wishlist',
  templateUrl: './add-to-wishlist.component.html',
  styleUrls: ['./add-to-wishlist.component.scss']
})
export class AddToWishlistComponent {

  @Input() item: Item | undefined = undefined;

  constructor(
    private wishlistItemsService: WishlistItemsApiService,
    private userService: UserService,
    private trackingService: TrackingService
  ) {
  }

  get isItemOnWishlist(): boolean {
    return this.wishlistItemsService.isItemOnWishlist(this.item?.itemId || '');
  }

  toggleItem(): void {
    this.wishlistItemsService.toggleWishlistItem(this.userService.activeUser?.id || '', this.item);

    if (!this.item?.itemId) {
      return;
    }

    const isOnWishlist = this.wishlistItemsService.isItemOnWishlist(this.item?.itemId || '');

    this.trackingService.addActivity(
      TrackingActivityItem.create()
        .setInformationItemId(this.item.itemId)
        .setInterestLevel(isOnWishlist ? TrackingInterestLevel.VERY_HIGH : TrackingInterestLevel.LOW)
        .setTrackingId(isOnWishlist ? 'wishlist.item.added' : 'wishlist.item.removed'));
  }

}
