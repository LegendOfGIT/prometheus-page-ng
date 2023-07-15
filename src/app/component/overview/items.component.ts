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
import {Meta, Title} from '@angular/platform-browser';
import {NavigationItem} from '../../model/navigation-item';
import {Navigation} from '../../configurations/navigation';
import {ItemDisplayMode} from '../item/item.component';
import {UserService} from "../../service/user.service";

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

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private itemsService: ItemsApiService,
      private navigationService: NavigationService,
      private trackingService: TrackingService,
      private userService: UserService,
      private metaService: Meta,
      private translationService: TranslationService,
      titleService: Title,
      @Inject(DOCUMENT) private doc: Document,
      @Inject(PLATFORM_ID) private platformId: Object
    ) {

      route.paramMap.subscribe((params) => {
        const navigationIdLevelA = params.get('navigationIdLevelA') || '';
        const navigationIdLevelB = params.get('navigationIdLevelB') || '';
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
      titleService.setTitle(
        translations.SEO_CATEGORY_PAGE_TITLE.replace(
          '{category}',
          this.isCategoryHashtags
            ? this.getActiveHashtags().join(' ')
            : translations['NAVIGATION_' + this.navigationService.activeNavigationItem?.toId]));
    }

    private getActiveHashtags(): Array<string> {
      return this.userService.activeUser?.activeHashtags.map(hashtag => `#${hashtag}`) || [];
    }

    private initItems(page: string): void {
      const filterIds = this.route.snapshot?.queryParamMap?.get('filters') as string;
      const searchPattern = this.route.snapshot?.queryParamMap?.get('search') as string;

      if (this.isCategoryHashtags) {
        this.itemsService.getHashtagsItems(searchPattern, filterIds, undefined, page)
          .pipe(takeUntil(this.destroyedService$))
          .subscribe(
            itemsResponse => {
              this.availablePages = itemsResponse?.availablePages;
              this.items = itemsResponse?.items;

              (this.items || []).filter(item => item?.titleImage).splice(0, 3).forEach(item => {
                this.metaService.addTag({ name: 'og:image', content: item?.titleImage || '' });
                this.metaService.addTag({ name: 'og:image:height', content: '450' });
                this.metaService.addTag({ name: 'og:image:width', content: '450' });
              });
            });

        return;
      }

      const activeNavigationId =
        this.navigationService.activeNavigationItem && this.navigationService.activeNavigationItem.fromId
          ? this.navigationService.activeNavigationItem.toId
          : '';

      this.itemsService.getItems(activeNavigationId, searchPattern, filterIds, undefined, false, page)
        .pipe(takeUntil(this.destroyedService$))
        .subscribe(
          itemsResponse => {
            this.availablePages = itemsResponse?.availablePages;
            this.items = itemsResponse?.items;

            (this.items || []).filter(item => item?.titleImage).splice(0, 3).forEach(item => {
              this.metaService.addTag({ name: 'og:image', content: item?.titleImage || '' });
              this.metaService.addTag({ name: 'og:image:height', content: '450' });
              this.metaService.addTag({ name: 'og:image:width', content: '450' });
            });
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

          const hashtags = this.userService.getHashtags().map(ht => '#' + ht);
          const teaserId = this.isCategoryHashtags
            ? hashtags.length > 1 ? 'NAVIGATION_TEASER_HASHTAGS' : 'NAVIGATION_TEASER_HASHTAG'
            : Navigation.getTeaserIdForNavigationItem(this.navigationService.activeNavigationItem);

          if (teaserId) {
            this.metaService.updateTag({
              name: 'description',
              content: this.translationService.getTranslations()[teaserId].replace('{hashtags}', hashtags.join(' '))
            });
          }
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
      return Navigation.getNextLevelNavigationItemsFrom(this.navigationService.activeNavigationItem);
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
}
