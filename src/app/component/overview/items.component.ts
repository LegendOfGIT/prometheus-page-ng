import {Component, Inject, OnInit, Optional, PLATFORM_ID} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router, UrlTree} from '@angular/router';
import {DOCUMENT, isPlatformServer} from '@angular/common';

import {Item} from 'src/app/model/item';
import {ItemsApiService} from 'src/app/service/items-api.service';
import {Module, NavigationService} from 'src/app/service/navigation.service';
import {TranslationService} from '../../service/translation.service';
import {Meta, Title} from '@angular/platform-browser';
import {NavigationItem} from '../../model/navigation-item';
import {Navigation} from '../../configurations/navigation';
import {ItemDisplayMode} from '../item/item.component';
import {UserService} from '../../service/user.service';
import {ItemsResponse} from '../../model/items-response';
import {REQUEST} from "@nguniversal/express-engine/tokens";
import {Request} from "express";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

    private destroyedService$ = new Subject();
    private sampleItemsOfCategories: Array<Item | null> | undefined;
    public items: Array<Item | null> = [
      new Item(), new Item(), new Item(),
      new Item(), new Item(), new Item(),
      new Item(), new Item(), new Item(),
      new Item(), new Item(), new Item()
    ];
    public availablePages: Array<number> = [1];
    public currentPage: number = 1;
    public ITEM_MODE_CATEGORY: ItemDisplayMode = ItemDisplayMode.CATEGORY;

    private isCategoryHashtags = false;
    private hashtagsFromPath: string = '';
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
      route.paramMap.subscribe((params: ParamMap): void => {
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
      });

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
      if (isPlatformServer(this.platformId) && !UserService.isBotRequest(this.request)) {
        return;
      }

      let filterIds: string = (this.navigationService.activeNavigationItem?.getFilters() || []).join('-');
      filterIds = filterIds || this.route.snapshot?.queryParamMap?.get('filters') as string;
      const maximumPrice: string = this.route.snapshot?.queryParamMap?.get('p_max') as string;
      const minimumPrice: string = this.route.snapshot?.queryParamMap?.get('p_min') as string;
      const searchPattern: string = this.route.snapshot?.queryParamMap?.get('search') as string;

      this.itemsService.getRandomItemOfCategories(this.subNavigationItems.map((navigationItem: NavigationItem) => navigationItem.toId))
        .pipe(takeUntil(this.destroyedService$))
        .subscribe(
          (itemsResponse: ItemsResponse): void => {
            this.sampleItemsOfCategories = itemsResponse?.items;

            if (!isPlatformServer(this.platformId)) {
              const script: HTMLScriptElement = this.doc.createElement('script');
              script.innerHTML = 'setTimeout(function() { $(".carousel__viewport").not(".slick-initialized").slick({ arrows: false, dots: false, infinite: true, autoplay: true, autoplaySpeed: 7000, slidesToScroll: 3, slidesToShow: 3, responsive: [{ breakpoint: 576, settings: { slidesToScroll: 2, slidesToShow: 2 } }, { breakpoint: 1280, settings: { slidesToScroll: 4, slidesToShow: 4 } }] }); }, 200);';
              this.doc.body.appendChild(script);
            }
          });

      if (this.isCategoryHashtags) {
        this.itemsService.getHashtagsItems(searchPattern, filterIds, undefined, page, minimumPrice, maximumPrice)
          .pipe(takeUntil(this.destroyedService$))
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
            });

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

      this.itemsService.getItems(
        activeNavigationId,
        searchPattern,
        filterIds,
        undefined,
        false,
        page,
        minimumPrice,
        maximumPrice
      )
        .pipe(takeUntil(this.destroyedService$))
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
          });
    }

    ngOnInit(): void {
        this.noResults = 'true' === (this.route.snapshot?.queryParamMap?.get('noResults') as string || 'false');

        const page: string = this.route.snapshot?.queryParamMap?.get('page') as string || '1';
        this.currentPage = parseInt(page);

        this.initItems(page);

        if (isPlatformServer(this.platformId)) {
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

          // this.metaService.updateTag({ name: 'keywords', content: this.translationService.getTranslations()['SEO_PAGE_KEYWORDS'] });
        }
    }

    public visitPage(pageNumber: number, event: Event): void {
      if (UserService.isBotRequest(this.request)) {
        return;
      }

      event.preventDefault();
      const pageUrl = this.linkToPage(pageNumber);
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

      return items;
    }

    get showCategoryNavigation(): boolean {
        if (this.navigationService.activeNavigationItem?.isFirstNavigationLevel()) {
          return true;
        }

        return this.subNavigationItems.length > 1;
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
      return this.translationService.getTranslations()[`SEO_DESCRIPTION_${this.navigationService.activeNavigationItem?.SEOId || ''}`] || '';
    }
}
