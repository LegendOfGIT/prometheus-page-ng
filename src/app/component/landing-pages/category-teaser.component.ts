import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Item } from '../../model/item';
import { ActivatedRoute } from '@angular/router';
import { ItemsApiService } from '../../service/items-api.service';
import { Subject } from 'rxjs';
import { NavigationItem } from '../../model/navigation-item';
import { isPlatformServer } from '@angular/common';
import {makeStateKey, StateKey, TransferState} from "@angular/platform-browser";

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
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  private getItemsKey(): string {
    return 'productItems-' + this.navigationItem?.toId;
  }

  private initialiseItems(): void {
    if (this.transferState.hasKey(makeStateKey(this.getItemsKey()))) {
      this.categoryItems = this.transferState.get(makeStateKey(this.getItemsKey()), []);
      return;
    }

    const searchPattern = this.route.snapshot?.queryParamMap?.get('search') as string;
    this.itemsService.getItems(this.navigationItem?.toId || '', searchPattern, 8, this.randomItems).subscribe(items => {
      if (!items?.length) {
        this.categoryItems = [];
        return;
      }

      this.categoryItems = items;
      if (isPlatformServer(this.platformId)) {
        this.transferState.set<Array<Item | null>>(makeStateKey(this.getItemsKey()), this.categoryItems);
      }
    });
  }
  ngOnInit(): void {
    this.initialiseItems();
  }

  public getItemsOfCategory(): (Item | null)[] {
    return this.categoryItems;
  }

  private getHyphenatedString(value: string) {
    return (value || '').substring(0, 100)
      .replace(",", "")
      .replace(/[^\w\s]/gi, '')
      .replace(/[\(\)]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase();
  }

  public getSeoFriendlySingleProductViewUrl(item: Item | null): string {
    if (!item) {
      return '';
    }

    return `p/${item.id}/${this.getHyphenatedString(item.title)}`;
  }

  public renderLowestPrice(item: Item): string {
    return Item.renderLowestPrice(item);
  }

  get moreLink(): string {
    return '/' + [(this.navigationItem?.pathParts || []).filter(p => p).join('/')];
  }
}
