import {Component, Inject, OnDestroy, OnInit, Optional, PLATFORM_ID} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap, Router, UrlTree} from '@angular/router';
import {DOCUMENT, isPlatformServer} from '@angular/common';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import {Request} from 'express';

import {Item} from 'src/app/model/item';
import {ItemsApiService} from 'src/app/service/items-api.service';
import {Module, NavigationService} from 'src/app/service/navigation.service';
import {TranslationService} from 'src/app/service/translation.service';
import {NavigationItem} from 'src/app/model/navigation-item';
import {Navigation} from 'src/app/configurations/navigation';
import {UserService} from 'src/app/service/user.service';
import {ItemsResponse} from 'src/app/model/items-response';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {
    private sampleItemsOfCategories: (Item | null)[] | undefined;
    public items: Array<Item | null> = [
      new Item(), new Item(), new Item(),
      new Item(), new Item(), new Item(),
      new Item(), new Item(), new Item(),
      new Item(), new Item(), new Item()
    ];
    public availablePages: Array<number> = [1];
    public currentPage: number = 1;

    private isCategoryHashtags = false;
    private hashtagsFromPath: string = '';
    private subscriptions: Subscription[] = [];
    public noResults = false;

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private itemsService: ItemsApiService,
      private navigationService: NavigationService,
      private userService: UserService,
      private metaService: Meta,
      private translationService: TranslationService,
      titleService: Title,
      @Inject(DOCUMENT) private doc: Document,
      @Inject(PLATFORM_ID) private platformId: Object,
      @Optional() @Inject(REQUEST) private request: Request
    ) {
      this.subscriptions.push(route.paramMap.subscribe((params: ParamMap): void => {
        const navigationIdLevelA: string = params.get('navigationIdLevelA') || '';
        const navigationIdLevelB: string = params.get('navigationIdLevelB') || '';
        this.navigationService.setActiveNavigationLevelIds([
          navigationIdLevelA,
          navigationIdLevelB,
          params.get('navigationIdLevelC') || ''
        ]);

        this.isCategoryHashtags = 'hashtags' === navigationIdLevelA;
        this.hashtagsFromPath = this.isCategoryHashtags ? navigationIdLevelB : '';
        if (this.hashtagsFromPath) {
          this.userService.setHashTags(this.hashtagsFromPath.split(','));
        }

        this.navigationService.activeModule = this.isCategoryHashtags ? Module.HASHTAGS : Module.ITEMS;
      }));

      const translations = translationService.getTranslations();
      const categoryName = this.isCategoryHashtags
        ? this.getActiveHashtags().join(' ')
        : translations['NAVIGATION_' + this.navigationService.activeNavigationItem?.toId] || '';

      const SEOPageTitle = translations[`SEO_PAGE_TITLE_${this.navigationService.activeNavigationItem?.SEOId || ''}`] || '';
      titleService.setTitle(
        SEOPageTitle || (categoryName ? translations.SEO_CATEGORY_PAGE_TITLE : translations.SEO_UNKNOWN_CATEGORY_PAGE_TITLE).replace(
          '{category}',
          categoryName));
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    }

    private getActiveHashtags(): Array<string> {
      return this.userService.activeUser?.activeHashtags.map((hashtag: string): string => `#${hashtag}`) || [];
    }

    private requestOverviewWithoutFiltersWhenNecessary(): void {
      if ((this.items || []).length) {
        return;
      }

      let urlTree: UrlTree = this.router.parseUrl(this.router.url);
      urlTree.queryParams = {
        noResults: true
      };
      this.router.navigateByUrl(urlTree.toString()).then((): void => window.location.reload());
    }

    private initItems(page: string): void {
      let filterIds: string = (this.navigationService.activeNavigationItem?.getFilters() || []).join('-');
      filterIds = filterIds || this.route.snapshot?.queryParamMap?.get('filters') as string;
      const maximumPrice: string = this.route.snapshot?.queryParamMap?.get('p_max') as string;
      const minimumPrice: string = this.route.snapshot?.queryParamMap?.get('p_min') as string;

      let searchPattern: string | undefined = this.navigationService.activeNavigationItem?.getSearchPattern() || undefined;
      searchPattern = searchPattern || this.route.snapshot?.queryParamMap?.get('search') as string;

      this.subscriptions.push(this.itemsService.getRandomItemOfCategories(this.subNavigationItems.map((navigationItem: NavigationItem) => navigationItem.toId))
        .subscribe(
          (itemsResponse: ItemsResponse): void => {
            this.sampleItemsOfCategories = itemsResponse?.items;

            if (!isPlatformServer(this.platformId) && !this.doc.getElementById('init-carousel')) {
              const script: HTMLScriptElement = this.doc.createElement('script');
              script.id = 'init-carousel';
              script.innerHTML = 'const carousel = document.getElementById(\'heroCarousel\');\n' +
                '  const carouselInstance = bootstrap.Carousel.getInstance(carousel) || new bootstrap.Carousel(carousel);\n' +
                '\n' +
                '  let startX = 0;\n' +
                '\n' +
                '  // Für Maus (Desktop Swipe)\n' +
                '  carousel.addEventListener(\'mousedown\', e => {\n' +
                '    startX = e.clientX;\n' +
                '  });\n' +
                '\n' +
                '  carousel.addEventListener(\'mouseup\', e => {\n' +
                '    const diffX = e.clientX - startX;\n' +
                '    if (Math.abs(diffX) > 50) {\n' +
                '      if (diffX > 0) {\n' +
                '        carouselInstance.prev();\n' +
                '      } else {\n' +
                '        carouselInstance.next();\n' +
                '      }\n' +
                '    }\n' +
                '  });\n' +
                '\n' +
                '  // Für Touch (Mobile/Touchpads)\n' +
                '  let touchStartX = 0;\n' +
                '  carousel.addEventListener(\'touchstart\', e => {\n' +
                '    touchStartX = e.changedTouches[0].screenX;\n' +
                '  });\n' +
                '\n' +
                '  carousel.addEventListener(\'touchend\', e => {\n' +
                '    const diffX = e.changedTouches[0].screenX - touchStartX;\n' +
                '    if (Math.abs(diffX) > 50) {\n' +
                '      if (diffX > 0) {\n' +
                '        carouselInstance.prev();\n' +
                '      } else {\n' +
                '        carouselInstance.next();\n' +
                '      }\n' +
                '    }\n' +
                '  });';
              this.doc.body.appendChild(script);
            }
          }));

      if (this.isCategoryHashtags) {
        this.subscriptions.push(this.itemsService.getHashtagsItems(searchPattern, filterIds, undefined, page, minimumPrice, maximumPrice)
          .subscribe(
            (itemsResponse: ItemsResponse): void => {
              this.availablePages = itemsResponse?.availablePages;
              this.items = itemsResponse?.items;
              this.noResults = this.noResults ? this.noResults : !this.items?.length;

              this.requestOverviewWithoutFiltersWhenNecessary();

              (this.items || []).filter((item: Item | null) => item?.titleImage).splice(0, 3)
                .forEach((item: Item | null): void => {
                  this.metaService.addTag({ name: 'og:image', content: item?.titleImage || '' });
                  this.metaService.addTag({ name: 'og:image:height', content: '450' });
                  this.metaService.addTag({ name: 'og:image:width', content: '450' });
                });
            }));

        return;
      }

      const activeNavigationId: string =
        this.navigationService.activeNavigationItem && this.navigationService.activeNavigationItem.fromId
          ? this.navigationService.activeNavigationItem.toId
          : '';

      if (!activeNavigationId) {
        this.router.navigate(['404']).then((): void => {
          window.location.reload();
        });
        return;
      }

      this.subscriptions.push(this.itemsService.getItems(
        activeNavigationId,
        searchPattern,
        filterIds,
        undefined,
        false,
        page,
        minimumPrice,
        maximumPrice
      )
        .subscribe(
          (itemsResponse: ItemsResponse): void => {
            this.availablePages = itemsResponse?.availablePages;
            this.items = itemsResponse?.items;
            this.noResults = this.noResults ? this.noResults : !this.items?.length;

            this.requestOverviewWithoutFiltersWhenNecessary();

            (this.items || []).filter((item: Item | null) => item?.titleImage).splice(0, 3)
              .forEach((item: Item | null): void => {
                this.metaService.addTag({ name: 'og:image', content: item?.titleImage || '' });
                this.metaService.addTag({ name: 'og:image:height', content: '450' });
                this.metaService.addTag({ name: 'og:image:width', content: '450' });
              });
          }));
    }

    ngOnInit(): void {
        this.noResults = 'true' === (this.route.snapshot?.queryParamMap?.get('noResults') as string || 'false');

        const page: string = this.route.snapshot?.queryParamMap?.get('page') as string || '1';
        this.currentPage = parseInt(page);

        this.initItems(page);

        if (!isPlatformServer(this.platformId)) {
          return;
        }

        const link: HTMLLinkElement = this.doc.createElement('link');
        this.doc.head.appendChild(link);
        link.setAttribute('rel', 'canonical');
        const pageUri: string = 'https://www.wewanna.shop/' + this.doc.URL.replace(new RegExp('(http:\/\/|\/\/).*?\/'), '');
        link.setAttribute('href', pageUri);

        const hashtags: Array<string> = this.userService.getHashtags().map(ht => '#' + ht);
        const teaserId: string = this.isCategoryHashtags
          ? hashtags.length > 1 ? 'NAVIGATION_TEASER_HASHTAGS' : 'NAVIGATION_TEASER_HASHTAG'
          : Navigation.getTeaserIdForNavigationItem(this.navigationService.activeNavigationItem);

        if (teaserId || this.SEODescription) {
          this.metaService.updateTag({
            name: 'description',
            content: this.SEODescription || this.translationService.getTranslations()[teaserId].replace('{hashtags}', hashtags.join(' '))
          });
        }
    }

    private applyFallbackForOverviewItem(item: Item | null): void {
      const applyFallback: boolean = (this.items || [])
        .find((itemFromOverview: Item | null): boolean => item?.id === itemFromOverview?.id) !== undefined;

      if (!applyFallback) {
        return;
      }

      const activeNavigationId: string =
        this.navigationService.activeNavigationItem && this.navigationService.activeNavigationItem.fromId
          ? this.navigationService.activeNavigationItem.toId
          : '';
      const searchPattern: string = this.route.snapshot?.queryParamMap?.get('search') as string;
      let filterIds: string = (this.navigationService.activeNavigationItem?.getFilters() || []).join('-');
      filterIds = filterIds || this.route.snapshot?.queryParamMap?.get('filters') as string;

      this.subscriptions.push(this.itemsService.getItems(
        activeNavigationId,
        searchPattern,
        filterIds,
        undefined,
        true,
        undefined,
        undefined,
        undefined
      ).subscribe((itemsResponse: ItemsResponse): void => {
        const itemFromResponse: Item | null | undefined = itemsResponse?.items?.length ? itemsResponse.items[0] : undefined;
        if (!itemFromResponse) {
          return;
        }

        for (let itemFromItemListIndex = 0; itemFromItemListIndex <= this.items.length; itemFromItemListIndex++) {
          if (this.items[itemFromItemListIndex]?.id !== item?.id) {
            continue;
          }

          this.items[itemFromItemListIndex] = itemFromResponse;
        }
      }));
    }
    private applyFallbackForCategoryItem(item: Item | null): void {
      const itemForFallback: Item | null | undefined = (this.sampleItemsOfCategories || [])
        .find((itemOfCategory: Item | null): boolean => item?.id === itemOfCategory?.id);

      if (!itemForFallback) {
        return;
      }

      this.subscriptions.push(this.itemsService.getRandomItemOfCategories([itemForFallback.navigationPath[itemForFallback.navigationPath.length - 1]])
        .subscribe(
          (itemsResponse: ItemsResponse): void => {
            const itemFromResponse: Item | null | undefined = itemsResponse?.items?.length ? itemsResponse.items[0] : undefined;
            for (let itemFromItemListIndex = 0; itemFromItemListIndex <= (this.sampleItemsOfCategories || []).length; itemFromItemListIndex++) {
              if (!this.sampleItemsOfCategories || this.sampleItemsOfCategories[itemFromItemListIndex]?.id !== item?.id) {
                continue;
              }

              this.sampleItemsOfCategories[itemFromItemListIndex] = itemFromResponse || null;
            }
          }));
    }

    public imageLoadingError(item: Item | null): void {
      this.applyFallbackForOverviewItem(item);
      this.applyFallbackForCategoryItem(item);
    }

    public visitPage(pageNumber: number, event: Event): void {
      if (UserService.isBotRequest(this.request)) {
        return;
      }

      event.preventDefault();
      const pageUrl: string = this.linkToPage(pageNumber);
      this.router.navigateByUrl('/', { skipLocationChange: true }).then((): void => {
        this.router.navigateByUrl(pageUrl);
      })
      return;
    }

    public linkToPage(page: number): string {
      let urlTree: UrlTree = this.router.parseUrl(this.router.url);
      urlTree.queryParams['page'] = page;
      delete urlTree.queryParams['noResults'];
      return urlTree.toString();
    }

    public itemOfCategory(categoryId: string): Item | null {
        const item: Item | null | undefined = (this.sampleItemsOfCategories || [])
          .find((item: Item | null): boolean => -1 !== (item?.navigationPath || []).indexOf(categoryId));

        return item ? item : null;
    }

    public seoHeader(navigationId: string, numberKey: string): string {
      return this.translationService.getTranslations('')[`NAVIGATION_SEO_${navigationId}_HEADER_${numberKey}`] || '';
    }

    public seoContent(navigationId: string, numberKey: string): string {
      return this.translationService.getTranslations('')[`NAVIGATION_SEO_${navigationId}_CONTENT_${numberKey}`] || '';
    }

    get isNextPageNotLastPage(): boolean {
      if (!this.currentPage || !this.availablePages) {
        return false;
      }

      return this.currentPage < this.availablePages[this.availablePages.length - 1];
    }

    get subNavigationItems(): Array<NavigationItem> {
      let items: Array<NavigationItem> = Navigation.getNextLevelNavigationItemsFrom(this.navigationService.activeNavigationItem);
      items = 0 === items.length && this.isCategoryHashtags ? Navigation.getAllRootItems() : items;

      if (!this.sampleItemsOfCategories?.length) {
        return items;
      }

      return items.filter((item: NavigationItem): boolean => !!this.itemOfCategory(item.toId));
    }

    get seoNavigationIds(): Array<string> {
      if (this.isCategoryHashtags) {
        return [];
      }

      return [this.navigationService.activeNavigationItem?.toId || '']
        .concat(Navigation.getAllSubsequentNavigationIdsByItem(this.navigationService.activeNavigationItem));
    }

    get activeNavigationItemPathParts(): Array<string> | undefined {
      return Navigation.getAllSupersequentNavigationIdsByItem(this.navigationService.activeNavigationItem)
        .concat(this.navigationService.activeNavigationItem?.toId || '');
    }

    get SEODescription(): string {
      let seoDescription = this.translationService.getTranslations()[`SEO_DESCRIPTION_${this.navigationService.activeNavigationItem?.SEOId || ''}`] || '';
      seoDescription = seoDescription ? seoDescription : this.translationService.getTranslations()[`SEO_DESCRIPTION_${this.navigationService.activeNavigationItem?.toId || ''}`] || '';
      return seoDescription;
    }
}
