import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';

import { Navigation } from 'src/app/configurations/navigation';
import { NavigationItem } from 'src/app/model/navigation-item';
import { ContentService } from 'src/app/service/content.service';
import { ThingOfInterest } from 'src/app/model/thing-of-interest';
import { Link, LinkType } from 'src/app/model/link';
import {Module, NavigationService} from 'src/app/service/navigation.service';
import {Address} from "../../model/address";
import {SharedComponentsModule} from "../shared-components.module";
import {TranslationPipe} from "../../pipes/translation.pipe";
import {CategoryTeaserComponent} from "../landing-pages/category-teaser.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'thing-of-interest',
  templateUrl: './thing-of-interest.component.html',
  standalone: true,
  imports: [
    SharedComponentsModule,
    TranslationPipe,
    CategoryTeaserComponent,
    NgClass,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./thing-of-interest.component.scss']
})
export class ThingOfInterestComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  public thingOfInterest: ThingOfInterest | undefined;

  public constructor(private sanitizer: DomSanitizer,
                     metaService: Meta,
                     titleService: Title,
                     activatedRoute: ActivatedRoute,
                     contentService: ContentService,
                     navigationService: NavigationService) {
    navigationService.activeModule = Module.THINGS_OF_INTEREST;

    this.subscriptions.push(activatedRoute.params.subscribe((params: Params): void => {
      this.subscriptions.push(contentService.getThingOfInterest(params['thingOfInterestId']).subscribe((thingOfInterest: ThingOfInterest | undefined): void => {
        this.thingOfInterest = thingOfInterest;
        titleService.setTitle(this.thingOfInterest?.title ? `${this.thingOfInterest?.title}` : 'We wanna shop!');
        metaService.addTag({name: 'og:title', content: titleService.getTitle()});

        if (this.thingOfInterest?.titleImage) {
          metaService.updateTag({name: 'og:image', content: this.thingOfInterest?.titleImage ?? ''});
          metaService.addTag({name: 'og:image:height', content: '450'});
          metaService.addTag({name: 'og:image:width', content: '450'});
        }

        if (this.thingOfInterest?.description) {
          metaService.updateTag({
            name: 'description',
            content: this.thingOfInterest.description
          });
        }
      }));
    }));
  }

  get SanitizedDescription(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.thingOfInterest?.description || '');
  }

  public getNavigationItemOfThingOfInterest(): NavigationItem | undefined {
    return Navigation.getNavigationItemByToId(this.thingOfInterest?.navigationId ?? '');
  }

  public addressOf(thingOfInterest: ThingOfInterest): string {
    const address: Address | undefined = thingOfInterest.address;
    return address ? `${address.street}, ${address.zipCode} ${address.city}${address.country ? ` ${address.country}` : ''}` : '';
  }

  public iconOfLink(link: Link): string {
    if (link.typeOfLink === LinkType.Facebook) {
      return 'facebook_icon.png';
    }

    if (link.typeOfLink === LinkType.Instagram) {
      return 'instagram-icon.webp';
    }

    if (link.typeOfLink === LinkType.Pinterest) {
      return 'pinterest.png';
    }

    if (link.typeOfLink === LinkType.YouTube) {
      return 'youtube.png';
    }

    return '';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  protected readonly LinkType = LinkType;
}
