import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import {Meta, Title} from '@angular/platform-browser';

import { Module, NavigationService } from 'src/app/service/navigation.service';
import { TranslationService } from 'src/app/service/translation.service';
import { Startpage } from 'src/app/configurations/startpage';
import { TeaserItem } from 'src/app/model/teaser-item';

@Component({
  selector: 'start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {
  public STARTPAGE_TEASER_ITEMS: Array<TeaserItem> = Startpage.TEASER_ITEMS;

  constructor(
    route: ActivatedRoute,
    private navigationService: NavigationService,
    private metaService: Meta,
    translationService: TranslationService,
    titleService: Title,
    @Inject(DOCUMENT) private doc: Document,
    @Inject(PLATFORM_ID) private platformId: Object) {

    route.paramMap.subscribe((): void => {
      this.navigationService.activeModule = Module.HOME;
    });

    const { SEO_PAGE_TITLE } = translationService.getTranslations();
    titleService.setTitle(SEO_PAGE_TITLE);
  }

  private heroes: Array<Hero> = [
    {
      backgroundImage: 'url("/assets/heroes/tonies.png"), linear-gradient(180deg, rgba(211,0,15,1) 71%, rgba(255,208,204,1) 95%, rgba(243,244,242,1) 100%)',
      backgroundPositionY: '2%',
      heroText: 'HERO_DISCOVER_TONIES',
      heroUrl: '/kids?search=tonie'
    }
  ];

  public currentHero: Hero | undefined = undefined;

  ngOnInit(): void {
    if (!isPlatformServer(this.platformId)) {
      this.showNextHero();
      setInterval((): void => {
        this.showNextHero();
      }, 12000);

      return;
    }

    const link: HTMLLinkElement = this.doc.createElement('link');
    this.doc.head.appendChild(link);
    link.setAttribute('rel', 'canonical');
    const pageUri: string = 'https://www.wewanna.shop/' + this.doc.URL.replace(new RegExp('(http:\/\/|\/\/).*?\/'), '');
    link.setAttribute('href', pageUri);

    const contentModel: HTMLScriptElement = this.doc.createElement('script');
    contentModel.setAttribute('type', 'application/ld+json');

    const seoDescription: string = 'Entdecke und kaufe deine Lieblingsprodukte in einer Umgebung, die deine Privatsphäre respektiert. Genieße anonymes Online-Shopping ohne Analyse oder Datenverfolgung. Erlebe sorgenfreies Internet-Shopping genau für dich entwickelt!';
    contentModel.innerHTML = JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'WebSite',
      description: seoDescription,
      logo: 'https://www.wewanna.shop/favicon.ico',
      name: 'WeWanna.shop',
      url: 'https://www.wewanna.shop'
    });
    this.doc.head.appendChild(contentModel);

    this.metaService.updateTag({ name: 'description', content: seoDescription });
    this.metaService.updateTag({ name: 'og:title', content: 'Deine Lieblingsprodukte auf WeWanna.shop' });
    this.metaService.updateTag({ name: 'og:type', content: 'website' });
  }

  private showNextHero(): void {
    let currentHeroIndex: number = this.heroes.indexOf(this.currentHero || new Hero());
    currentHeroIndex = this.heroes.length -1 === currentHeroIndex ? 0 : currentHeroIndex + 1;

    this.currentHero = this.heroes[currentHeroIndex];
  }
}

class Hero {
  backgroundPositionX?: string = ''
  backgroundPositionY?: string = ''
  backgroundImage: string = ''
  backgroundSize?: string = '';
  heroText: string = '';
  heroTextMarginTop?: string = '';
  heroUrl: string = '';
}
