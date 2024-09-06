import {WishlistItem} from './wishlist-item';

export class Wishlist {
  public id: string = '';
  public sharedWithHash: string = '';
  public title: string = '';
  public description: string = '';
  public imageId: string = '';
  public items: WishlistItem[] = [];
  public lastUpdatedOn: Date | undefined;
}
