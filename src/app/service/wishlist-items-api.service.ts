import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of, tap} from 'rxjs';
import { map } from 'rxjs/operators';

import { endpoints } from '../../environments/endpoints';
import { Item } from '../model/item';
import { ItemDto } from '../model/dto/item-dto';
import { ApiBase } from './api-base';
import { ApplicationConfiguration } from '../configurations/app';
import { UserService } from './user.service';
import { Wishlist } from '../model/wishlist';

@Injectable({
    providedIn: 'root'
})
export class WishlistItemsApiService extends ApiBase {
    private _items: Array<Item | null> = [];
    private _wishlists: Wishlist[] = [];

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

    set wishlists(wishlists: Wishlist[]) {
      this._wishlists = wishlists;
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

    public getWishlists(): Observable<Wishlist[]> {
      if (isPlatformServer(this.platformId)) {
        return of([]);
      }

      const url: string = this.get(endpoints.getWishlists, {
        userId: this.userService.activeUser?.id ?? ''
      });

      return this.http
        .get<Wishlist[]>(url)
        .pipe(tap((wishlists: Wishlist[]): void => {
          this._wishlists = wishlists;
        }));
    }

  public createWishlist(title: string): Observable<void> {
    if (isPlatformServer(this.platformId)) {
      return of();
    }

    if (title === '') {
      return of();
    }

    return this.http
      .post<void>(
        this.get(endpoints.createWishlist),
        {
          userId: this.userService.activeUser?.id ?? '',
          title
        }
      )
      .pipe(tap((): void => {
        this.getWishlists().subscribe((wishlists: Wishlist[]): void => {
          this._wishlists = wishlists;
        });
      }));
  }

    public deleteWishlist(id: string): Observable<void> {
      if (isPlatformServer(this.platformId)) {
        return of();
      }

      return this.http
        .delete<void>(
          this.get(endpoints.deleteWishlist),
          {
            body: {
              id,
              userId: this.userService.activeUser?.id ?? ''
            }
          }
        )
        .pipe(tap((): void => {
          if (id === this.userService.activeWishlistId()) {
            this.userService.setActiveWishlistId('');
          }

          this.getWishlists().subscribe((wishlists: Wishlist[]): void => {
            this._wishlists = wishlists;
          })
        }));
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
