import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {Secrets} from 'src/app/configurations/secrets';
import {ContentService} from 'src/app/service/content.service';
import {ThingOfInterest} from 'src/app/model/thing-of-interest';
import {Link, LinkType} from "../../../model/link";

@Component({
  selector: 'manage-thing-of-interest',
  templateUrl: './manage-thing-of-interest.component.html',
  styleUrls: ['./manage-thing-of-interest.component.scss']
})
export class ManageThingOfInterestComponent implements OnDestroy {
  private secret: number = 0;
  private itemId = '';
  private subscriptions: Subscription[] = [];
  public secretParameter = '';
  public item: ThingOfInterest | undefined;

  public constructor(private contentService: ContentService,
                     activatedRoute: ActivatedRoute,
                     router: Router) {
    this.subscriptions.push(activatedRoute.queryParams.subscribe((parameters: Params): void => {
      this.secretParameter = parameters['secret'] || '';
      this.secret = Secrets.stringToSecretHash(this.secretParameter);
      if (this.secret !== Secrets.ITEMS.ADMIN_SECRET) {
        router.navigate(['']);
      }
    }));

    this.subscriptions.push(activatedRoute.params.subscribe((parameters: Params): void => {
      this.itemId = parameters['itemId'] || '';
      this.loadItem();
    }));
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  private loadItem(): void {
    console.log(this.itemId);
    this.subscriptions.push(this.contentService.getThingOfInterest(this.itemId).subscribe((item: ThingOfInterest | undefined): void => {
      this.item = item;
    }));
  }

  public updateItemTitle(event: Event): void {
    if (!this.item) {
      return;
    }

    this.item.title = ((event.target as HTMLInputElement).value);
    this.saveItem();
  }

  public updateItemTitleImage(event: Event): void {
    if (!this.item) {
      return;
    }

    this.item.images = [((event.target as HTMLInputElement).value)];
    this.saveItem();
  }

  public updateItemLink(event: Event, typeOfLink: LinkType): void {
    if (!this.item) {
      return;
    }

    this.item.links = (this.item.links || []).filter((link: Link): boolean => link.typeOfLink !== typeOfLink);
    const uri: string = ((event.target as HTMLInputElement).value);
    if (uri) {
      this.item.links.push({
        uri,
        typeOfLink
      });
    }

    this.saveItem();
  }

  public updateItemNavigationId(event: Event): void {
    if (!this.item) {
      return;
    }

    this.item.navigationId = ((event.target as HTMLInputElement).value);
    this.saveItem();
  }

  public updateItemDescription(event: Event): void {
    if (!this.item) {
      return;
    }

    this.item.description = ((event.target as HTMLInputElement).value);
    this.saveItem();
  }

  public updateItemAddressStreet(event: Event): void {
    if (!this.item) {
      return;
    }

    this.item.address = this.item?.address || {};
    this.item.address.street = ((event.target as HTMLInputElement).value);
    this.saveItem();
  }

  public updateItemAddressZipCode(event: Event): void {
    if (!this.item) {
      return;
    }

    this.item.address = this.item?.address || {};
    this.item.address.zipCode = ((event.target as HTMLInputElement).value);
    this.saveItem();
  }

  public updateItemAddressCity(event: Event): void {
    if (!this.item) {
      return;
    }

    this.item.address = this.item?.address || {};
    this.item.address.city = ((event.target as HTMLInputElement).value);
    this.saveItem();
  }

  public updateItemAddressCountry(event: Event): void {
    if (!this.item) {
      return;
    }

    this.item.address = this.item?.address || {};
    this.item.address.country = ((event.target as HTMLInputElement).value);
    this.saveItem();
  }

  public getLinkOfType(linkType: LinkType): string {
    return (this.item?.links || []).find((link: Link): boolean => link.typeOfLink === linkType)?.uri || '';
  }

  private saveItem(): void {
    if (!this.item) {
      return;
    }

    if (this.item?.title === '') {
      return;
    }

    this.subscriptions.push(this.contentService.saveThingOfInterest(this.item, this.secretParameter)
      .subscribe((): void => {}));
  }

  protected readonly LinkType = LinkType;
}
