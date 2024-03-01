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
import { Item } from '../../model/item';
import { ItemsApiService } from '../../service/items-api.service';
import { NavigationItem } from '../../model/navigation-item';
import { isPlatformServer } from '@angular/common';
import { UserService } from '../../service/user.service';
import { ItemDisplayMode } from '../item/item.component';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import {ItemsResponse} from "../../model/items-response";
import {Router} from "@angular/router";

@Component({
  selector: 'moderated-teaser',
  templateUrl: './moderated-teaser.component.html',
  styleUrls: ['./moderated-teaser.component.scss']
})
export class ModeratedTeaserComponent implements OnInit, AfterViewInit {
  @ViewChild('teaserSection') teaserSection: ElementRef | undefined;

  @Input()
  public navigationItem: NavigationItem | undefined = undefined;

  @Input()
  public numberOfItems = 7;

  @Input()
  public navigationId = '';

  @Input()
  public searchPattern = '';

  @Input()
  public headerTitle = '';

  @Input()
  public linkUri = '';

  @Input()
  public hashtags: Array<string> | undefined = undefined;

  @Input()
  public filters: Array<string> | undefined = undefined;

  @Input()
  public ssrRendering = false;

  @Input()
  public createdToday = false;

  public DISPLAY_MODE_TEASER: ItemDisplayMode = ItemDisplayMode.TEASER;

  public items: Array<Item | null> = [];

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
    this.ssrRendering = UserService.isBotRequest(this.request) ? this.ssrRendering : false;

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

    this.items = [new Item(), new Item(), new Item(), new Item(), new Item(), new Item(), new Item()];

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
      }
    });
  }
}
