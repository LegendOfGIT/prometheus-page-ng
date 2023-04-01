import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserService } from './service/user.service';
import { SearchProfilesApiService } from './service/search-profiles-api.service';
import { TrackingService } from './service/tracking.service';
import { WishlistItemsApiService } from './service/wishlist-items-api.service';
import { GdprService } from './service/gdpr.service';
import { GdprDecision } from './model/gdpr-settings';
import { ConsentService } from './service/consent-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit  {
  private destroyedService$ = new Subject();

  @ViewChild('gdpr') gdpr: ElementRef | undefined;

  title = 'prometheus-page';

  constructor(
    private userService: UserService,
    private searchProfilesApiService: SearchProfilesApiService,
    private wishlistItemsService: WishlistItemsApiService,
    private gdprService: GdprService,
    private consentService: ConsentService,
    @Inject(PLATFORM_ID) private platformId: Object,
    trackingService: TrackingService
  ) {

  }

  ngOnInit(): void {
    this.initialiseSearchProfiles();
    this.initialiseWishlist();

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    setInterval(
      () => this.consentService.deleteInformationStoredWithoutConsent(),
      3000);
  }

  ngAfterViewInit() {
    if (GdprDecision.NoDecision !== this.gdprService.getSettings()?.gdprDecision) {
      return;
    }

    setTimeout(
      () => this.gdpr?.nativeElement.click(),
      5000);
  }

  private initialiseSearchProfiles(): void {
    if (this.searchProfilesApiService.items?.length) {
      return;
    }

    this.searchProfilesApiService.getItems(this.userService.activeUser?.id || '')
      .pipe(takeUntil(this.destroyedService$))
      .subscribe((items) => { this.searchProfilesApiService.items = items || []; });

    this.searchProfilesApiService.getSearchProfile(this.userService.activeUser?.activeSearchProfile || '')
      .pipe(takeUntil(this.destroyedService$))
      .subscribe((item) => { this.searchProfilesApiService.activeItem = item; });
  }

  private initialiseWishlist(): void {
    if (this.wishlistItemsService.items?.length) {
      return;
    }

    this.wishlistItemsService.getItems(this.userService.activeUser?.id || '')
      .pipe(takeUntil(this.destroyedService$))
      .subscribe((items) => { this.wishlistItemsService.items = items || []; });
  }

}
