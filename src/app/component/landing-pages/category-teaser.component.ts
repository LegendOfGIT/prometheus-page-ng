import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Item } from '../../model/item';
import { ActivatedRoute } from '@angular/router';
import { ItemsApiService } from '../../service/items-api.service';
import { Subject } from 'rxjs';
import { NavigationItem } from '../../model/navigation-item';
import { isPlatformServer } from '@angular/common';
import { makeStateKey,  TransferState } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../../service/user.service';

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

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsApiService,
    private transferState: TransferState,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  private getItemsKey(): string {
    return 'productItems-' + (this.showHashtags ? this.userService.activeUser?.activeHashtags.join(',') : (this.navigationItem?.toId || ''));
  }

  private initialiseItems(): void {

    const searchPattern = this.route.snapshot?.queryParamMap?.get('search') as string;
    const filterIds = this.route.snapshot?.queryParamMap?.get('filters') as string;

    if (this.showHashtags) {
      this.itemsService.getHashtagsItems(searchPattern, filterIds, this.numberOfItems).subscribe(itemsResponse => {
        if (itemsResponse?.items?.length) {
          this.categoryItems = itemsResponse.items;
          if (isPlatformServer(this.platformId)) {
            this.transferState.set<Array<Item | null>>(makeStateKey(this.getItemsKey()), this.categoryItems);
          }
          return;
        }

        this.itemsService.getHashtagsItems('', filterIds, this.numberOfItems)
          .pipe(takeUntil(this.destroyedService$))
          .subscribe(
            itemsResponse => {
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
                  itemsResponse => {
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

    this.itemsService.getItems(this.navigationItem?.toId || '', searchPattern, filterIds, this.numberOfItems, this.randomItems).subscribe(itemsResponse => {
      if (itemsResponse?.items?.length) {
        this.categoryItems = itemsResponse.items;
        if (isPlatformServer(this.platformId)) {
          this.transferState.set<Array<Item | null>>(makeStateKey(this.getItemsKey()), this.categoryItems);
        }
        return;
      }

      this.itemsService.getItems(this.navigationItem?.toId || '', '', filterIds, this.numberOfItems)
        .pipe(takeUntil(this.destroyedService$))
        .subscribe(
          itemsResponse => {
            if (itemsResponse?.items?.length) {
              this.categoryItems = itemsResponse?.items;
              if (isPlatformServer(this.platformId)) {
                this.transferState.set<Array<Item | null>>(makeStateKey(this.getItemsKey()), this.categoryItems);
              }
              return;
            }

            this.itemsService.getItems(this.navigationItem?.toId || '', '', '', this.numberOfItems)
              .pipe(takeUntil(this.destroyedService$))
              .subscribe(
                itemsResponse => {
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
    const parameter = this.getParameterFromUrl(parameterKey);
    if (!parameter) {
      return;
    }

    parameters[parameterKey] = parameter;
  }

  public getItemsOfCategory(): (Item | null)[] {
    return this.categoryItems;
  }

  get moreLink(): string {
    const parameters: any = {};

    this.addParameterIfGiven(parameters, 'filters');
    this.addParameterIfGiven(parameters, 'search');

    const hashtags = this.userService.activeUser?.activeHashtags || [];
    if (!this.showHashtags && hashtags.length) { parameters.hashtags = hashtags.join(','); }

    const queryParameters = Object.keys(parameters).length ? `?${Object.keys(parameters).map(key => `${key}=${parameters[key]}`).join('&')}` : '';
    if (this.showHashtags) {
      return '/hashtags/' + this.userService.getHashtags().join(',') + queryParameters;
    }

    return '/' + [(this.navigationItem?.pathParts || []).filter(p => p).join('/')] + queryParameters;
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
    return this.userService.activeUser?.activeHashtags.map(hashtag => `#${hashtag}`) || [];
  }
}
