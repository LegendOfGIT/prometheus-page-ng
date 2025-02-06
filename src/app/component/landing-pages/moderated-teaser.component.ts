import {
  AfterViewInit,
  Component,
  ElementRef, inject,
  Inject,
  Input,
  OnInit,
  Optional,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import {Router} from '@angular/router';
import {isPlatformServer} from '@angular/common';
import {Request} from 'express';
import {Observable} from 'rxjs';

import {Item} from '../../model/item';
import {ItemsApiService} from '../../service/items-api.service';
import {NavigationItem} from '../../model/navigation-item';
import {UserService} from '../../service/user.service';
import {ItemDisplayMode} from '../item/item.component';
import {ItemsResponse} from '../../model/items-response';
import {ModeratedTeaserMode} from './moderated-teaser-mode';
import {HyphenationPipe} from '../../pipes/web.pipe';
import {TrackingActivityItem} from '../../model/tracking-activity-item';
import {TrackingInterestLevel} from '../../model/tracking-interest-level';
import {TrackingService} from '../../service/tracking.service';

@Component({
  selector: 'moderated-teaser',
  templateUrl: './moderated-teaser.component.html',
  styleUrls: ['./moderated-teaser.component.scss']
})
export class ModeratedTeaserComponent implements OnInit, AfterViewInit {
  private hyphenationPipe: HyphenationPipe = inject(HyphenationPipe);
  private trackingService: TrackingService = inject(TrackingService);

  @ViewChild('teaserSection') teaserSection: ElementRef | undefined;

  @Input()
  public navigationItem: NavigationItem | undefined = undefined;

  @Input()
  public numberOfItems = 6;

  @Input()
  public navigationId = '';

  @Input()
  public searchPattern = '';

  @Input()
  public headerTitle = '';

  @Input()
  public linkUri = '';

  @Input()
  public hashtags: string[] | undefined = undefined;

  @Input()
  public filters: string[] | undefined = undefined;

  @Input()
  public ssrRendering = false;

  @Input()
  public createdToday = false;

  @Input()
  public bigImageLeft = true;

  @Input()
  public moderatedTeaserMode: ModeratedTeaserMode = ModeratedTeaserMode.START_WITH_BIG_END_WITH_SMALL;

  public DISPLAY_MODE_TEASER: ItemDisplayMode = ItemDisplayMode.TEASER;

  public items: Array<Item | null> = [];
  public itemContainers: ItemContainer[] = [];

  private cssClassMapping = {
    [ModeratedTeaserMode.START_WITH_BIG_END_WITH_SMALL] : [ 1, 2, 2],
    [ModeratedTeaserMode.START_WITH_SMALL_END_WITH_BIG] : [ 2, 2, 1 ],
    [ModeratedTeaserMode.THREE_TIMES_BIG] : [ 1, 1, 1 ],
    [ModeratedTeaserMode.ALL_SMALL]: [ 2, 2, 2 ]
  }

  constructor(
    private itemsService: ItemsApiService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject('REQUEST') private request: Request // TODO: inject request
  ) {
  }

  ngAfterViewInit(): void {
    if(isPlatformServer(this.platformId)) {
      return;
    }

    const threshold = 0.2; // how much % of the element is in view
    const observer: IntersectionObserver = new IntersectionObserver(
      (entries: Array<IntersectionObserverEntry>): void => {
        entries.forEach((entry: IntersectionObserverEntry): void => {
          if (!entry.isIntersecting) {
            return;
          }

          this.initialiseItems();

          observer.disconnect();
        });
      },
      { threshold }
    );

    if (!this.teaserSection || this.ssrRendering) { return; }
    observer.observe(this.teaserSection.nativeElement);
  }

  ngOnInit(): void {
    if (!this.ssrRendering) { return; }
    this.initialiseItems();
  }

  public navigateToMore(event: Event): void {
    if (UserService.isBotRequest(this.request)) {
      return;
    }

    event.preventDefault();
    this.router.navigateByUrl(this.linkUri);
    return;
  }

  public imageLoadingError(item: Item | null): void {
    for (let itemContainer of this.itemContainers) {
      for (let itemFromContainerIndex = 0; itemFromContainerIndex <= itemContainer.items.length; itemFromContainerIndex++) {
        const itemFromContainer: Item | null = itemContainer.items[itemFromContainerIndex];
        if (itemFromContainer !== item) {
          continue;
        }

        const emptyItem: Item = new Item();
        emptyItem.id = item?.id || '';
        itemContainer.items[itemFromContainerIndex] = emptyItem;
      }
    }

    this.getItems(1, true).subscribe((itemsResponse: ItemsResponse): void => {
      const itemFromResponse: Item | null | undefined = itemsResponse?.items?.length ? itemsResponse.items[0] : undefined;
      if (!itemFromResponse) {
        return;
      }

      for (let itemContainer of this.itemContainers) {
        for (let itemFromContainerIndex = 0; itemFromContainerIndex <= itemContainer.items.length; itemFromContainerIndex++) {
          const itemFromContainer: Item | null = itemContainer.items[itemFromContainerIndex];
          if (itemFromContainer?.id !== item?.id) {
            continue;
          }

          itemContainer.items[itemFromContainerIndex] = itemFromResponse;
        }
      }
    });
  }

  public getItemUrl(item: Item | null): string {
    if (!item) {
      return '';
    }

    return `p/${item.id}/${this.hyphenationPipe.transform(item.title)}`;
  }

  public pickedInformation(item: Item): void {
    this.trackingService.addActivity(
      TrackingActivityItem.create()
        .setInformationItemId(item.itemId)
        .setInformationItemLabel(this.hyphenationPipe.transform(item?.title))
        .setInterestLevel(TrackingInterestLevel.HIGH)
        .setSearchPattern(this.searchPattern)
        .setFilters((this.filters || []).join('-'))
        .setTrackingId('item.clicked'));
  }

  private getItems(numberOfItems: number, randomItems: boolean): Observable<ItemsResponse> {
    return this.itemsService.getItems(
      this.navigationId,
      this.searchPattern,
      (this.filters || []).join('-'),
      numberOfItems,
      randomItems,
      undefined,
      undefined,
      undefined,
      this.hashtags,
      this.createdToday
    )
  }

  private initialiseItems(): void {
    if (isPlatformServer(this.platformId) && !this.ssrRendering) {
      return;
    }

    this.items = [
      new Item(), new Item(), new Item(), new Item(), new Item(), new Item()
    ];
    this.distributeItemsInContainers();

    this.getItems(this.numberOfItems, false).subscribe((itemsResponse: ItemsResponse): void => {
      if (itemsResponse?.items?.length) {
        this.items = itemsResponse.items;
        this.distributeItemsInContainers();
      }
    });
  }

  private distributeItemsInContainers(): void {
    const itemContainers: ItemContainer[] = [];

    let itemIndex = -1;
    for (let numberOfItems of this.cssClassMapping[this.moderatedTeaserMode]) {
      const items: Array<Item | null> = [];
      for (let i= 1; i <= numberOfItems; i++) {
        itemIndex++;
        items.push(this.items.length > itemIndex ? this.items[itemIndex] : null);
      }
      itemContainers.push({ items })
    }

    this.itemContainers = itemContainers;
  }
}

interface ItemContainer {
  items: Array<Item | null>
}
