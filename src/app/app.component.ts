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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit  {
  @ViewChild('gdpr') gdpr: ElementRef | undefined;

  title = 'prometheus-page';

  constructor(
    private userService: UserService,
    private wishlistItemsService: WishlistItemsApiService,
    private gdprService: GdprService,
    private consentService: ConsentService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(REQUEST) private request: Request
  ) {

  }

  ngOnInit(): void {
    this.initialiseWishlist();

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
}
