import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  Optional,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import {Router} from '@angular/router';
import {isPlatformServer} from '@angular/common';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import {Request} from 'express';

import {Item} from '../../model/item';
import {ItemsApiService} from '../../service/items-api.service';
import {NavigationItem} from '../../model/navigation-item';
import {UserService} from '../../service/user.service';
import {ItemComponent, ItemDisplayMode} from '../item/item.component';
import {ItemsResponse} from '../../model/items-response';
import {ModeratedTeaserMode} from './moderated-teaser-mode';

@Component({
  selector: 'moderated-teaser',
  templateUrl: './moderated-teaser.component.html',
  styleUrls: ['./moderated-teaser.component.scss']
})
export class ModeratedTeaserComponent implements OnInit, AfterViewInit {
  private currentItemIndex: number = -1;

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
    @Optional() @Inject(REQUEST) private request: Request
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

  private initialiseItems(): void {
    if (isPlatformServer(this.platformId) && !this.ssrRendering) {
      return;
    }

    this.items = [
      new Item(), new Item(), new Item(), new Item(), new Item(), new Item()
    ];

    this.itemsService.getItems(
      this.navigationId,
      this.searchPattern,
      (this.filters || []).join('-'),
      this.numberOfItems,
      false,
      undefined,
      undefined,
      undefined,
      this.hashtags,
      this.createdToday).subscribe((itemsResponse: ItemsResponse): void => {
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

  public getNextItem(): Item | null {
    this.currentItemIndex++;
    return this.items.length > this.currentItemIndex ? this.items[this.currentItemIndex] || null : null;
  }

  public getItemsPattern(): number[] {
    return this.cssClassMapping[this.moderatedTeaserMode];
  }
}

interface ItemContainer {
  items: Array<Item | null>
}
