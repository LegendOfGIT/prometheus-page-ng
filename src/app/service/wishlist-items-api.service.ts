import {HttpClient} from '@angular/common/http';
import {isPlatformServer} from '@angular/common';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Observable, of, tap} from 'rxjs';

import {endpoints} from '../../environments/endpoints';
import {Item} from '../model/item';
import {ApiBase} from './api-base';
import {ApplicationConfiguration} from '../configurations/app';
import {UserService} from './user.service';
import {Wishlist} from '../model/wishlist';
import {WishlistItem} from '../model/wishlist-item';
import {CorrespondingItem} from '../model/corresponding-item';
import {MessagesService} from './messages.service';
import {TranslationService} from './translation.service';
import {MessageType} from '../model/message';
import {Secrets} from '../configurations/secrets';

@Injectable({
    providedIn: 'root'
})
export class WishlistItemsApiService extends ApiBase {
    private _items: Array<WishlistItem | null> = [];
    private _activeWishlist: Wishlist | undefined;
    private _wishlists: Wishlist[] = [];
    private _wishlistHash: string = '';

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

      return this._activeWishlist;
    }

    set wishlistHash(wishlistHashtag: string) {
      this._wishlistHash = wishlistHashtag;
    }

    private async createWishlistWhenNecessary(): Promise<void> {
      if (this.userService.activeUser?.activeWishlistId) {
        return;
      }

      await this.createWishlist('Wunschliste').toPromise();
      const wishlists: Wishlist[] = await this.getWishlists().toPromise() ?? [];

      const wishlist: Wishlist | undefined = wishlists.length ? wishlists[0] : undefined;
      if (wishlist) {
        this.userService.setActiveWishlistId(wishlist.id);
        this._activeWishlist = wishlist;
      }
    }

    private addItemToWishlist(item: WishlistItem): void {
      this.createWishlistWhenNecessary().then((): void => {
        this.http.put(
          this.get(endpoints.wishlistSaveWishlistItem),
          {
            wishlistId: this.userService.activeUser?.activeWishlistId ?? '',
            userId: this.userService.activeUser?.id ?? '',
            ... item
          }
        ).subscribe((): void => {
          this.messagesService.message = {
            title: this.translationService.getTranslations()['MESSAGE_TITLE_WISHLIST'] ?? '',
            message: (this.translationService.getTranslations()['MESSAGE_WISHLIST_ADDED_TO_WISHLIST'] ?? '')
              .replace('{wishlistName}', this.activeWishlist?.title),
            type: MessageType.SUCCESS
          };
          this.getItems();
        });
      });
    }

    public removeItemFromWishlist(itemId: string): void {
      this.http.delete(
        this.get(endpoints.wishlistDeleteWishlistItem),
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
            .replace('{wishlistName}', this.activeWishlist?.title),
          type: MessageType.SUCCESS
        };
        this.getItems();
      });
    }

    private getWishlist(): Observable<Wishlist> {
      if (isPlatformServer(this.platformId)) {
        return of();
      }

      const url: string = this.get(endpoints.wishlistGetWishlist, {
        userId: this.userService.activeUser?.id ?? '',
        id: this._wishlistHash ? '' : this.userService.activeWishlistId(),
        sharedWithHash: this._wishlistHash
      });

      return this.http.get<Wishlist>(url);
    }

    public getWishlists(): Observable<Wishlist[]> {
      if (isPlatformServer(this.platformId)) {
        return of([]);
      }

      const url: string = this.get(endpoints.wishlistGetWishlists, {
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
          this.get(endpoints.wishlistCreateOrUpdateWishlist),
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
                .replace('{wishlistName}', title),
              type: MessageType.SUCCESS
            };
          });
        }));
    }

    public updateWishlist(wishlist: Wishlist): Observable<void> {
      if (isPlatformServer(this.platformId)) {
        return of();
      }

      return this.http
        .post<void>(
          this.get(endpoints.wishlistCreateOrUpdateWishlist),
          {
            userId: this.userService.activeUser?.id ?? '',
            ...wishlist
          }
        )
        .pipe(tap((): void => {
          this.getWishlist().subscribe((wishlist: Wishlist): void => {
            this._activeWishlist = wishlist
            this.messagesService.message = {
              title: this.translationService.getTranslations()['MESSAGE_TITLE_WISHLIST'] ?? '',
              message: (this.translationService.getTranslations()['MESSAGE_WISHLIST_UPDATED_WISHLIST'] ?? '')
                .replace('{wishlistName}', wishlist.title),
              type: MessageType.SUCCESS
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
          this.get(endpoints.wishlistDeleteWishlist),
          {
            body: {
              id: this.userService?.activeWishlistId(),
              userId: this.userService.activeUser?.id ?? ''
            }
          }
        )
        .pipe(tap((): void => {
          this.userService.setActiveWishlistId('');
          this._activeWishlist = undefined;
          this._items = [];

          this.getWishlists().subscribe((): void => {
            this.messagesService.message = {
              title: this.translationService.getTranslations()['MESSAGE_TITLE_WISHLIST'] ?? '',
              message: (this.translationService.getTranslations()['MESSAGE_WISHLIST_DELETED_WISHLIST'] ?? '')
                .replace('{wishlistName}', wishlistName),
              type: MessageType.SUCCESS
            };
          })
        }));
    }

    public getItems(): void {
        if (isPlatformServer(this.platformId)) {
          return;
        }

        this.getWishlist().subscribe((wishlist: Wishlist): void => {
          this._activeWishlist = wishlist;
          this._items = (wishlist?.items ?? []).sort((a, b): number => (a.lastUpdatedOn ?? new Date()) > (b.lastUpdatedOn ?? new Date()) ? -1 : 1);
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

    public shareWithHash(): void {
      const sharedWithHash: string = '' + Secrets.stringToSecretHash(`${this.userService.activeUser?.id ?? ''}|${this.activeWishlist?.id ?? ''}`);

      this.http
        .post<void>(
          this.get(endpoints.wishlistShareWishlist),
          {
            userId: this.userService.activeUser?.id ?? '',
            id: this.userService.activeWishlistId(),
            sharedWithHash
          }
        ).subscribe((): void => {
          this.messagesService.message = {
            title: this.translationService.getTranslations()['MESSAGE_TITLE_WISHLIST'] ?? '',
            message: (this.translationService.getTranslations()['MESSAGE_WISHLIST_SHARED'] ?? '')
              .replace('{wishlistName}', this.activeWishlist?.title ?? ''),
            type: MessageType.SUCCESS
          };

          this.getWishlist().subscribe((wishlist: Wishlist): Wishlist => this._activeWishlist = wishlist);
        });
    }

    public cancelShareWithHash(): void {
      this.http
        .post<void>(
          this.get(endpoints.wishlistCancelShareWishlist),
          {
            userId: this.userService.activeUser?.id ?? '',
            id: this.userService.activeWishlistId()
          }
        ).subscribe((): void => {
          this.messagesService.message = {
            title: this.translationService.getTranslations()['MESSAGE_TITLE_WISHLIST'] ?? '',
            message: (this.translationService.getTranslations()['MESSAGE_WISHLIST_NO_LONGER_SHARED'] ?? '')
              .replace('{wishlistName}', this.activeWishlist?.title ?? ''),
            type: MessageType.SUCCESS
          };

          this.getWishlist().subscribe((wishlist: Wishlist): Wishlist => this._activeWishlist = wishlist);
        });
    }

    public toggleItemWasBought(item: WishlistItem | undefined | null): void {
      if (!item) {
        return;
      }

      const itemWasBought = !(item.itemWasBought ?? false);
      this.http
        .post<void>(
          this.get(endpoints.wishlistWishlistItemBought),
          {
            userId: this.userService.activeUser?.id ?? '',
            wishlistId: this.userService.activeWishlistId(),
            itemId: item.id ?? '',
            itemWasBought
          }
        ).subscribe((): void => {
          this.messagesService.message = {
            title: this.translationService.getTranslations()['MESSAGE_TITLE_WISHLIST'] ?? '',
            message: (this.translationService.getTranslations()['MESSAGE_WISHLIST_BOUGHT_MARKED_AS'] ?? '')
              .replace('{itemBought}',
                this.translationService.getTranslations()[itemWasBought ? 'WISHLIST_ACTION_I_BUY_IT' : 'WISHLIST_ACTION_I_DO_NOT_BUY_IT']),
            type: MessageType.SUCCESS
          };

          this.getItems();
        });
    }

    public discoverAndAddItem(url: string): Observable<void> {
      return this.http
        .post<void>(
          this.get(endpoints.wishlistDiscoverAndAddWishlistItem),
          {
            userId: this.userService.activeUser?.id ?? '',
            wishlistId: this.userService.activeWishlistId(),
            url
          }
        );
    }
}
