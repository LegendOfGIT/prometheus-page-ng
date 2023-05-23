import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, makeStateKey, Meta, SafeHtml, Title, TransferState} from '@angular/platform-browser';
import {DOCUMENT, isPlatformServer} from '@angular/common';

import {Module, NavigationService} from '../../service/navigation.service';
import {ItemsApiService} from '../../service/items-api.service';
import {Item} from '../../model/item';
import {CorrespondingItem} from '../../model/corresponding-item';
import {NavigationItem} from '../../model/navigation-item';
import {Navigation} from '../../configurations/navigation';
import {TranslationService} from '../../service/translation.service';
import {ItemDetails} from "../../model/item-details";
import {TrackingService} from '../../service/tracking.service';
import {TrackingActivityItem} from '../../model/tracking-activity-item';
import {TrackingInterestLevel} from '../../model/tracking-interest-level';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'single-product-view',
  templateUrl: './single-product-view.component.html',
  styleUrls: ['./single-product-view.component.scss']
})
export class SingleProductViewComponent implements OnInit {

  public itemId: string = '';

  public item: Item | null = null;

  public safeWhatsAppUri: SafeHtml | null = null;
  public safePinterestUri: SafeHtml | null = null;

  public showFullDescription = false;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private itemsService: ItemsApiService,
    private navigationService: NavigationService,
    private translation: TranslationService,
    private translationService: TranslationService,
    private titleService: Title,
    private metaService: Meta,
    private transferState: TransferState,
    private trackingService: TrackingService,
    private userService: UserService,
    @Inject(DOCUMENT) private doc: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    route.paramMap.subscribe((params) => {
      this.navigationService.activeModule = Module.SINGLE_PRODUCT_VIEW;
      this.itemId = params.get('itemId') || '';
    });

    if (isPlatformServer(platformId)) {
      return;
    }

    this.safeWhatsAppUri = this.getSanitizedUri([
      'whatsapp://send?text=',
      encodeURIComponent(this.translation.getTranslations().SHARE_FOUND_AT_WE_WANNA),
      encodeURIComponent(' - '),
      encodeURIComponent(window.location.href)
    ]);

    this.safePinterestUri = this.getSanitizedUri([
      'https://pinterest.com/pin/create/button/?url=',
      encodeURIComponent(window.location.href),
      '&media=',
      encodeURIComponent(this.item?.titleImage || ''),
      '&description=',
      encodeURIComponent(this.item?.title || '')
    ]);
  }

  private initialiseItem(): void {
    if (this.transferState.hasKey(makeStateKey('productItem'))) {
      this.item = this.transferState.get(makeStateKey('productItem'), null);
      return;
    }

    this.itemsService.getItemsById(this.itemId).subscribe(items => {
      if (!items?.length) {
        this.item = null;
        return;
      }

      this.item = items[0];
      if (isPlatformServer(this.platformId)) {
        this.transferState.set<Item | null>(makeStateKey('productItem'), this.item);
        this.renderSEOInformation();
      }
    });
  }

  private renderSEOInformation(): void {
    this.titleService.setTitle(
      (this.translationService.getTranslations().SEO_SINGLE_PRODUCT_VIEW_PAGE_TITLE || '')
        .replace('{product-name}', this.item?.title.substring(0, 50)));

    this.metaService.updateTag({ name: 'description', content: this.item?.seoDescription || (this.item?.description || '') });
    this.metaService.updateTag({ name: 'keywords', content: this.item?.seoKeywords || (this.item?.title || '') });
    this.metaService.updateTag({ name: 'og:title', content: this.item?.title || '' });
    this.metaService.updateTag({ name: 'og:image', content: this.item?.titleImage || '' });
    this.metaService.updateTag({ name: 'og:type', content: 'product' });

    const link: HTMLLinkElement = this.doc.createElement('link');
    this.doc.head.appendChild(link);
    link.setAttribute('rel', 'canonical');
    const productUri = 'https://www.wewanna.shop/' + this.doc.URL.replace(new RegExp('(http:\/\/|\/\/).*?\/'), '');
    link.setAttribute('href', productUri);

    const contentModel: HTMLScriptElement = this.doc.createElement('script');
    contentModel.setAttribute('type', 'application/ld+json');

    const lowestPrice = Item.getProviderItemWithLowestPrice(this.item);

    contentModel.innerHTML = JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: this.item?.title || '',
      description: this.item?.description || '',
      image: [this.item?.titleImage || ''],
      offers: !lowestPrice || 0 === lowestPrice.priceCurrent ? undefined : {
        '@type': 'Offer',
        url: productUri,
        priceCurrency: 'EUR',
        price: lowestPrice.priceCurrent
      }
    });
    this.doc.head.appendChild(contentModel);

  }

  ngOnInit() {
    this.initialiseItem();

    if (!this.item) {
      return;
    }

    const script: HTMLScriptElement = this.doc.createElement('script');
    script.innerHTML = 'setTimeout(function() { $(".carousel__viewport").slick({ "autoplay": true, "autoplaySpeed": 7000, "arrows": false}); });';
    this.doc.body.appendChild(script);
  }

  public pickedOffer(): void {
    if (!this.item) {
      return;
    }

    this.trackingService.addActivity(TrackingActivityItem.create()
      .setInformationItemId(this.item.itemId)
      .setInterestLevel(TrackingInterestLevel.EVEN_HIGHER));
  }

  public getShopNameFromUrl(url: string | undefined) {
    const match = (url || '').match(/\/\/(www.)?(.*?)\//);
    return match && match.length > 2 ? match[2] : '';
  }

  public getSanitizedUri(uriTokens: Array<string>): SafeHtml {
    return this.sanitizer.bypassSecurityTrustUrl(uriTokens.join(''));
  }

  public renderPrice(item: CorrespondingItem | null): string | undefined {
    return CorrespondingItem.renderPrice(item);
  }

  public getItemDetails(item: Item | null): Array<ItemDetails> {
    return Item.getItemDetails(item);
  }

  public toggleFullDescription(): void {
    this.showFullDescription = !this.showFullDescription;
  }

  get itemWithLowestPrice(): CorrespondingItem | null {
    if (!this.item) {
      return null;
    }

    return Item.getProviderItemWithLowestPrice(this.item);
  }

  get areThereMorePrices(): boolean {
    return (this.item?.providers || []).length > 1;
  }

  get moreExpensiveOfferItems(): Array<CorrespondingItem | null> {
    if (!this.areThereMorePrices) {
      return [];
    }

    return (this.item?.providers || [])
      .filter(providerItem => providerItem !== Item.getProviderItemWithLowestPrice(this.item))
      .filter(item => (item?.priceCurrent || 0) > 0)
      .sort((a, b) => (a?.priceCurrent || 0) - (b?.priceCurrent || 0));
  }

  get offerItemsWithoutPrice(): Array<CorrespondingItem | null> {
    if (!this.areThereMorePrices) {
      return [];
    }

    return (this.item?.providers || [])
      .filter(providerItem => providerItem !== Item.getProviderItemWithLowestPrice(this.item))
      .filter(item => 0 === (item?.priceCurrent || 0));
  }

  get navigationItemToCategory(): NavigationItem | undefined {
    const pathTokens = (this.item?.navigationPath || []);
    if (!pathTokens.length) {
      return;
    }

    return Navigation.getNavigationItemByToId(pathTokens[0]);
  }

  get activeNavigationItem(): NavigationItem | undefined {
    return Navigation.getNavigationItemByToId(this.item?.navigationPath[2] || '');
  }

  get slideImageUrls(): Array<string> {
    return [this.item?.titleImage || '']
      .concat(this.item?.imagesBig || [])
      .filter((value, index, array) => array.indexOf(value) === index);
  }

  get backToCategoryUrl(): string {
    const hashtags = this.userService.activeUser?.activeHashtags;

    return `/${(this.navigationItemToCategory?.pathParts || [''])[0]}${hashtags ? `?hashtags=${hashtags.join(',')}` : ''}`;
  }

  get backToHashtagsUrl(): string {
    const hashtags = this.userService.activeUser?.activeHashtags || [];
    if (!hashtags.length) {
      return '';
    }

    return `/hashtags/${hashtags.join(',')}`;
  }

  get productSizes(): string {
    if (!(this.item?.sizes || []).length) {
      return '';
    }

    return (this.item?.sizes || '').split(',').filter(size => this.item?.size !== size as string).join(', ');
  }

  get activeHashtags(): string {
    const hashtags = this.userService.activeUser?.activeHashtags || [];
    if (!hashtags.length) {
      return '';
    }

    return hashtags.join(' ');
  }
}
