import {Component, Inject, Input, OnInit, Optional, PLATFORM_ID} from '@angular/core';
import { Item } from '../../model/item';
import {ActivatedRoute, Router} from '@angular/router';
import { ItemsApiService } from '../../service/items-api.service';
import { Subject } from 'rxjs';
import { NavigationItem } from '../../model/navigation-item';
import { isPlatformServer } from '@angular/common';
import { makeStateKey,  TransferState } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../../service/user.service';
import {ItemsResponse} from "../../model/items-response";
import {REQUEST} from "@nguniversal/express-engine/tokens";
import {Request} from "express";

@Component({
  selector: 'category-teaser',
  templateUrl: './category-teaser.component.html',
  styleUrls: ['./category-teaser.component.scss']
})
export class CategoryTeaserComponent implements OnInit {
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

  private destroyedService$ = new Subject();

  private categoryItems: Array<Item | null> = [
    new Item(), new Item(), new Item(),
    new Item(), new Item(), new Item(),
    new Item(), new Item()
  ];
  private isFallbackProductSelection = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemsService: ItemsApiService,
    private transferState: TransferState,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(REQUEST) private request: Request
  ) {
  }

  private getItemsKey(): string {
    return 'productItems-' + (this.showHashtags ? this.userService.activeUser?.activeHashtags.join(',') : (this.navigationItem?.toId || ''));
  }

  private initialiseItems(): void {
    const filterIds = this.route.snapshot?.queryParamMap?.get('filters') as string;
    const searchPattern = this.route.snapshot?.queryParamMap?.get('search') as string;
    const minimumPrice = this.route.snapshot?.queryParamMap?.get('p_min') as string;
    const maximumPrice = this.route.snapshot?.queryParamMap?.get('p_max') as string;

    if (this.showHashtags) {
      this.itemsService.getHashtagsItems(searchPattern, filterIds, this.numberOfItems, undefined, minimumPrice, maximumPrice).subscribe(itemsResponse => {
        if (itemsResponse?.items?.length) {
          this.categoryItems = itemsResponse.items;
          if (isPlatformServer(this.platformId)) {
            this.transferState.set<Array<Item | null>>(makeStateKey(this.getItemsKey()), this.categoryItems);
          }
          return;
        }

        this.itemsService.getHashtagsItems('', filterIds, this.numberOfItems, undefined, minimumPrice, maximumPrice)
          .pipe(takeUntil(this.destroyedService$))
          .subscribe(
            (itemsResponse: ItemsResponse): void => {
              if (itemsResponse?.items?.length) {
                this.categoryItems = itemsResponse.items;
                if (isPlatformServer(this.platformId)) {
                  this.transferState.set<Array<Item | null>>(makeStateKey(this.getItemsKey()), this.categoryItems);
                }
                return;
              }

              this.itemsService.getHashtagsItems('', '', this.numberOfItems)
                .pipe(takeUntil(this.destroyedService$))
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
                  });
            });
      });

      return;
    }

    this.itemsService.getItems(
      this.navigationItem?.toId || '',
      searchPattern,
      filterIds,
      this.numberOfItems,
      this.randomItems,
      undefined,
      minimumPrice,
      maximumPrice
    ).subscribe((itemsResponse: ItemsResponse): void => {
      if (itemsResponse?.items?.length) {
        this.categoryItems = itemsResponse.items;
        if (isPlatformServer(this.platformId)) {
          this.transferState.set<Array<Item | null>>(makeStateKey(this.getItemsKey()), this.categoryItems);
        }
        return;
      }

      this.itemsService.getItems(
        this.navigationItem?.toId || '',
        '',
        filterIds,
        this.numberOfItems,
        undefined,
        undefined,
        minimumPrice,
        maximumPrice
      )
        .pipe(takeUntil(this.destroyedService$))
        .subscribe(
          (itemsResponse: ItemsResponse): void => {
            if (itemsResponse?.items?.length) {
              this.categoryItems = itemsResponse?.items;
              if (isPlatformServer(this.platformId)) {
                this.transferState.set<Array<Item | null>>(makeStateKey(this.getItemsKey()), this.categoryItems);
              }
              return;
            }

            this.itemsService.getItems(
              this.navigationItem?.toId || '',
              '',
              '',
              this.numberOfItems
            )
              .pipe(takeUntil(this.destroyedService$))
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
                });
          });
    });
  }
  ngOnInit(): void {
    this.initialiseItems();
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
