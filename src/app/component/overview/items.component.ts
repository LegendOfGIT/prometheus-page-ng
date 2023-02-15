import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { Item } from 'src/app/model/item';
import { ItemsApiService } from 'src/app/service/items-api.service';
import { NavigationService } from 'src/app/service/navigation.service';
import { TrackingService } from 'src/app/service/tracking.service';
import { TrackingActivityItem } from 'src/app/model/tracking-activity-item';
import { TrackingInterestLevel } from 'src/app/model/tracking-interest-level';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

    private destroyedService$ = new Subject();
    public selectedItemId: String = '';
    public items: Array<Item | null> = [];

    constructor(
      private route: ActivatedRoute,
      private itemsService: ItemsApiService,
      private navigationService: NavigationService,
      private trackingService: TrackingService
    ) {

      route.paramMap.subscribe((params) => {
        this.navigationService.setActiveNavigationLevelIds([
          params.get('navigationIdLevelA') || '',
          params.get('navigationIdLevelB') || '',
          params.get('navigationIdLevelC') || ''
        ]);
      });

    }

    ngOnInit(): void {

        const activeNavigationId =
          this.navigationService.activeNavigationItem && this.navigationService.activeNavigationItem.fromId
            ? this.navigationService.activeNavigationItem.toId
            : '';
        const searchPattern = this.route.snapshot?.queryParamMap?.get('search') as string;

        this.itemsService.getItems(activeNavigationId, searchPattern)
            .pipe(takeUntil(this.destroyedService$))
            .subscribe(
                items => {
                  this.items = items;
                });


    }

    public getFirstLinkFromItem(item: Item) {
      return item.getLinkOfLowestPriceItem();
    }

    public pickedInformation(item: Item): void {
      this.trackingService.addActivity(
        TrackingActivityItem.create()
          .setInformationItemId(item.itemId)
          .setInterestLevel(TrackingInterestLevel.VERY_HIGH)
          .setTrackingId('overview.item.clicked'));
    }

}
