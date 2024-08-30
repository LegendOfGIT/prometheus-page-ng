import {Component} from '@angular/core';
import {Wishlist} from '../../model/wishlist';
import {WishlistItemsApiService} from '../../service/wishlist-items-api.service';

@Component({
  selector: 'app-wishlists',
  templateUrl: './wishlists.component.html',
  styleUrls: ['./wishlists.component.scss']
})
export class WishlistsComponent {
  constructor(private wishlistService: WishlistItemsApiService) {
  }

  get Wishlists(): Wishlist[] {
    return this.wishlistService.wishlists;
  }
}
