import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Module, NavigationService } from '../../service/navigation.service';
import { Navigation } from '../../configurations/navigation';
import { NavigationItem } from '../../model/navigation-item';
import {Meta, Title} from '@angular/platform-browser';
import { TranslationService } from '../../service/translation.service';

@Component({
  selector: 'start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent {

  constructor(
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    translationService: TranslationService,
    titleService: Title,
    metaService: Meta) {

    route.paramMap.subscribe(() => {
      this.navigationService.activeModule = Module.HOME;
    });

    const { SEO_PAGE_KEYWORDS, SEO_PAGE_TITLE } = translationService.getTranslations();
    titleService.setTitle(SEO_PAGE_TITLE);
    metaService.addTag({ name: 'keywords', content: SEO_PAGE_KEYWORDS })
  }

  get allRootRootItems(): Array<NavigationItem> {
    return Navigation.getAllRootItems();
  }
}
