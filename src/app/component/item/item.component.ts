import {Component, inject, Input} from '@angular/core';

import {Item} from 'src/app/model/item';
import {TrackingService} from 'src/app/service/tracking.service';
import {TrackingActivityItem} from 'src/app/model/tracking-activity-item';
import {TrackingInterestLevel} from 'src/app/model/tracking-interest-level';
import {NavigationService} from '../../service/navigation.service';
import {NavigationItem} from '../../model/navigation-item';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

    private route = inject(ActivatedRoute);
    private trackingService = inject(TrackingService);
    private navigationService = inject(NavigationService);

    @Input()
    public item: Item | null = null;

    @Input()
    public additionalCssClasses: string = '';

    @Input()
    public displayMode = ItemDisplayMode.DEFAULT;

    public pickedInformation(item: Item): void {
      this.trackingService.addActivity(
        TrackingActivityItem.create()
          .setInformationItemId(item.itemId)
          .setInterestLevel(TrackingInterestLevel.HIGH)
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
        return this.navigationService.nextNavigationItems
          .find(nextNavigationItem =>
            -1 !== (this.item?.navigationPath || []).indexOf(nextNavigationItem.toId || ''));
    }

    private isCategoryItem(): boolean {
      return ItemDisplayMode.CATEGORY === this.displayMode;
    }

    public visitHashtag(hashtag: string): void {
      this.navigationService.navigateWithModifiedQueryParameters(
        [ 'search' ],
        { hashtags: hashtag },
        true);
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

    get showPrice(): boolean {
        return ItemDisplayMode.DEFAULT === this.displayMode;
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
}

export enum ItemDisplayMode {
  DEFAULT,
  CATEGORY
}
