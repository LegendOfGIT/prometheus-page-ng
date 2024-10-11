import { AfterViewInit, Component, ElementRef, Inject, OnInit, Optional, PLATFORM_ID, ViewChild } from '@angular/core';

import { UserService } from './service/user.service';
import { WishlistItemsApiService } from './service/wishlist-items-api.service';
import { GdprService } from './service/gdpr.service';
import { GdprDecision } from './model/gdpr-settings';
import { ConsentService } from './service/consent-service';
import { isPlatformBrowser } from '@angular/common';
import { NavigationItem } from './model/navigation-item';
import { Navigation } from './configurations/navigation';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import {Story} from "./model/story";
import {Stories} from "./configurations/stories";
import {TranslationService} from "./service/translation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit  {
  @ViewChild('gdpr') gdpr: ElementRef | undefined;

  title = 'prometheus-page';

  constructor(
    private wishlistItemsService: WishlistItemsApiService,
    private gdprService: GdprService,
    private consentService: ConsentService,
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(REQUEST) private request: Request
  ) {

  }

  ngOnInit(): void {
    this.initialiseWishlist();
    this.translationService.getTranslations();

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    setInterval(
      () => this.consentService.deleteInformationStoredWithoutConsent(),
      3000);
  }

  ngAfterViewInit(): void {
    if (GdprDecision.NoDecision !== (this.gdprService.getSettings()?.gdprDecision || GdprDecision.NoDecision)) {
      return;
    }

    if (UserService.isBotRequest(this.request)) {
      return;
    }

    setTimeout(
      () => this.gdpr?.nativeElement.click(),
      5000);
  }

  private initialiseWishlist(): void {
    if (UserService.isBotRequest(this.request)) {
      return;
    }

    this.wishlistItemsService.getItems();
  }

  get deepestLevelNavigationItems(): Array<NavigationItem> {
    return UserService.isBotRequest(this.request) ? Navigation.getDeepestLevelItems() : [];
  }

  get StoryItems(): Story[] {
    return Stories.ITEMS;
  }

  get TranslationsLoaded(): boolean {
    return this.translationService.TranslationsLoaded;
  }
}
