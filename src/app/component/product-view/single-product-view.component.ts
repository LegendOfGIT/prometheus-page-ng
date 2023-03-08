import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Module, NavigationService } from '../../service/navigation.service';
import { ItemsApiService } from '../../service/items-api.service';
import { Item } from '../../model/item';
import { CorrespondingItem } from '../../model/corresponding-item';
import {NavigationItem} from "../../model/navigation-item";
import {Navigation} from "../../configurations/navigation";

@Component({
  selector: 'single-product-view',
  templateUrl: './single-product-view.component.html',
  styleUrls: ['./single-product-view.component.scss']
})
export class SingleProductViewComponent {

  public itemId: string = '';

  public item: Item | null = null;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsApiService,
    private navigationService: NavigationService
  ) {

    route.paramMap.subscribe((params) => {
      this.navigationService.activeModule = Module.SINGLE_PRODUCT_VIEW;
      this.itemId = params.get('itemId') || '';
    });

    itemsService.getItemsById(this.itemId).subscribe(items => {
      if (!items?.length) {
        return;
      }

      this.item = items[0];
    });

  }

  public getShopNameFromUrl(url: string | undefined) {
    const match = (url || '').match(/\/\/(www.)?(.*?)\//);
    return match && match.length > 2 ? match[2] : '';
  }

  get itemWithLowestPrice(): CorrespondingItem | null {
    if (!this.item) {
      return null;
    }

    return this.item.getProviderItemWithLowestPrice();
  }

  get areThereMorePrices(): boolean {
    return (this.item?.providers || []).length > 1;
  }

  get moreExpensiveOfferItems(): Array<CorrespondingItem | null> {
    if (!this.areThereMorePrices) {
      return [];
    }

    return (this.item?.providers || [])
      .filter(providerItem => providerItem !== this.item?.getProviderItemWithLowestPrice())
      .filter(item => (item?.priceCurrent || 0) > 0)
      .sort((a, b) => (a?.priceCurrent || 0) - (b?.priceCurrent || 0));
  }

  get offerItemsWithoutPrice(): Array<CorrespondingItem | null> {
    if (!this.areThereMorePrices) {
      return [];
    }

    return (this.item?.providers || [])
      .filter(providerItem => providerItem !== this.item?.getProviderItemWithLowestPrice())
      .filter(item => 0 === (item?.priceCurrent || 0));
  }

  get navigationItemToCategory(): NavigationItem | undefined {
    const pathTokens = (this.item?.navigationPath || []);
    if (!pathTokens.length) {
      return;
    }

    return Navigation.getNavigationItemByToId(pathTokens[0]);
  }
}
