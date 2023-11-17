import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT, isPlatformServer } from '@angular/common';

import { Module, NavigationService } from '../../service/navigation.service';
import { Meta, Title } from '@angular/platform-browser';
import { TranslationService } from '../../service/translation.service';
import { HashTagsApiService } from '../../service/hashtags-api.service';
import {Startpage} from "../../configurations/startpage";
import {TeaserItem} from "../../model/teaser-item";

@Component({
  selector: 'start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {
  public STARTPAGE_TEASER_ITEMS: Array<TeaserItem> = Startpage.TEASER_ITEMS;

  constructor(
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private translationService: TranslationService,
    private hashtagsService: HashTagsApiService,
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) private doc: Document,
    @Inject(PLATFORM_ID) private platformId: Object) {

    route.paramMap.subscribe((): void => {
      this.navigationService.activeModule = Module.HOME;
    });

    const { SEO_PAGE_KEYWORDS, SEO_PAGE_TITLE } = translationService.getTranslations();
    titleService.setTitle(SEO_PAGE_TITLE);
    metaService.updateTag({ name: 'keywords', content: SEO_PAGE_KEYWORDS })
  }

  private heroes: Array<Hero> = [
    {
      background: 'rgb(211,0,15)',
      backgroundImage: 'url("/assets/heroes/tonies.png"), linear-gradient(180deg, rgba(211,0,15,1) 71%, rgba(255,208,204,1) 95%, rgba(243,244,242,1) 100%)',
      heroText: 'HERO_DISCOVER_TONIES',
      heroUrl: '/kids?search=tonie'
    },
    {
      background: 'rgb(255,250,239)',
      backgroundImage: 'url("/assets/heroes/dunleath.jpg"), linear-gradient(180deg, rgba(255,250,239,1) 0%, rgba(255,250,239,1) 27%, rgba(243,244,242,1) 100%)',
      heroText: 'HERO_DISCOVER_DUNLEATH',
      heroUrl: '/beauty-and-care?filters=1000119'
    },
    {
      background: 'rgb(255,208,204)',
      backgroundImage: 'url("/assets/heroes/100pp.jpg"), linear-gradient(180deg, rgba(255,133,130,1) 0%, rgba(255,208,204,1) 69%, rgba(243,244,242,1) 100%)',
      heroText: '',
      heroUrl: '/beauty-and-care?filters=1000018'
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
    const pageUri = 'https://www.wewanna.shop/' + this.doc.URL.replace(new RegExp('(http:\/\/|\/\/).*?\/'), '');
    link.setAttribute('href', pageUri);
  }

  private showNextHero(): void {
    let currentHeroIndex: number = this.heroes.indexOf(this.currentHero || new Hero());
    currentHeroIndex = this.heroes.length -1 === currentHeroIndex ? 0 : currentHeroIndex + 1;

    this.currentHero = this.heroes[currentHeroIndex];
  }

  get whatWeKnow(): string {
    return this.translationService.getTranslations().WHY_WEWANNA_WHAT_WE_KNOW;
  }
  get whatIsInForYou(): string {
    return this.translationService.getTranslations().WHY_WEWANNA_WHAT_IS_IN_FOR_YOU;
  }
}

class Hero {
  background: string = ''
  backgroundImage: string = ''
  heroText: string = '';
  heroUrl: string = '';
}
