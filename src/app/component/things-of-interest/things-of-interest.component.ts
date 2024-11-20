import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

import {ContentService} from 'src/app/service/content.service';
import {ThingOfInterest} from 'src/app/model/thing-of-interest';
import {Address} from 'src/app/model/address';
import {Link, LinkType} from 'src/app/model/link';
import {HyphenationPipe} from 'src/app/pipes/web.pipe';
import {Module, NavigationService} from 'src/app/service/navigation.service';

@Component({
  selector: 'things-of-interest',
  templateUrl: './things-of-interest.component.html',
  styleUrls: ['./things-of-interest.component.scss']
})
export class ThingsOfInterestComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  public thingsOfInterests: ThingOfInterest[] = [];

  public readonly LinkType = LinkType;

  public constructor(private sanitizer: DomSanitizer,
                     private hyphenationPipe: HyphenationPipe,
                     navigationService: NavigationService,
                     contentService: ContentService) {
    navigationService.activeModule = Module.THINGS_OF_INTEREST;

    this.subscriptions.push(contentService.getThingsOfInterest().subscribe((items: ThingOfInterest[]): void => {
      this.thingsOfInterests = items.sort((a: ThingOfInterest, b: ThingOfInterest) => (b.createdOn || '').localeCompare(a.createdOn || ''));
    }));
  }

  public getSanitizedElementContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content + '<br/><b>weiterlesen -></b>');
  }

  public addressOf(thingOfInterest: ThingOfInterest): string {
    const address: Address | undefined = thingOfInterest.address;
    return address ? `${address.street}, ${address.zipCode} ${address.city}${address.country ? ` ${address.country}` : ''}` : '';
  }

  public linkTo(thingOfInterest: ThingOfInterest): string {
    return `/things-of-interest/${thingOfInterest.id}/${this.hyphenationPipe.transform(thingOfInterest.title)}`;
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
}
