import {AfterViewInit, Component, ElementRef, Inject, OnInit, Optional, PLATFORM_ID, ViewChild} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {Request} from 'express';
import {isPlatformBrowser, NgForOf, NgIf} from '@angular/common';

import {UserService} from './service/user.service';
import {WishlistItemsApiService} from './service/wishlist-items-api.service';
import {GdprService} from './service/gdpr.service';
import {GdprDecision} from './model/gdpr-settings';
import {ConsentService} from './service/consent-service';

import {NavigationItem} from './model/navigation-item';
import {Navigation} from './configurations/navigation';

import {Story} from './model/story';
import {TranslationService} from './service/translation.service';
import {ContentService} from './service/content.service';
import {Module, NavigationService} from './service/navigation.service';
import {MessagesComponent} from "./component/messages/messages.component";
import {FooterComponent} from "./component/footer/footer.component";
import {TranslationPipe} from "./pipes/translation.pipe";
import {GeneralDataProtectionRegulationComponent} from "./component/legal/general-data-protection-regulation.component";
import {HeaderComponent} from "./component/header/header.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    MessagesComponent,
    FooterComponent,
    NgForOf,
    TranslationPipe,
    RouterOutlet,
    GeneralDataProtectionRegulationComponent,
    HeaderComponent,
    NgIf
  ],
  standalone: true
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
    private navigationService: NavigationService,
    private router: Router,
    private userService: UserService,
    contentService: ContentService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject('REQUEST') private request: Request // TODO: inject request
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

    this.router.events.subscribe((evt): void => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }

      window.scrollTo({
        top: 0,
        // @ts-ignore
        behavior: 'instant',
      })
    });

    setInterval(
      () => this.consentService.deleteInformationStoredWithoutConsent(),
      3000);
  }

  ngAfterViewInit(): void {
    if (GdprDecision.NoDecision !== (this.gdprService.getSettings()?.gdprDecision || GdprDecision.NoDecision)) {
      return;
    }

    if (!isPlatformBrowser(this.platformId) || this.userService.isBotRequest(this.request)) {
      return;
    }

    setTimeout(
      () => this.gdpr?.nativeElement.click(),
      5000);
  }

  private initialiseWishlist(): void {
    if (this.userService.isBotRequest(this.request)) {
      return;
    }

    this.wishlistItemsService.getItems();
  }

  get deepestLevelNavigationItems(): Array<NavigationItem> {
    return this.userService.isBotRequest(this.request) ? Navigation.getDeepestLevelItems() : [];
  }

  get StoryItems(): Story[] {
    if (this.navigationService.activeModule === Module.HOME) {
      return this.stories;
    }

    return [];
  }

  get TranslationsLoaded(): boolean {
    return this.translationService.TranslationsLoaded;
  }
}
