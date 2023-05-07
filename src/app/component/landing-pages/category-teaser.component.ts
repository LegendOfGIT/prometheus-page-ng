import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Item } from '../../model/item';
import { ActivatedRoute } from '@angular/router';
import { ItemsApiService } from '../../service/items-api.service';
import { Subject } from 'rxjs';
import { NavigationItem } from '../../model/navigation-item';
import {isPlatformServer} from '@angular/common';
import { makeStateKey,  TransferState } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import {UserService} from '../../service/user.service';

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
  public showHighlights = false;

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
    return 'productItems-' + (this.showHighlights ? 'highlights' : (this.navigationItem?.toId || ''));
  }

  private initialiseItems(): void {
    /*if (this.transferState.hasKey(makeStateKey(this.getItemsKey()))) {
      this.categoryItems = this.transferState.get(makeStateKey(this.getItemsKey()), []);
      return;
    }*/

    if (this.showHighlights) {
      this.itemsService.getHighlightedItems(6).subscribe(itemsResponse => {
        if (itemsResponse?.items?.length) {
          this.categoryItems = itemsResponse.items;
          if (isPlatformServer(this.platformId)) {
            this.transferState.set<Array<Item | null>>(makeStateKey(this.getItemsKey()), this.categoryItems);
          }
          return;
        }
      });

      return;
    }

    const searchPattern = this.route.snapshot?.queryParamMap?.get('search') as string;
    this.itemsService.getItems(this.navigationItem?.toId || '', searchPattern, this.numberOfItems, this.randomItems).subscribe(itemsResponse => {
      if (itemsResponse?.items?.length) {
        this.categoryItems = itemsResponse.items;
        if (isPlatformServer(this.platformId)) {
          this.transferState.set<Array<Item | null>>(makeStateKey(this.getItemsKey()), this.categoryItems);
        }
        return;
      }

      this.itemsService.getItems(this.navigationItem?.toId || '', '', this.numberOfItems)
        .pipe(takeUntil(this.destroyedService$))
        .subscribe(
          itemsResponse => {
            this.categoryItems = itemsResponse?.items;
            if (isPlatformServer(this.platformId)) {
              this.transferState.set<Array<Item | null>>(makeStateKey(this.getItemsKey()), this.categoryItems);
            }
          });


    });
  }
  ngOnInit(): void {
    this.initialiseItems();
  }

  private getParameterFromUrl(parameterKey: string): string | null {
    return isPlatformServer(this.platformId) ? '' : new URL(window.location.href).searchParams.get(parameterKey);
  }

  public getItemsOfCategory(): (Item | null)[] {
    return this.categoryItems;
  }

  get moreLink(): string {
    let searchParameter = this.getParameterFromUrl('search');
    const parameters: any = {};
    if (searchParameter) { parameters.search = searchParameter; }

    const hashtags = this.userService.activeUser?.activeHashtags || [];
    if (hashtags.length) { parameters.hashtags = hashtags.join(','); }

    searchParameter = searchParameter ? `?search=${searchParameter}` : '';

    const queryParameters = Object.keys(parameters).length ? `?${Object.keys(parameters).map(key => `${key}=${parameters[key]}`).join('&')}` : '';
    if (this.showHighlights) {
      return '/highlights' + queryParameters;
    }

    return '/' + [(this.navigationItem?.pathParts || []).filter(p => p).join('/')] + queryParameters;
  }

  get sloganTranslationId(): string {
    if (this.showHighlights) {
      return 'NAVIGATION_SLOGAN_HIGHLIGHTS';
    }

    return 'NAVIGATION_SLOGAN_' + (this.navigationItem?.hasSlogan ? this.navigationItem?.toId || 'ALL' : 'ALL');
  }

  get navigationTranslationId(): string {
    if (this.showHighlights) {
      return 'NAVIGATION_HIGHLIGHTS';
    }

    return 'NAVIGATION_' + (this.navigationItem?.toId || '');
  }
}
