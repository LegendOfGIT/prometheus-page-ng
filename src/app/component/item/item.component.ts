import {Component, inject, Inject, Input} from '@angular/core';

import {Item} from 'src/app/model/item';
import {TrackingService} from 'src/app/service/tracking.service';
import {TrackingActivityItem} from 'src/app/model/tracking-activity-item';
import {TrackingInterestLevel} from 'src/app/model/tracking-interest-level';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

    private trackingService = inject(TrackingService);

    @Input()
    public item: Item | null = null;

    @Input()
    public additionalCssClasses: string = '';

    @Input()
    public showPrice = true;


    public pickedInformation(item: Item): void {
      this.trackingService.addActivity(
        TrackingActivityItem.create()
          .setInformationItemId(item.itemId)
          .setInterestLevel(TrackingInterestLevel.VERY_HIGH)
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
}
