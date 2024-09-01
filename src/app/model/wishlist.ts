import {WishlistItem} from './wishlist-item';

export class Wishlist {
  public id: string = '';
  public isShared: boolean = false;
  public title: string = '';
  public description: string = '';
  public itemsOnList: WishlistItem[] = [];
}
