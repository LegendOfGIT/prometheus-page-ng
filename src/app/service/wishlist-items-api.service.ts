import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of, tap} from 'rxjs';

import { endpoints } from '../../environments/endpoints';
import { Item } from '../model/item';
import { ApiBase } from './api-base';
import { ApplicationConfiguration } from '../configurations/app';
import { UserService } from './user.service';
import { Wishlist } from '../model/wishlist';
import { WishlistItem } from '../model/wishlist-item';
import {CorrespondingItem} from "../model/corresponding-item";
import {MessagesService} from "./messages.service";
import {TranslationService} from "./translation.service";

@Injectable({
    providedIn: 'root'
})
export class WishlistItemsApiService extends ApiBase {
    private _items: Array<WishlistItem | null> = [];
    private _wishlists: Wishlist[] = [];

    constructor(
      private http: HttpClient,
      private userService: UserService,
      private messagesService: MessagesService,
      private translationService: TranslationService,
      @Inject(PLATFORM_ID) private platformId: Object
    ) {
        super(ApplicationConfiguration.API_BASE);
    }

    get items(): Array<WishlistItem | null> {
      return this._items;
    }

    set items(items: Array<WishlistItem | null>) {
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

    private addItemToWishlist(item: WishlistItem): void {
      this.http.put(
        this.get(endpoints.saveWishlistItem),
        {
          wishlistId: this.userService.activeUser?.activeWishlistId ?? '',
          userId: this.userService.activeUser?.id ?? '',
          ... item
        }
      ).subscribe((): void => {
        this.messagesService.message = {
          title: this.translationService.getTranslations()['MESSAGE_TITLE_WISHLIST'] ?? '',
          message: (this.translationService.getTranslations()['MESSAGE_WISHLIST_ADDED_TO_WISHLIST'] ?? '')
            .replace('{wishlistName}', this.activeWishlist?.title)
        };
        this.getItems();
      });
    }

    public removeItemFromWishlist(itemId: string): void {
      this.http.delete(
        this.get(endpoints.deleteWishlistItem),
        {
          body: {
            userId: this.userService.activeUser?.id ?? '',
            wishlistId: this.userService.activeWishlistId(),
            itemId
          }
        }
      ).subscribe((): void => {
        this.messagesService.message = {
          title: this.translationService.getTranslations()['MESSAGE_TITLE_WISHLIST'] ?? '',
          message: (this.translationService.getTranslations()['MESSAGE_WISHLIST_REMOVED_FROM_WISHLIST'] ?? '')
            .replace('{wishlistName}', this.activeWishlist?.title)
        };
        this.getItems();
      });
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
          this._wishlists = wishlists.sort((a, b) => (a.lastUpdatedOn ?? new Date()) > (b.lastUpdatedOn ?? new Date()) ? -1 : 1);
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
        this.getWishlists().subscribe((): void => {
          this.messagesService.message = {
            title: this.translationService.getTranslations()['MESSAGE_TITLE_WISHLIST'] ?? '',
            message: (this.translationService.getTranslations()['MESSAGE_WISHLIST_CREATED_WISHLIST'] ?? '')
              .replace('{wishlistName}', title)
          };
        });
      }));
  }

    public deleteWishlist(): Observable<void> {
      if (isPlatformServer(this.platformId)) {
        return of();
      }

      const wishlistName: string = this.activeWishlist?.title ?? '';

      return this.http
        .delete<void>(
          this.get(endpoints.deleteWishlist),
          {
            body: {
              id: this.userService?.activeWishlistId(),
              userId: this.userService.activeUser?.id ?? ''
            }
          }
        )
        .pipe(tap((): void => {
          this.userService.setActiveWishlistId('');

          this.getWishlists().subscribe((): void => {
            this.messagesService.message = {
              title: this.translationService.getTranslations()['MESSAGE_TITLE_WISHLIST'] ?? '',
              message: (this.translationService.getTranslations()['MESSAGE_WISHLIST_DELETED_WISHLIST'] ?? '')
                .replace('{wishlistName}', wishlistName)
            };
          })
        }));
    }

    public getItems(): void {
          if (isPlatformServer(this.platformId)) {
            return;
          }

          this.getWishlists().subscribe((wishlists: Wishlist[]): void => {
            const activeWishlist: Wishlist | undefined = wishlists.find((wishlist: Wishlist) => this.userService.activeUser?.activeWishlistId === wishlist.id);
            this._items = (activeWishlist?.items ?? []).sort((a, b): number => (a.lastUpdatedOn ?? new Date()) > (b.lastUpdatedOn ?? new Date()) ? -1 : 1);
          });
      }

    public isItemOnWishlist(itemId: string): boolean {
      return (this._items ?? []).filter((item: WishlistItem | null): boolean => itemId == item?.id).length > 0;
    }

    public toggleWishlistItem(item: Item | undefined): void {
      if (!item) {
        return;
      }

      const providerWithLowestPrice: CorrespondingItem | null = Item.getProviderItemWithLowestPrice(item);
      if (!providerWithLowestPrice) {
        return;
      }

      const { id, description, title, titleImage } = item;
      const { link } = providerWithLowestPrice;

      if (!this.isItemOnWishlist(item.id)) {
        this.addItemToWishlist({
          description,
          title,
          url: link,
          titleImage,
          itemWasBought: false,
          id,
          lastUpdatedOn: undefined
        });
        return;
      }

      this.removeItemFromWishlist(item.id);
    }
}
