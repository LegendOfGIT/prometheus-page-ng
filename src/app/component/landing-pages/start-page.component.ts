import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';

import { Module, NavigationService } from '../../service/navigation.service';
import { Navigation } from '../../configurations/navigation';
import { NavigationItem } from '../../model/navigation-item';
import { Meta, Title } from '@angular/platform-browser';
import { TranslationService } from '../../service/translation.service';
import { HashTagsApiService } from '../../service/hashtags-api.service';

@Component({
  selector: 'start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {
  public hasUserSearched = false;

  constructor(
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private translationService: TranslationService,
    private hashtagsService: HashTagsApiService,
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) private doc: Document,
    @Inject(PLATFORM_ID) private platformId: Object) {

    route.paramMap.subscribe(() => {
      this.navigationService.activeModule = Module.HOME;
    });

    const { SEO_PAGE_KEYWORDS, SEO_PAGE_TITLE } = translationService.getTranslations();
    titleService.setTitle(SEO_PAGE_TITLE);
    metaService.updateTag({ name: 'keywords', content: SEO_PAGE_KEYWORDS })
  }

  ngOnInit(): void {
    this.hasUserSearched = '' !== (this.getParameterFromUrl('search') || '');

    if (!isPlatformServer(this.platformId)) {
      return;
    }

    const link: HTMLLinkElement = this.doc.createElement('link');
    this.doc.head.appendChild(link);
    link.setAttribute('rel', 'canonical');
    const pageUri = 'https://www.wewanna.shop/' + this.doc.URL.replace(new RegExp('(http:\/\/|\/\/).*?\/'), '');
    link.setAttribute('href', pageUri);
  }

  private isOnClientSide(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private getParameterFromUrl(parameterKey: string): string | null {
    return this.isOnClientSide() ? new URL(window.location.href).searchParams.get(parameterKey) : '';
  }

  get allRootRootItems(): Array<NavigationItem | undefined> {
    const rankedCategoryIds = this.hashtagsService.rankedCategoryIds || [];

    return (rankedCategoryIds.map(categoryId => Navigation.getNavigationItemByToId(categoryId)) || [])
      .concat(Navigation.getAllRootItems().filter(rootCategory => -1 === rankedCategoryIds.indexOf(rootCategory.toId)));
  }

  get whatWeKnow(): string {
    return this.translationService.getTranslations().WHY_WEWANNA_WHAT_WE_KNOW;
  }
  get whatIsInForYou(): string {
    return this.translationService.getTranslations().WHY_WEWANNA_WHAT_IS_IN_FOR_YOU;
  }
}
