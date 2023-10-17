import {Component, Inject, inject, Input, PLATFORM_ID} from '@angular/core';

import {Item} from 'src/app/model/item';
import {TrackingService} from 'src/app/service/tracking.service';
import {TrackingActivityItem} from 'src/app/model/tracking-activity-item';
import {TrackingInterestLevel} from 'src/app/model/tracking-interest-level';
import {NavigationService} from '../../service/navigation.service';
import {NavigationItem} from '../../model/navigation-item';
import {ActivatedRoute} from '@angular/router';
import {isPlatformBrowser} from "@angular/common";
import {Navigation} from "../../configurations/navigation";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

    private route = inject(ActivatedRoute);
    private trackingService = inject(TrackingService);
    private navigationService = inject(NavigationService);
    private platformId: Object = inject(PLATFORM_ID);

    @Input()
    public item: Item | null = null;

    @Input()
    public additionalCssClasses: string = '';

    @Input()
    public displayMode = ItemDisplayMode.DEFAULT;

    private isOnClientSide(): boolean {
      return isPlatformBrowser(this.platformId);
    }

    private getParameterFromUrl(parameterKey: string): string | null {
      return this.isOnClientSide() ? new URL(window.location.href).searchParams.get(parameterKey) : '';
    }

    public pickedInformation(item: Item): void {
      this.trackingService.addActivity(
        TrackingActivityItem.create()
          .setInformationItemId(item.itemId)
          .setInterestLevel(TrackingInterestLevel.HIGH)
          .setSearchPattern(this.getParameterFromUrl('search') || '')
          .setfFilters(this.getParameterFromUrl('filters') || '')
          .setTrackingId('item.clicked'));
    }

    private getHyphenatedString(value: string) {
      return (value || '').substring(0, 100)
        .replace(",", "")
        .replace(/[^\w\s]/gi, '')
        .replace(/[()]/g, '')
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

    private getNextNavigationItem(): NavigationItem | undefined {
        let items = this.navigationService.nextNavigationItems;
        items = items?.length ? items : Navigation.getAllRootItems();

        return items
          .find(nextNavigationItem =>
            -1 !== (this.item?.navigationPath || []).indexOf(nextNavigationItem.toId || ''));
    }

    private isCategoryItem(): boolean {
      return ItemDisplayMode.CATEGORY === this.displayMode;
    }

    get itemUrl(): string {
        if (this.isCategoryItem()) {
          const searchPattern = this.route.snapshot?.queryParamMap?.get('search') as string;
          const navigationItem = this.getNextNavigationItem();
          return '/' +
            (navigationItem?.pathParts || []).filter(pathPart => pathPart).join('/') +
            (searchPattern ? `?search=${searchPattern}` : '');
        }

        return this.getSeoFriendlySingleProductViewUrl(this.item);
    }

    get showHashtags(): boolean {
      return ItemDisplayMode.DEFAULT === this.displayMode;
    }

    get showPrice(): boolean {
        return ItemDisplayMode.DEFAULT === this.displayMode || ItemDisplayMode.TEASER == this.displayMode;
    }

    get showWishlistIcon(): boolean {
      return ItemDisplayMode.DEFAULT === this.displayMode;
    }

    get itemTitle(): string {
      if (this.isCategoryItem()) {
        return `NAVIGATION_${this.getNextNavigationItem()?.toId || ''}`;
      }

      return this.item?.title || '';
    }

    get cssModifier(): string {
      return this.isCategoryItem() ? '--category' : '';
    }

    get showBig(): boolean {
      return ItemDisplayMode.TEASER !== this.displayMode;
    }

    get renderedReduction(): string {
      if (ItemDisplayMode.CATEGORY === this.displayMode) {
        return '';
      }

      return Item.renderReductionOfLowestPriceItem(this.item);
    }
}

export enum ItemDisplayMode {
  DEFAULT,
  CATEGORY,
  TEASER
}
