import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Item } from '../../model/item';
import { ActivatedRoute } from '@angular/router';
import { ItemsApiService } from '../../service/items-api.service';
import { NavigationItem } from '../../model/navigation-item';
import { isPlatformServer } from '@angular/common';
import { makeStateKey,  TransferState } from '@angular/platform-browser';
import { UserService } from '../../service/user.service';
import {ItemDisplayMode} from "../item/item.component";

@Component({
  selector: 'moderated-teaser',
  templateUrl: './moderated-teaser.component.html',
  styleUrls: ['./moderated-teaser.component.scss']
})
export class ModeratedTeaserComponent implements OnInit {
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

  public DISPLAY_MODE_TEASER = ItemDisplayMode.TEASER;

  public items: Array<Item | null> = [];

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsApiService,
    private transferState: TransferState,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  private getItemsKey(): string {
    return 'productItems-' + (this.linkUri);
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
      this.hashtags).subscribe(itemsResponse => {
      if (itemsResponse?.items?.length) {
        this.items = itemsResponse.items;
        if (isPlatformServer(this.platformId)) {
          this.transferState.set<Array<Item | null>>(makeStateKey(this.getItemsKey()), this.items);
        }
      }
    });
  }

  ngOnInit(): void {
    this.initialiseItems();
  }
}
