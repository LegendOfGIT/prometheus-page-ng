import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router, RouterLink} from '@angular/router';

import {Secrets} from 'src/app/configurations/secrets';
import {ContentService} from 'src/app/service/content.service';
import {ThingOfInterest} from 'src/app/model/thing-of-interest';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'manage-things-of-interest',
  templateUrl: './manage-things-of-interest.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  styleUrls: ['./manage-things-of-interest.component.scss']
})
export class ManageThingsOfInterestComponent implements OnDestroy {
  private secret: number = 0;
  private subscriptions: Subscription[] = [];
  public newItem: ThingOfInterest = { title: '', typeOfItem: 'SHOP' };
  public secretParameter= '';
  public items: ThingOfInterest[] = [];

  public constructor(private contentService: ContentService,
                     activatedRoute: ActivatedRoute,
                     router: Router) {
    this.subscriptions.push(activatedRoute.queryParams.subscribe((parameters: Params): void => {
      this.secretParameter = parameters['secret'] || '';
      this.secret = Secrets.stringToSecretHash(this.secretParameter);
      if (this.secret !== Secrets.ITEMS.ADMIN_SECRET) {
        router.navigate(['']);
      }

      this.loadItems();
    }));
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  private loadItems(): void {
    this.subscriptions.push(this.contentService.getThingsOfInterest().subscribe((items: ThingOfInterest[]): void => {
      this.items = items;
    }));
  }

  public removeItem(id: string): void {
    this.subscriptions.push(this.contentService.removeThingOfInterestById(id, this.secretParameter).subscribe((): void => {
      this.loadItems();
    }));
  }

  public updateNewItemTitle(event: Event): void {
    this.newItem.title = ((event.target as HTMLInputElement).value);
  }

  public saveNewItem(): void {
    if (this.newItem.title === '') {
      return;
    }

    this.subscriptions.push(this.contentService.saveThingOfInterest(this.newItem, this.secretParameter)
      .subscribe((): void => {
        this.newItem = { title: '', typeOfItem: 'SHOP' };
        this.loadItems();
      }));
  }
}
