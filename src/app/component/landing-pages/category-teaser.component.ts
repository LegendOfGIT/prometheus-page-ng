import { Component, Input } from '@angular/core';
import { Item } from '../../model/item';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ItemsApiService } from '../../service/items-api.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'category-teaser',
  templateUrl: './category-teaser.component.html',
  styleUrls: ['./category-teaser.component.scss']
})
export class CategoryTeaserComponent {
  @Input()
  public categoryId: string = '';

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
    this.itemsService.getItems(this.categoryId, '', 6)
      .pipe(takeUntil(this.destroyedService$))
      .subscribe(
        items => {
          this.categoryItems = items;
        });
  }

  public getItemsOfCategory(): (Item | null)[] {
    return this.categoryItems;
  }

  public getFirstLinkFromItem(item: Item) {
    return item.getLinkOfLowestPriceItem();
  }
}
