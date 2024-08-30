import {Item} from './item';

export class Wishlist {
  public id = '';
  public isShared = false;
  public title = '';
  public description = '';
  public itemsOnList: Item[] = [];
}
