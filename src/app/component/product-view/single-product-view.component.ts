import {ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {DomSanitizer, makeStateKey, Meta, SafeHtml, Title, TransferState} from '@angular/platform-browser';
import {DOCUMENT, isPlatformServer} from '@angular/common';
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  ScriptableContext
} from 'chart.js';

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
import {HyphenationPipe} from "../../pipes/web.pipe";
import {PriceHistoryItem} from "../../model/price-history-item";

@Component({
  selector: 'single-product-view',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './single-product-view.component.html',
  styleUrls: ['./single-product-view.component.scss']
})
export class SingleProductViewComponent implements OnInit {
  protected readonly CorrespondingItem = CorrespondingItem;

  public itemId: string = '';

  public item: Item | null = null;
  public itemWithLowestPrice: CorrespondingItem | null = null;
  public activeNavigationItem:  NavigationItem | undefined;

  public safeWhatsAppUri: SafeHtml | null = null;
  public safePinterestUri: SafeHtml | null = null;
  public safeVideoUris: Array<SafeHtml | null> = [];
  public priceHistoryChartA: Chart | ElementRef | null = null;
  public priceHistoryChartB: Chart | ElementRef | null = null;
  public showFullDescription = false;

  constructor(
    route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private itemsService: ItemsApiService,
    private navigationService: NavigationService,
    private translation: TranslationService,
    private translationService: TranslationService,
    private titleService: Title,
    private metaService: Meta,
    private transferState: TransferState,
    private trackingService: TrackingService,
    private hyphenationPipe : HyphenationPipe,
    @Inject(DOCUMENT) private doc: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    route.paramMap.subscribe((params: ParamMap): void => {
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

    Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, Tooltip);
  }

  private initialiseItem(): void {
    if (this.transferState.hasKey(makeStateKey('productItem'))) {
      this.item = this.transferState.get(makeStateKey('productItem'), null);
      return;
    }

    this.itemsService.getItemsById(this.itemId).subscribe((items: Array<Item | null>): void => {
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

  private getOffersObject(productUri: string): any {
    const lowestPrice: number | undefined = Item.getProviderItemWithLowestPrice(this.item)?.priceCurrent;
    const highestPrice: number | undefined = Item.getProviderItemWithHighestPrice(this.item)?.priceCurrent;

    if (!lowestPrice && !highestPrice) {
      return;
    }

    const providers: Array<CorrespondingItem | null> = this.item?.providers || [];
    const providerCount: number = providers.length;
    const offers: any = {
      '@type': providerCount > 1 ? 'AggregateOffer' : 'Offer',
      availability: !providers.find(provider => undefined !== provider?.amountInStock) || providers.find(provider => provider?.amountInStock) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      offerCount: providerCount,
      priceCurrency: 'EUR',
      url: productUri,
    };

    if (lowestPrice && 1 === providerCount) {
      offers.price = lowestPrice;
    }
    if (providerCount > 1) {
      offers.lowPrice = lowestPrice ? lowestPrice : undefined;
      offers.highPrice = highestPrice ? highestPrice : undefined;
    }

    return offers;
  };

  private renderSEOInformation(): void {
    this.titleService.setTitle(
      (this.translationService.getTranslations().SEO_SINGLE_PRODUCT_VIEW_PAGE_TITLE || '')
        .replace('{product-name}', this.item?.title.substring(0, 50)));

    this.metaService.updateTag({ name: 'description', content: this.item?.seoDescription || (this.item?.description || '') });
    // this.metaService.updateTag({ name: 'keywords', content: this.item?.seoKeywords || (this.item?.title || '') });
    this.metaService.updateTag({ name: 'og:title', content: this.item?.title || '' });
    this.metaService.updateTag({ name: 'og:image', content: this.item?.titleImage || '' });
    this.metaService.addTag({ name: 'og:image:height', content: '450' });
    this.metaService.addTag({ name: 'og:image:width', content: '450' });
    this.metaService.updateTag({ name: 'og:type', content: 'product' });

    const link: HTMLLinkElement = this.doc.createElement('link');
    this.doc.head.appendChild(link);
    link.setAttribute('rel', 'canonical');
    const productUri = 'https://www.wewanna.shop/' + this.doc.URL.replace(new RegExp('(http:\/\/|\/\/).*?\/'), '');
    link.setAttribute('href', productUri);

    const contentModel: HTMLScriptElement = this.doc.createElement('script');
    contentModel.setAttribute('type', 'application/ld+json');

    contentModel.innerHTML = JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: this.item?.title || '',
      description: this.item?.description || '',
      image: [this.item?.titleImage || ''],
      offers: this.getOffersObject(productUri)
    });
    this.doc.head.appendChild(contentModel);
  }

  ngOnInit(): void {
    this.initialiseItem();

    if (!this.item) {
      return;
    }

    this.itemWithLowestPrice = Item.getProviderItemWithLowestPrice(this.item);
    this.activeNavigationItem = Navigation.getNavigationItemByToId(this.item?.navigationPath[2] || '');
    this.safeVideoUris = (this.item.youtubeLinks || []).map((link) => this.getSanitizedResourceUri(link));

    const script: HTMLScriptElement = this.doc.createElement('script');
    script.innerHTML = 'setTimeout(function() { $(".carousel__viewport").slick({ "autoplay": true, centerMode: true, centerPadding: "20px", "autoplaySpeed": 7000, "arrows": false}); });';
    this.doc.body.appendChild(script);

    this.renderPriceHistory();
  }

  private getPriceHistoryTimeSpanInMonths(): number {
    const oldestDateInPriceHistory: Date | undefined = this.getOldestDateInPriceHistory();

    const threeMonthAgo: Date = new Date();
    threeMonthAgo.setMonth(threeMonthAgo.getMonth() - 3);
    threeMonthAgo.setHours(0, 0, 0, 0);

    const sixMonthAgo: Date = new Date();
    sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);
    sixMonthAgo.setHours(0, 0, 0, 0);

    return undefined === oldestDateInPriceHistory ?
      1 :
      oldestDateInPriceHistory <= sixMonthAgo ? 6 :
      oldestDateInPriceHistory <= threeMonthAgo ? 3 :
      1;
  }

  private renderPriceHistory(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    if (!this.item?.priceHistory?.length) {
      return;
    }

    let aMonthAgo: Date = new Date();
    aMonthAgo.setMonth(aMonthAgo.getMonth() - this.getPriceHistoryTimeSpanInMonths());
    aMonthAgo.setHours(0, 0, 0, 0);

    const tommorow: Date = new Date();
    tommorow.setDate(tommorow.getDate() + 1);
    tommorow.setHours(0, 0, 0, 0);

    const data: Array<any> = [];
    const firstLowestCurrentPrice: PriceHistoryItem = (this.item?.priceHistory || [{}])[0];
    let lastKnownLowestPrice: number = firstLowestCurrentPrice?.lowestCurrentPrice || 0;

    data.push({
      color: '#DE5935',
      day: `${aMonthAgo.getDate().toString().padStart(2, '0')}.${(aMonthAgo.getMonth() + 1).toString().padStart(2, '0')}.`,
      lowestPrice: lastKnownLowestPrice
    });
    aMonthAgo.setDate(aMonthAgo.getDate() + 1);

    while (aMonthAgo.toDateString() !== tommorow.toDateString()) {
      const lowestPriceItem: PriceHistoryItem | undefined = (this.item?.priceHistory || []).find((item: PriceHistoryItem): boolean => {
        const itemDate = new Date(item.date);
        itemDate.setHours(0, 0, 0, 0);

        return aMonthAgo.toDateString() === itemDate.toDateString();
      });
      lastKnownLowestPrice = lowestPriceItem?.lowestCurrentPrice || lastKnownLowestPrice;

      data.push({
        color: lowestPriceItem ? '#DE5935' : 'rgba(0,0,0,0)',
        day: `${aMonthAgo.getDate().toString().padStart(2, '0')}.${(aMonthAgo.getMonth() + 1).toString().padStart(2, '0')}.`,
        lowestPrice: lastKnownLowestPrice
      });

      aMonthAgo.setDate(aMonthAgo.getDate() + 1);
    }

    this.priceHistoryChartA = this.priceHistoryChartA || this.initializePriceHistoryChart('priceHistoryChartA', data);
    this.priceHistoryChartB = this.priceHistoryChartB || this.initializePriceHistoryChart('priceHistoryChartB', data);
  }

  private initializePriceHistoryChart(chartId: string, data: Array<any>): Chart {
    return new Chart(chartId, {
      type: 'line',
      data: {
        labels: data.map(row => row.day),
        datasets: [
          {
            label: 'Niedrigster Preis',
            data: data.map(row => row.lowestPrice),
            pointBackgroundColor: (context: ScriptableContext<'line'>) => data[context.dataIndex]?.color,
            pointBorderColor: (context: ScriptableContext<'line'>) => data[context.dataIndex]?.color
          }
        ]
      },
      options: {
        elements: {
          line: {
            borderColor: '#DE5935',
            borderWidth: 2
          }
        },
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          y: {
            grid: {
              display: false
            },
            ticks: {
              callback: (value: string | number): string =>
                'string' === typeof value
                  ? value
                  : `${value.toFixed(value < 1000 ? 2 : 0).replace('.', ',')} €`
            }
          }
        }
      }
    });
  }

  private getOldestDateInPriceHistory() : Date | undefined {
    const dates: Array<Date> = (this.item?.priceHistory || []).map(item => new Date(item.date));
    if (!dates.length) {
      return;
    }

    return dates.reduce(function (a, b) { return a < b ? a : b; });
  }

  public pickedOffer(): void {
    if (!this.item) {
      return;
    }

    this.trackingService.addActivity(TrackingActivityItem.create()
      .setInformationItemId(this.item.itemId)
      .setInformationItemLabel(this.hyphenationPipe.transform(this.item.title))
      .setInterestLevel(TrackingInterestLevel.EVEN_HIGHER));
  }

  public getShopNameFromUrl(url: string | undefined): string {
    const match: RegExpMatchArray | null = (url || '').match(/\/\/(www.)?(.*?)\//);
    return match && match.length > 2 ? match[2] : '';
  }

  public getSanitizedUri(uriTokens: Array<string>): SafeHtml {
    return this.sanitizer.bypassSecurityTrustUrl(uriTokens.join(''));
  }

  public getSanitizedResourceUri(uri: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustResourceUrl(uri);
  }

  public renderPrice(item: CorrespondingItem | null): string | undefined {
    return CorrespondingItem.renderPrice(item);
  }

  public getItemDetails(item: Item | null): Array<ItemDetails> {
    return Item.getItemDetails(item, this.translationService.getTranslations(''));
  }

  public toggleFullDescription(): void {
    this.showFullDescription = !this.showFullDescription;
  }

  public seoHeader(numberKey: string): string {
    return this.translationService.getTranslations('')[`NAVIGATION_SEO_${this.activeNavigationItem?.toId || ''}_HEADER_${numberKey}`] || '';
  }

  public seoContent(numberKey: string): string {
    return this.translationService.getTranslations('')[`NAVIGATION_SEO_${this.activeNavigationItem?.toId || ''}_CONTENT_${numberKey}`] || '';
  }

  public areThereMorePrices(): boolean {
    return (this.item?.providers || []).length > 1;
  }

  public moreExpensiveOfferItems(): Array<CorrespondingItem | null> {
    if (!this.areThereMorePrices) {
      return [];
    }

    return (this.item?.providers || [])
      .filter((providerItem: CorrespondingItem | null): boolean => providerItem !== Item.getProviderItemWithLowestPrice(this.item))
      .filter((item: CorrespondingItem | null): boolean => (item?.priceCurrent || 0) > 0)
      .sort((a, b) => (a?.priceCurrent || 0) - (b?.priceCurrent || 0));
  }

  public offerItemsWithoutPrice(): Array<CorrespondingItem | null> {
    if (!this.areThereMorePrices) {
      return [];
    }

    return (this.item?.providers || [])
      .filter((providerItem: CorrespondingItem | null): boolean => providerItem !== Item.getProviderItemWithLowestPrice(this.item))
      .filter((item: CorrespondingItem | null): boolean => 0 === (item?.priceCurrent || 0));
  }

  public slideImageUrls(): Array<string> {
    return [this.item?.titleImage || '']
      .concat(this.item?.imagesBig || [])
      .filter((value: string, index: number, array: Array<string>): boolean => array.indexOf(value) === index);
  }

  public productSizes(): string {
    if (!(this.item?.sizes || []).length) {
      return '';
    }

    return (this.item?.sizes || '').split(',').filter((size: string): boolean => this.item?.size !== size as string).join(', ');
  }
}
