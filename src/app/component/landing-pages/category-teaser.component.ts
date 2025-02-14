import { Component, Inject, Input, OnDestroy, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { Subscription} from 'rxjs';
import { makeStateKey,  TransferState } from '@angular/platform-browser';

import { Item } from 'src/app/model/item';
import { ActivatedRoute, Router} from '@angular/router';
import { ItemsApiService } from 'src/app/service/items-api.service';
import { NavigationItem } from 'src/app/model/navigation-item';
import { UserService } from 'src/app/service/user.service';
import { ItemsResponse } from 'src/app/model/items-response';
import { NavigationService } from 'src/app/service/navigation.service';

@Component({
  selector: 'category-teaser',
  templateUrl: './category-teaser.component.html',
  styleUrls: ['./category-teaser.component.scss']
})
export class CategoryTeaserComponent implements OnInit, OnDestroy {
  @Input()
  public navigationItem: NavigationItem | undefined = undefined;

  @Input()
  public showHeader = true;

  @Input()
  public randomItems = false;

  @Input()
  public showHashtags = false;

  @Input()
  public numberOfItems = 4;

  private categoryItems: Array<Item | null> = [
    new Item(), new Item(), new Item(),
    new Item(), new Item(), new Item(),
    new Item(), new Item()
  ];
  private isFallbackProductSelection = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemsService: ItemsApiService,
    private transferState: TransferState,
    private userService: UserService,
    private navigationService: NavigationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(REQUEST) private request: Request
  ) {
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe())
  }

  private getItemsKey(): string {
    return 'productItems-' + (this.showHashtags ? this.userService.activeUser?.activeHashtags.join(',') : (this.navigationItem?.toId || ''));
  }

  private initialiseItems(): void {
    const filterIds: string = this.route.snapshot?.queryParamMap?.get('filters') as string;
    const searchPattern: string = this.route.snapshot?.queryParamMap?.get('search') as string;
    const minimumPrice: string = this.route.snapshot?.queryParamMap?.get('p_min') as string;
    const maximumPrice: string = this.route.snapshot?.queryParamMap?.get('p_max') as string;

    if (this.showHashtags) {
      this.subscriptions.push(this.itemsService.getHashtagsItems(searchPattern, filterIds, this.numberOfItems, undefined, minimumPrice, maximumPrice).subscribe(itemsResponse => {
        if (itemsResponse?.items?.length) {
          this.categoryItems = itemsResponse.items;
          if (isPlatformServer(this.platformId)) {
            this.transferState.set<Array<Item | null>>(makeStateKey(this.getItemsKey()), this.categoryItems);
          }
          return;
        }

        this.itemsService.getHashtagsItems('', filterIds, this.numberOfItems, undefined, minimumPrice, maximumPrice)
          .subscribe(
            (itemsResponse: ItemsResponse): void => {
              if (itemsResponse?.items?.length) {
                this.categoryItems = itemsResponse.items;
                if (isPlatformServer(this.platformId)) {
                  this.transferState.set<Array<Item | null>>(makeStateKey(this.getItemsKey()), this.categoryItems);
                }
                return;
              }

              this.subscriptions.push(this.itemsService.getHashtagsItems('', '', this.numberOfItems)
                .subscribe(
                  (itemsResponse: ItemsResponse): void => {
                    this.isFallbackProductSelection = true;

                    if (itemsResponse?.items?.length) {
                      this.categoryItems = itemsResponse.items;
                      if (isPlatformServer(this.platformId)) {
                        this.transferState.set<Array<Item | null>>(makeStateKey(this.getItemsKey()), this.categoryItems);
                      }
                      return;
                    }
                  }));
            });
      }));

      return;
    }

    this.subscriptions.push(this.itemsService.getItems(
      this.navigationItem?.toId || '',
      searchPattern,
      filterIds,
      this.numberOfItems,
      this.randomItems,
      undefined,
      minimumPrice,
      maximumPrice,
      undefined,
      false,
      this.navigationService.activeModule
    ).subscribe((itemsResponse: ItemsResponse): void => {
      if (itemsResponse?.items?.length) {
        this.categoryItems = itemsResponse.items;
        if (isPlatformServer(this.platformId)) {
          this.transferState.set<Array<Item | null>>(makeStateKey(this.getItemsKey()), this.categoryItems);
        }
        return;
      }

      this.subscriptions.push(this.itemsService.getItems(
        this.navigationItem?.toId || '',
        '',
        filterIds,
        this.numberOfItems,
        undefined,
        undefined,
        minimumPrice,
        maximumPrice
      )
        .subscribe(
          (itemsResponse: ItemsResponse): void => {
            if (itemsResponse?.items?.length) {
              this.categoryItems = itemsResponse?.items;
              if (isPlatformServer(this.platformId)) {
                this.transferState.set<Array<Item | null>>(makeStateKey(this.getItemsKey()), this.categoryItems);
              }
              return;
            }

            this.subscriptions.push(this.itemsService.getItems(
              this.navigationItem?.toId || '',
              '',
              '',
              this.numberOfItems
            )
              .subscribe(
                (itemsResponse: ItemsResponse): void => {
                  this.isFallbackProductSelection = true;

                  if (itemsResponse?.items?.length) {
                    this.categoryItems = itemsResponse?.items;
                    if (isPlatformServer(this.platformId)) {
                      this.transferState.set<Array<Item | null>>(makeStateKey(this.getItemsKey()), this.categoryItems);
                    }
                    return;
                  }
                }));
          }));
    }));
  }

  ngOnInit(): void {
    this.initialiseItems();
  }

  public imageError(item: Item | null): void {
    const applyFallback: boolean = (this.categoryItems || [])
      .find((itemFromOverview: Item | null): boolean => item?.id === itemFromOverview?.id) !== undefined;

    if (!applyFallback) {
      return;
    }

    const searchPattern: string = this.route.snapshot?.queryParamMap?.get('search') as string;
    let filterIds: string = (this.navigationService.activeNavigationItem?.getFilters() || []).join('-');
    filterIds = filterIds || this.route.snapshot?.queryParamMap?.get('filters') as string;
    const minimumPrice: string = this.route.snapshot?.queryParamMap?.get('p_min') as string;
    const maximumPrice: string = this.route.snapshot?.queryParamMap?.get('p_max') as string;

    this.subscriptions.push(this.itemsService.getItems(
      this.navigationItem?.toId || '',
      searchPattern,
      filterIds,
      1,
      this.randomItems,
      undefined,
      minimumPrice,
      maximumPrice,
      undefined,
      false,
      this.navigationService.activeModule
    ).subscribe((itemsResponse: ItemsResponse): void => {
      const itemFromResponse: Item | null | undefined = itemsResponse?.items?.length ? itemsResponse.items[0] : undefined;
      if (!itemFromResponse) {
        return;
      }

      for (let itemFromItemListIndex = 0; itemFromItemListIndex <= this.categoryItems.length; itemFromItemListIndex++) {
        if (this.categoryItems[itemFromItemListIndex]?.id !== item?.id) {
          continue;
        }

        this.categoryItems[itemFromItemListIndex] = itemFromResponse;
      }
    }));
  }

  private getParameterFromUrl(parameterKey: string): string | null {
    return isPlatformServer(this.platformId) ? '' : new URL(window.location.href).searchParams.get(parameterKey);
  }

  private addParameterIfGiven(parameters: any, parameterKey: string): void {
    const parameter: string | null = this.getParameterFromUrl(parameterKey);
    if (this.isFallbackProductSelection || !parameter) {
      return;
    }

    parameters[parameterKey] = parameter;
  }

  public getItemsOfCategory(): (Item | null)[] {
    return this.categoryItems;
  }

  public navigateToMore(event: Event): void {
    if (UserService.isBotRequest(this.request)) {
      return;
    }

    event.preventDefault();
    this.router.navigateByUrl(this.moreLink);
    return;
  }

  get moreLink(): string {
    const parameters: any = {};

    this.addParameterIfGiven(parameters, 'filters');
    this.addParameterIfGiven(parameters, 'p_min');
    this.addParameterIfGiven(parameters, 'p_max');
    this.addParameterIfGiven(parameters, 'search');

    const hashtags: Array<string> = this.userService.activeUser?.activeHashtags || [];
    if (!this.showHashtags && hashtags.length) { parameters.hashtags = hashtags.join(','); }

    const queryParameters: string = Object.keys(parameters).length ? `?${Object.keys(parameters).map((key: string): string => `${key}=${parameters[key]}`).join('&')}` : '';
    if (this.showHashtags) {
      return '/hashtags/' + this.userService.getHashtags().join(',') + queryParameters;
    }

    return '/' + [(this.navigationItem?.pathParts || []).filter((p: string) => p).join('/')] + queryParameters;
  }

  get sloganTranslationId(): string {
    if (this.showHashtags) {
      return 'NAVIGATION_SLOGAN_HIGHLIGHTS';
    }

    return 'NAVIGATION_SLOGAN_' + (this.navigationItem?.hasSlogan ? this.navigationItem?.toId || 'ALL' : 'ALL');
  }

  get navigationTranslationId(): string {
    if (this.showHashtags) {
      return 'NAVIGATION_HIGHLIGHTS';
    }

    return 'NAVIGATION_' + (this.navigationItem?.toId || '');
  }

  get activeHashtags(): Array<string> {
    return this.userService.activeUser?.activeHashtags.map((hashtag: string): string => `#${hashtag}`) || [];
  }
}
