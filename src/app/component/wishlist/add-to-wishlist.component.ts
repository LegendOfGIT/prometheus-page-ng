import {Component, Inject, Input, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Item } from '../../model/item';
import { UserService } from '../../service/user.service';
import { WishlistItemsApiService } from '../../service/wishlist-items-api.service';
import { TrackingService } from 'src/app/service/tracking.service';
import { TrackingActivityItem } from 'src/app/model/tracking-activity-item';
import { TrackingInterestLevel } from 'src/app/model/tracking-interest-level';
import { HyphenationPipe } from '../../pipes/web.pipe';

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
    private trackingService: TrackingService,
    private hyphenationPipe: HyphenationPipe,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  private isOnClientSide(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private getParameterFromUrl(parameterKey: string): string | null {
    return this.isOnClientSide() ? new URL(window.location.href).searchParams.get(parameterKey) : '';
  }

  get isItemOnWishlist(): boolean {
    return this.wishlistItemsService.isItemOnWishlist(this.item?.id ?? '');
  }

  toggleItem(): void {
    this.wishlistItemsService.toggleWishlistItem(this.item);

    if (!this.item?.itemId) {
      return;
    }

    const isOnWishlist: boolean = this.wishlistItemsService.isItemOnWishlist(this.item?.id ?? '');

    this.trackingService.addActivity(
      TrackingActivityItem.create()
        .setInformationItemId(this.item.itemId)
        .setInformationItemLabel(this.hyphenationPipe.transform(this.item.title))
        .setInterestLevel(isOnWishlist ? TrackingInterestLevel.VERY_HIGH : TrackingInterestLevel.SLIGHTLY_LOW)
        .setFilters(this.getParameterFromUrl('filters') || '')
        .setSearchPattern(this.getParameterFromUrl('search') || '')
        .setTrackingId(isOnWishlist ? 'wishlist.item.added' : 'wishlist.item.removed'));
  }

}
