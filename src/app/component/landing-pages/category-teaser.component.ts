import { Component, Input } from '@angular/core';
import { Item } from '../../model/item';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ItemsApiService } from '../../service/items-api.service';
import { Subject } from 'rxjs';
import { NavigationItem } from '../../model/navigation-item';

@Component({
  selector: 'category-teaser',
  templateUrl: './category-teaser.component.html',
  styleUrls: ['./category-teaser.component.scss']
})
export class CategoryTeaserComponent {
  @Input()
  public navigationItem: NavigationItem | undefined = undefined;

  private destroyedService$ = new Subject();

  private categoryItems: Array<Item | null> = [
    new Item(), new Item(), new Item(),
    new Item(), new Item(), new Item()
  ];

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsApiService
  ) {
  }

  ngOnInit(): void {
    this.itemsService.getItems(this.navigationItem?.toId || '', '', 6)
      .pipe(takeUntil(this.destroyedService$))
      .subscribe(
        items => {
          this.categoryItems = items;
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
}
