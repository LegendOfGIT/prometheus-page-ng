import { HttpClient } from '@angular/common/http';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';

import { endpoints } from '../../environments/endpoints';
import { Item } from '../model/item';
import { ItemDto } from '../model/dto/item-dto';
import { ApiBase } from './api-base';
import { ApplicationConfiguration } from '../configurations/app';
import {isPlatformServer} from "@angular/common";
import {UserService} from "./user.service";
import {Wishlist} from "../model/wishlist";

@Injectable({
    providedIn: 'root'
})
export class WishlistItemsApiService extends ApiBase {
    private _items: Array<Item | null> = [];
    private _wishlists: Wishlist[] = [
      {
        isShared: false,
        description: '',
        itemsOnList: [],
        title: 'Wunschliste',
        id: 'abc-123'
      },
      {
        isShared: false,
        description: 'Die ultimative Wunschliste',
        itemsOnList: [],
        title: 'Jonathans Geburtstag',
        id: 'bcd-234'
      },
      {
        isShared: false,
        description: 'Die mega Wunschliste',
        itemsOnList: [],
        title: 'Marlenes Geburtstag',
        id: 'cde-345'
      },
      {
        isShared: false,
        description: 'Neue Wunschliste',
        itemsOnList: [],
        title: 'Für mich',
        id: 'def-456'
      }
    ];

    constructor(
      private http: HttpClient,
      private userService: UserService,
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

    get wishlists(): Wishlist[] {
      return this._wishlists;
    }

    set activeWishlistId(wishlistId: string) {
      this.userService.setActiveWishlistId(wishlistId);
    }

    get activeWishlist(): Wishlist | undefined {
      if (!this.userService.activeWishlistId) {
        return;
      }

      return this._wishlists.find((wishlist: Wishlist): boolean => wishlist.id === this.userService.activeWishlistId());
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

  private updateWishlist(userId: string): void {
    this.getItems(userId)
      .subscribe((items: (Item | null)[]): void => {
        this.items = items || [];
      });
  }

    public isItemOnWishlist(itemId: string): boolean {
      if(!this._items) {
        return false;
      }

      return this._items.filter(item => itemId == item?.itemId).length > 0;
    }

    public toggleWishlistItem(userId: string, item: Item | undefined): void {
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
