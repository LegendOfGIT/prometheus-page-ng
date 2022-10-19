import { Component, Input } from '@angular/core';

import { Item } from '../../model/item';
import { UserService } from '../../service/user.service';
import { WishlistItemsApiService } from '../../service/wishlist-items-api.service';

@Component({
  selector: 'app-add-to-wishlist',
  templateUrl: './add-to-wishlist.component.html',
  styleUrls: ['./add-to-wishlist.component.scss']
})
export class AddToWishlistComponent {

  @Input() item: Item | undefined = undefined;

  constructor(
    private wishlistItemsService: WishlistItemsApiService,
    private userService: UserService
  ) {
  }

  get isItemOnWishlist(): boolean {
    return this.wishlistItemsService.isItemOnWishlist(this.item?.itemId || '');
  }

  toggleItem(): void {
    this.wishlistItemsService.toggleWishlistItem(this.userService.activeUser?.id || '', this.item);
  }

}
