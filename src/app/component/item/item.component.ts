import {
  AfterViewInit,
  Component,
  ElementRef, Inject,
  inject,
  Input,
  OnInit,
  Optional,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';

import {Item} from 'src/app/model/item';
import {TrackingService} from 'src/app/service/tracking.service';
import {TrackingActivityItem} from 'src/app/model/tracking-activity-item';
import {TrackingInterestLevel} from 'src/app/model/tracking-interest-level';
import {NavigationService} from '../../service/navigation.service';
import {NavigationItem} from '../../model/navigation-item';
import {ActivatedRoute, Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import {Navigation} from '../../configurations/navigation';
import {HyphenationPipe} from "../../pipes/web.pipe";
import {DiscountItem} from '../../model/discount-item';
import {Discounts} from '../../configurations/discounts';
import {UserService} from "../../service/user.service";
import {REQUEST} from "@nguniversal/express-engine/tokens";
import {Request} from "express";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, AfterViewInit {
    private hyphenationPipe: HyphenationPipe = inject(HyphenationPipe);
    private navigationService: NavigationService = inject(NavigationService);
    private platformId: Object = inject(PLATFORM_ID);
    private route: ActivatedRoute = inject(ActivatedRoute);
    private router: Router = inject(Router);
    private trackingService: TrackingService = inject(TrackingService);
    public currentImageIndex = 0;
    public imageUrl = '';

    constructor(
      @Optional() @Inject(REQUEST) private request: Request
    ) {
    }

    @ViewChild('itemSection') itemSection: ElementRef | undefined;

    @Input()
    public item: Item | null = null;

    @Input()
    public additionalCssClasses: string = '';

    @Input()
    public displayMode: ItemDisplayMode = ItemDisplayMode.DEFAULT;

    ngOnInit(): void {
      this.imageUrl = this.item?.titleImage || '';
    }

    ngAfterViewInit(): void {
      if (!this.isOnClientSide()) {
        return;
      }

      const threshold = 0.2; // how much % of the element is in view
      const observer: IntersectionObserver = new IntersectionObserver(
        (entries: Array<IntersectionObserverEntry>): void => {
          entries.forEach((entry: IntersectionObserverEntry): void => {
            if (!entry.isIntersecting) {
              return;
            }

            setTimeout((): void => {
                this.toggleImage();
                setInterval(() => this.toggleImage(),20000)
            }, Math.floor(Math.random() * 10000))

            observer.disconnect();
          });
        },
        { threshold }
      );

      if  (!this.itemSection) {
        return;
      }

      observer.observe(this.itemSection.nativeElement);
    }

    private toggleImage(): void {
      let imagesBig: Array<string> | string = this.item?.imagesBig || [];
      imagesBig = Array.isArray(imagesBig) ? imagesBig : [imagesBig];

      if (!imagesBig.length) {
        this.imageUrl = this.item?.titleImage || '';
        return;
      }

      this.currentImageIndex = imagesBig.length - 1 > this.currentImageIndex ? this.currentImageIndex + 1 : 0;
      this.imageUrl = imagesBig[this.currentImageIndex];
    }

    private isOnClientSide(): boolean {
      return isPlatformBrowser(this.platformId);
    }

    private getParameterFromUrl(parameterKey: string): string | null {
      return this.isOnClientSide() ? new URL(window.location.href).searchParams.get(parameterKey) : '';
    }

    public pickedInformation(item: Item, linkUrl: string, event: Event): void {
      this.trackingService.addActivity(
        TrackingActivityItem.create()
          .setInformationItemId(item.itemId)
          .setInformationItemLabel(this.hyphenationPipe.transform(item?.title))
          .setInterestLevel(TrackingInterestLevel.HIGH)
          .setSearchPattern(this.getParameterFromUrl('search') || '')
          .setFilters(this.getParameterFromUrl('filters') || '')
          .setTrackingId('item.clicked'));

      if (!UserService.isBotRequest(this.request) && !this.isCategoryItem() && !linkUrl.startsWith('https:')) {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then((): void => {
          this.router.navigateByUrl(linkUrl);
        });

        return;
      }
    }

    public exploreHashtag(hashtag: string, event: Event) {
      if (UserService.isBotRequest(this.request)) {
        return;
      }

      event.preventDefault();
      this.router.navigate(['/', 'hashtags', hashtag]);
      return;
    }

    public getSeoFriendlySingleProductViewUrl(item: Item | null): string {
      if (!item) {
        return '';
      }

      return `p/${item.id}/${this.hyphenationPipe.transform(item.title)}`;
    }

    public renderLowestPrice(item: Item): string {
        return Item.renderLowestPrice(item);
    }

    public getShopNameOfItem(): string {
      if (!(this.item?.providers || []).length) {
        return '';
      }

      const url: string = (this.item?.providers[0]?.link || '').replace(/\/[a-zA-Z]{2}\./, '/');
      const match: RegExpMatchArray | null = (url || '').match(/\/\/(www.)?(.*?)\//);
      return match && match.length > 2 ? match[2].toUpperCase().replace(/\..*/, '') : '';
    }

    private getNextNavigationItem(): NavigationItem | undefined {
        let items: Array<NavigationItem> = this.navigationService.nextNavigationItems;
        items = items?.length ? items : Navigation.getAllRootItems();

        return items
          .find((nextNavigationItem: NavigationItem): boolean =>
            -1 !== (this.item?.navigationPath || []).indexOf(nextNavigationItem.toId || ''));
    }

    private isCategoryItem(): boolean {
      return ItemDisplayMode.CATEGORY === this.displayMode;
    }

    private getCategoryUrl(): string {
      const searchPattern: string = this.route.snapshot?.queryParamMap?.get('search') as string;
      const navigationItem: NavigationItem | undefined = this.getNextNavigationItem();
      return '/' +
        (navigationItem?.pathParts || []).filter((pathPart: string) => pathPart).join('/') +
        (searchPattern ? `?search=${searchPattern}` : '');
    }

    get itemUrl(): string {
        if (this.isCategoryItem()) {
          return this.getCategoryUrl();
        }

        if (this.hasOnlyOneOffer) {
          return this.item?.providers[0]?.link || '';
        }

        return this.singleProductViewUrl;
    }

    get singleProductViewUrl(): string {
      return this.getSeoFriendlySingleProductViewUrl(this.item);
    }

    get linkTarget(): string {
      return this.hasOnlyOneOffer && ItemDisplayMode.CATEGORY !== this.displayMode ? this.item?.id || '' : '_self';
    }

    get showHashtags(): boolean {
      return ItemDisplayMode.DEFAULT === this.displayMode;
    }

    get hasOnlyOneOffer(): boolean {
      return 1 === this.item?.providers.length;
    }

    get showPrice(): boolean {
        return ItemDisplayMode.DEFAULT === this.displayMode || ItemDisplayMode.TEASER == this.displayMode;
    }

    get showWishlistIcon(): boolean {
      return ItemDisplayMode.DEFAULT === this.displayMode;
    }

    get itemTitle(): string {
      if (this.isCategoryItem()) {
        return `NAVIGATION_${this.getNextNavigationItem()?.toId || ''}`;
      }

      return this.item?.title || '';
    }

    get cssModifier(): string {
      return this.isCategoryItem() ? '--category' : '';
    }

    get showBig(): boolean {
      return ItemDisplayMode.TEASER !== this.displayMode;
    }

    get renderedReduction(): string {
      if (ItemDisplayMode.CATEGORY === this.displayMode) {
        return '';
      }

      return Item.renderReductionOfLowestPriceItem(this.item);
    }

    get showOfferDetailsLink(): boolean {
      return this.hasOnlyOneOffer && !this.isCategoryItem();
    }

    get showAlternateImage(): boolean {
      return ItemDisplayMode.CATEGORY !== this.displayMode;
    }

    get discountItem(): DiscountItem | undefined {
      if (this.isCategoryItem()) {
        return undefined;
      }

      return Discounts.getDiscountForItem(this.item);
    }
}

export enum ItemDisplayMode {
  DEFAULT,
  CATEGORY,
  TEASER
}
