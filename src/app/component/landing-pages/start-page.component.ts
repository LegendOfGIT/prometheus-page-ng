import { Component } from '@angular/core';
import {Item} from "../../model/item";
import {takeUntil} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {ItemsApiService} from "../../service/items-api.service";
import {Module, NavigationService} from "../../service/navigation.service";
import {TrackingService} from "../../service/tracking.service";
import {Subject} from "rxjs";

@Component({
  selector: 'start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent {
  private destroyedService$ = new Subject();

  private categoryItems: any = {
      MULTIMEDIA: [
        new Item(), new Item(), new Item(),
        new Item(), new Item(), new Item()
      ]
  };

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsApiService,
    private navigationService: NavigationService
  ) {

    route.paramMap.subscribe((params) => {
      this.navigationService.activeModule = Module.ITEMS;
    });

  }

  ngOnInit(): void {

    const activeNavigationId =
      this.navigationService.activeNavigationItem && this.navigationService.activeNavigationItem.fromId
        ? this.navigationService.activeNavigationItem.toId
        : '';

    this.itemsService.getItems('MULTIMEDIA', '', 6)
      .pipe(takeUntil(this.destroyedService$))
      .subscribe(
        items => {
          this.categoryItems['MULTIMEDIA'] = items;
        });

  }

  public getItemsOfCategory(categoryId: string): Item[] {
    return this.categoryItems[categoryId];
  }

  public getFirstLinkFromItem(item: Item) {
    return item.getLinkOfLowestPriceItem();
  }
}
