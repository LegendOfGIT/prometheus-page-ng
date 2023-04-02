import {Component, Inject, PLATFORM_ID, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import { DOCUMENT, isPlatformServer } from '@angular/common';

import {Item} from 'src/app/model/item';
import {ItemsApiService} from 'src/app/service/items-api.service';
import {Module, NavigationService} from 'src/app/service/navigation.service';
import {TrackingService} from 'src/app/service/tracking.service';
import {TrackingActivityItem} from 'src/app/model/tracking-activity-item';
import {TrackingInterestLevel} from 'src/app/model/tracking-interest-level';
import {TranslationService} from "../../service/translation.service";
import {Title} from "@angular/platform-browser";
import {Navigation} from "../../configurations/navigation";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

    private destroyedService$ = new Subject();
    public items: Array<Item | null> = [
      new Item(), new Item(), new Item(),
      new Item(), new Item(), new Item(),
      new Item(), new Item(), new Item(),
      new Item(), new Item(), new Item()
    ];

    constructor(
      private route: ActivatedRoute,
      private itemsService: ItemsApiService,
      private navigationService: NavigationService,
      private trackingService: TrackingService,
      translationService: TranslationService,
      titleService: Title,
      @Inject(DOCUMENT) private doc: Document,
      @Inject(PLATFORM_ID) private platformId: Object
    ) {

      route.paramMap.subscribe((params) => {
        this.navigationService.activeModule = Module.ITEMS;

        this.navigationService.setActiveNavigationLevelIds([
          params.get('navigationIdLevelA') || '',
          params.get('navigationIdLevelB') || '',
          params.get('navigationIdLevelC') || ''
        ]);
      });

      const translations = translationService.getTranslations();
      titleService.setTitle(
        translations.SEO_CATEGORY_PAGE_TITLE.replace('{category}',
          translations['NAVIGATION_' + this.navigationService.activeNavigationItem?.toId]));
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

        if (isPlatformServer(this.platformId)) {
          const link: HTMLLinkElement = this.doc.createElement('link');
          this.doc.head.appendChild(link);
          link.setAttribute('rel', 'canonical');
          const pageUri = 'https://www.wewanna.shop/' + this.doc.URL.replace(new RegExp('(http:\/\/|\/\/).*?\/'), '');
          link.setAttribute('href', pageUri);
        }

    }

    public pickedInformation(item: Item): void {
      this.trackingService.addActivity(
        TrackingActivityItem.create()
          .setInformationItemId(item.itemId)
          .setInterestLevel(TrackingInterestLevel.VERY_HIGH)
          .setTrackingId('overview.item.clicked'));
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
}
