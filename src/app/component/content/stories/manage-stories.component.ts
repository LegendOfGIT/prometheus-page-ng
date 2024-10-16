import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {Secrets} from 'src/app/configurations/secrets';
import {ContentService} from 'src/app/service/content.service';
import {Story} from 'src/app/model/story';

@Component({
  selector: 'manage-stories',
  templateUrl: './manage-stories.component.html',
  styleUrls: ['./manage-stories.component.scss']
})
export class ManageStoriesComponent implements OnDestroy {
  private secret: number = 0;
  private subscriptions: Subscription[] = [];
  public stories: Story[] = [];

  public constructor(private contentService: ContentService,
                     activatedRoute: ActivatedRoute,
                     router: Router) {
    this.subscriptions.push(activatedRoute.queryParams.subscribe((parameters: Params): void => {
      this.secret = Secrets.stringToSecretHash(parameters['secret'] || '');
      if (this.secret !== Secrets.ITEMS.ADMIN_SECRET) {
        router.navigate(['']);
      }

      this.subscriptions.push(this.contentService.getStories().subscribe((stories: Story[]): void => {
        this.stories = stories;
      }));
    }));
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  public removeStory(id: string): void {
    this.subscriptions.push(this.contentService.removeStoryById(id, this.secret).subscribe((): void => {}));
  }
}
