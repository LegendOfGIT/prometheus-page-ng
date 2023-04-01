import { HttpClient } from '@angular/common/http';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';

import { endpoints } from '../../environments/endpoints';
import { Item } from '../model/item';
import { ItemDto } from '../model/dto/item-dto';
import { ApiBase } from './api-base';
import { ApplicationConfiguration } from '../configurations/app';
import {isPlatformServer} from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class WishlistItemsApiService extends ApiBase {

    private _items: Array<Item | null> = [];

    constructor(
      private http: HttpClient,
      @Inject(PLATFORM_ID) private platformId: Object
    ) {
        super(ApplicationConfiguration.API_BASE);
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
        if (isPlatformServer(this.platformId)) {
          return of([]);
        }

        const url = this.get(endpoints.getWishlistItems, {
          searchPattern: '',
          userId
        });

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
