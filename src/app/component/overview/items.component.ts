import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {DOCUMENT, isPlatformServer} from '@angular/common';

import {Item} from 'src/app/model/item';
import {ItemsApiService} from 'src/app/service/items-api.service';
import {Module, NavigationService} from 'src/app/service/navigation.service';
import {TrackingService} from 'src/app/service/tracking.service';
import {TranslationService} from '../../service/translation.service';
import {Title} from '@angular/platform-browser';
import {NavigationItem} from '../../model/navigation-item';
import {Navigation} from '../../configurations/navigation';
import {ItemDisplayMode} from '../item/item.component';

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

    private isCategoryHighlights = false;

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private itemsService: ItemsApiService,
      private navigationService: NavigationService,
      private trackingService: TrackingService,
      translationService: TranslationService,
      titleService: Title,
      @Inject(DOCUMENT) private doc: Document,
      @Inject(PLATFORM_ID) private platformId: Object
    ) {

      route.paramMap.subscribe((params) => {
        this.navigationService.activeModule = Module.ITEMS;

        const navigationIdLevelA = params.get('navigationIdLevelA') || '';
        this.navigationService.setActiveNavigationLevelIds([
          navigationIdLevelA,
          params.get('navigationIdLevelB') || '',
          params.get('navigationIdLevelC') || ''
        ]);

        this.isCategoryHighlights = 'highlights' === navigationIdLevelA;
      });

      const translations = translationService.getTranslations();
      titleService.setTitle(
        translations.SEO_CATEGORY_PAGE_TITLE.replace('{category}',
          translations['NAVIGATION_' + (this.isCategoryHighlights ? 'HIGHLIGHTS' : this.navigationService.activeNavigationItem?.toId)]));
    }

    private initItems(page: string): void {
      if (this.isCategoryHighlights) {
        this.itemsService.getHighlightedItems(undefined)
          .pipe(takeUntil(this.destroyedService$))
          .subscribe(
            itemsResponse => {
              this.availablePages = itemsResponse?.availablePages;
              this.items = itemsResponse?.items;
            });

        return;
      }

      const activeNavigationId =
        this.navigationService.activeNavigationItem && this.navigationService.activeNavigationItem.fromId
          ? this.navigationService.activeNavigationItem.toId
          : '';
      const searchPattern = this.route.snapshot?.queryParamMap?.get('search') as string;

      this.itemsService.getItems(activeNavigationId, searchPattern, undefined, false, page)
        .pipe(takeUntil(this.destroyedService$))
        .subscribe(
          itemsResponse => {
            this.availablePages = itemsResponse?.availablePages;
            this.items = itemsResponse?.items;
          });

      this.itemsService.getRandomItemOfCategories(this.subNavigationItems.map(navigationItem => navigationItem.toId))
        .pipe(takeUntil(this.destroyedService$))
        .subscribe(
          itemsResponse => {
            this.sampleItemsOfCategories = itemsResponse?.items;
          });
    }

    ngOnInit(): void {
        const page = this.route.snapshot?.queryParamMap?.get('page') as string || '1';
        this.currentPage = parseInt(page);

        this.initItems(page);

        if (isPlatformServer(this.platformId)) {
          const link: HTMLLinkElement = this.doc.createElement('link');
          this.doc.head.appendChild(link);
          link.setAttribute('rel', 'canonical');
          const pageUri = 'https://www.wewanna.shop/' + this.doc.URL.replace(new RegExp('(http:\/\/|\/\/).*?\/'), '');
          link.setAttribute('href', pageUri);
        }
    }

    public linkToPage(page: number) {
      let urlTree = this.router.parseUrl(this.router.url);
      urlTree.queryParams['page'] = page;
      return urlTree.toString();
    }

    public itemOfCategory(categoryId: string): Item | null {
        const item = (this.sampleItemsOfCategories || [])
          .find(item => -1 !== (item?.navigationPath || []).indexOf(categoryId));

        return item ? item : null;
    }

    get isNextPageNotLastPage(): boolean {
      if (!this.currentPage || !this.availablePages) {
        return false;
      }

      return this.currentPage < this.availablePages[this.availablePages.length - 1];
    }

    get subNavigationItems(): Array<NavigationItem> {
      return Navigation.getNextLevelNavigationItemsFrom(this.navigationService.activeNavigationItem);
    }
}
