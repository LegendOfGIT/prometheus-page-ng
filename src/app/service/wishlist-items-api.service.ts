import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { endpoints } from '../../environments/endpoints';
import { Item } from '../model/item';
import { ItemDto } from '../model/dto/item-dto';
import { ItemsResponseDto } from '../model/dto/items-response-dto';
import { ApiBase } from './api-base';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class WishlistItemsApiService extends ApiBase {

    private _items: Array<Item | null> = [];

    constructor(
      @Inject('API_BASE') apiBase: string,
      private http: HttpClient
    ) {
        super(apiBase);
    }

    get items(): Array<Item | null> {
      return this._items;
    }

    set items(items: Array<Item | null>) {
      this._items = items;
    }

    private addItemToWishlist(userId: string, item: Item): void {
      if (!this._items) {
        return;
      }

      this.http.put(
        this.get(endpoints.saveWishlistItem),
        { itemId: item.itemId, userId }
      ).subscribe();

      this._items.push(item);
    }

    private removeItemFromWishlist(userId: string, item: Item): void {
      if (!this._items) {
        return;
      }

      this.http.delete(
        this.get(endpoints.deleteWishlistItem, { itemId: item.itemId, userId }),
      ).subscribe();

      this._items = this._items.filter(wishlistItem => item.itemId !== wishlistItem?.itemId);
    }

    public getItems(userId: string): Observable<Array<Item | null>> {

        const url = this.get(endpoints.getWishlistItems, { userId });

        return this.http
           .get<ItemDto[]>(url)
           .pipe(map(items => items.map((item: ItemDto) => Item.fromModel(item))));

    }

    isItemOnWishlist(itemId: string): boolean {
      if(!this._items) {
        return false;
      }

      return this._items.filter(item => itemId == item?.itemId).length > 0;
    }

    toggleWishlistItem(userId: string, item: Item | undefined): void {
      if (!item) {
        return;
      }

      if (!this.isItemOnWishlist(item.itemId)) {
        this.addItemToWishlist(userId, item);
        return;
      }

      this.removeItemFromWishlist(userId, item);
    }

}
