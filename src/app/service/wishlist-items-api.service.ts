import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { endpoints } from '../../environments/endpoints';
import { Item } from '../model/item';
import { ItemDto } from '../model/dto/item-dto';
import { ItemsResponseDto } from '../model/dto/items-response-dto';
import { ApiBase } from './api-base';

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

    private addItemToWishlist(item: Item): void {
      if (!this._items) {
        return;
      }

      this._items.push(item);
    }

    private removeItemFromWishlist(item: Item): void {
      if (!this._items) {
        return;
      }

      this._items = this._items.filter(wishlistItem => item.itemId !== wishlistItem?.itemId);
    }

    getItems(searchPattern: string): Observable<Array<Item | null>> {

        const url = this.get(endpoints.wishlistItems, { searchPattern, userId: 'abc-123' });

        return this.http
           .get<ItemsResponseDto>(url)
           .pipe(map(dto => dto.items?.map(item => Item.fromModel(item))));

    }

    isItemOnWishlist(itemId: string): boolean {
      if(!this._items) {
        return false;
      }

      return this._items.filter(item => itemId == item?.itemId).length > 0;
    }

    toggleWishlistItem(item: Item | undefined): void {
      if (!item) {
        return;
      }

      if (!this.isItemOnWishlist(item.itemId)) {
        this.addItemToWishlist(item);
        return;
      }

      this.removeItemFromWishlist(item);
    }

}
