import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Item } from '../../model/item';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ItemsApiService } from '../../service/items-api.service';
import { Subject } from 'rxjs';
import { NavigationItem } from '../../model/navigation-item';
import { isPlatformBrowser } from '@angular/common';

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
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const searchPattern = this.route.snapshot?.queryParamMap?.get('search') as string;

    this.itemsService.getItems(this.navigationItem?.toId || '', searchPattern, 8, this.randomItems)
      .pipe(takeUntil(this.destroyedService$))
      .subscribe(
        items => {
          if (items?.length) {
            this.categoryItems = items;
            return;
          }

          this.itemsService.getItems(this.navigationItem?.toId || '', '', 8)
            .pipe(takeUntil(this.destroyedService$))
            .subscribe(
              items => {
                this.categoryItems = items;
              });
        });
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

  get moreLink(): string {
    return '/' + [(this.navigationItem?.pathParts || []).filter(p => p).join('/')];
  }
}
