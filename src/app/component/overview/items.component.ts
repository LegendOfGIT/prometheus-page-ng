import {Component, Inject, PLATFORM_ID, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

    private destroyedService$ = new Subject();
    public items: Array<Item | null> = [
      new Item(), new Item(), new Item(),
      new Item(), new Item(), new Item(),
      new Item(), new Item(), new Item(),
      new Item(), new Item(), new Item()
    ];
    public availablePages: Array<number> = [1];
    public currentPage: number = 1;

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

        this.navigationService.setActiveNavigationLevelIds([
          params.get('navigationIdLevelA') || '',
          params.get('navigationIdLevelB') || '',
          params.get('navigationIdLevelC') || ''
        ]);
      });

      const translations = translationService.getTranslations();
      titleService.setTitle(
        translations.SEO_CATEGORY_PAGE_TITLE.replace('{category}',
          translations['NAVIGATION_' + this.navigationService.activeNavigationItem?.toId]));
    }

    ngOnInit(): void {

        const activeNavigationId =
          this.navigationService.activeNavigationItem && this.navigationService.activeNavigationItem.fromId
            ? this.navigationService.activeNavigationItem.toId
            : '';
        const searchPattern = this.route.snapshot?.queryParamMap?.get('search') as string;
        const page = this.route.snapshot?.queryParamMap?.get('page') as string || '1';
        this.currentPage = parseInt(page);

        this.itemsService.getItems(activeNavigationId, searchPattern, undefined, false, page)
            .pipe(takeUntil(this.destroyedService$))
            .subscribe(
              itemsResponse => {
                  this.availablePages = itemsResponse?.availablePages;
                  this.items = itemsResponse?.items;
                });

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

  get isNextPageNotLastPage(): boolean {
      if (!this.currentPage || !this.availablePages) {
        return false;
      }

      return this.currentPage < this.availablePages[this.availablePages.length - 1];
  }
}
