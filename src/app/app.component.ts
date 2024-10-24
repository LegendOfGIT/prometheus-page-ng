import { AfterViewInit, Component, ElementRef, Inject, OnInit, Optional, PLATFORM_ID, ViewChild } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { isPlatformBrowser } from '@angular/common';

import { UserService } from './service/user.service';
import { WishlistItemsApiService } from './service/wishlist-items-api.service';
import { GdprService } from './service/gdpr.service';
import { GdprDecision } from './model/gdpr-settings';
import { ConsentService } from './service/consent-service';

import { NavigationItem } from './model/navigation-item';
import { Navigation } from './configurations/navigation';

import {Story} from './model/story';
import {TranslationService} from './service/translation.service';
import {ContentService} from './service/content.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit  {
  @ViewChild('gdpr') gdpr: ElementRef | undefined;

  title = 'prometheus-page';
  private stories: Story[] = [];

  constructor(
    private wishlistItemsService: WishlistItemsApiService,
    private gdprService: GdprService,
    private consentService: ConsentService,
    private translationService: TranslationService,
    contentService: ContentService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(REQUEST) private request: Request
  ) {
    contentService.getStories().subscribe((stories: Story[]):  void => {
      this.stories = stories;
    });
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
    return this.stories;
  }

  get TranslationsLoaded(): boolean {
    return this.translationService.TranslationsLoaded;
  }
}
