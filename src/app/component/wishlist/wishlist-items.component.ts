import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {WishlistItemsApiService} from 'src/app/service/wishlist-items-api.service';
import {Module, NavigationService} from 'src/app/service/navigation.service';
import {WishlistItem} from '../../model/wishlist-item';
import {MessagesService} from '../../service/messages.service';
import {TranslationService} from '../../service/translation.service';
import {MessageType} from '../../model/message';

@Component({
  selector: 'app-wishlist-items',
  templateUrl: './wishlist-items.component.html',
  styleUrls: ['./wishlist-items.component.scss']
})
export class WishlistItemsComponent implements OnInit, OnDestroy {
    private deleteWishlistTimerHandle: any;
    private subscriptions: Subscription[] = [];
    public showAdministrativeControls: boolean = false;
    public itemDiscoveryInProgress: boolean = false;
    public productDiscoveryUrl: string = '';

    constructor(
      private itemsService: WishlistItemsApiService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private messagesService: MessagesService,
      private translationService: TranslationService,
      navigationService: NavigationService
    ) {
      navigationService.activeModule = Module.WISHLIST;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    }

    ngOnInit(): void {
      this.subscriptions.push(this.activatedRoute.params.subscribe((params: Params): void => {
        if (params['wishlistId']) {
          this.itemsService.activeWishlistId = params['wishlistId'];
          this.showAdministrativeControls = true;
        }

        if (params['wishlistHash']) {
          this.itemsService.wishlistHash = params['wishlistHash'];
          this.showAdministrativeControls = false;
        }

        this.itemsService.getItems();
      }));
    }

    public deleteWishlistOrCancelDelete(): void {
      if (this.deleteWishlistTimerHandle) {
        clearTimeout(this.deleteWishlistTimerHandle);
        this.deleteWishlistTimerHandle = undefined;
        return;
      }

      this.deleteWishlistTimerHandle = setTimeout(
        () => this.subscriptions.push(this.itemsService
          .deleteWishlist()
          .subscribe(() => this.router.navigate(['/', 'wishlists']))),
        5000
      );
    }

    public shareWishlistOrStopSharing(): void {
      if (this.WishlistIsShared) {
        this.itemsService.cancelShareWithHash();
        return;
      }

      this.itemsService.shareWithHash();
    }

    public discoverAndAddItemByUrl(inputElement: HTMLInputElement): void {
      this.productDiscoveryUrl = inputElement.value;
      this.itemDiscoveryInProgress = true;
      this.itemsService.discoverAndAddItem(this.productDiscoveryUrl).subscribe({
        next: (): void => {
          this.messagesService.message = {
            title: this.translationService.getTranslations()['MESSAGE_TITLE_WISHLIST'] ?? '',
            message: (this.translationService.getTranslations()['MESSAGE_WISHLIST_ADDED_TO_WISHLIST'] ?? '')
              .replace('{wishlistName}', this.itemsService.activeWishlist?.title),
            type: MessageType.SUCCESS
          };

          this.itemsService.getItems();
          this.itemDiscoveryInProgress = false;
          this.productDiscoveryUrl = '';
        },
        error: (): void => {
          this.messagesService.message = {
            title: this.translationService.getTranslations()['MESSAGE_TITLE_WISHLIST'] ?? '',
            message: (this.translationService.getTranslations()['MESSAGE_WISHLIST_CAN_NOT_ADD_TO_WISHLIST'] ?? ''),
            type: MessageType.ERROR
          };
          this.itemDiscoveryInProgress = false;
        }
      });
    }

    public copyShareLinkToClipboard(inputElement: HTMLInputElement): void {
      inputElement.select();
      document.execCommand('copy');
      inputElement.setSelectionRange(0, 0);

      this.messagesService.message = {
        title: this.translationService.getTranslations()['MESSAGE_TITLE_WISHLIST'] ?? '',
        message: this.translationService.getTranslations()['MESSAGE_WISHLIST_SHARE_LINK_WAS_COPIED'] ?? '',
        type: MessageType.SUCCESS
      };
    }

    get WishlistDeletionTimerActive(): boolean {
      return this.deleteWishlistTimerHandle !== undefined;
    }

    get items(): Array<WishlistItem | null> {
      return this.itemsService.items.filter((item: WishlistItem | null): boolean => !item?.itemWasBought ?? false);
    }

    get boughtItems(): Array<WishlistItem | null> {
      return this.itemsService.items.filter((item: WishlistItem | null): boolean => item?.itemWasBought ?? false);
    }

    get WishlistDescription(): string {
      return this.itemsService.activeWishlist?.description ?? '';
    }

    get WishlistTitle(): string {
      return this.itemsService.activeWishlist?.title ?? '';
    }

    get WishlistIsShared(): boolean {
      return (this.itemsService.activeWishlist?.sharedWithHash ?? '') !== '';
    }

    get ShareLink(): string {
      return `https://www.wewanna.shop/wishlist/shared/${this.itemsService.activeWishlist?.sharedWithHash ?? ''}`;
    }
}
