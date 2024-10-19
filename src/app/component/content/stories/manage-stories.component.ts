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
  public newStory: Story = { canonical: '', title: '' };
  public secretParameter= '';
  public stories: Story[] = [];

  public constructor(private contentService: ContentService,
                     activatedRoute: ActivatedRoute,
                     router: Router) {
    this.subscriptions.push(activatedRoute.queryParams.subscribe((parameters: Params): void => {
      this.secretParameter = parameters['secret'] || '';
      this.secret = Secrets.stringToSecretHash(this.secretParameter);
      if (this.secret !== Secrets.ITEMS.ADMIN_SECRET) {
        router.navigate(['']);
      }

      this.loadStories();
    }));
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  private loadStories(): void {
    this.subscriptions.push(this.contentService.getStories().subscribe((stories: Story[]): void => {
      this.stories = stories;
    }));
  }

  public removeStory(id: string): void {
    this.subscriptions.push(this.contentService.removeStoryById(id, this.secret).subscribe((): void => {
      this.loadStories();
    }));
  }

  public updateNewStoryCanonical(event: Event): void {
    this.newStory.canonical = ((event.target as HTMLInputElement).value);
  }

  public updateNewStoryTitle(event: Event): void {
    this.newStory.title = ((event.target as HTMLInputElement).value);
  }

  public saveNewStory(): void {
    if (this.newStory.canonical === '' || this.newStory.title === '') {
      return;
    }

    this.subscriptions.push(this.contentService.saveStory(this.newStory, this.secret)
      .subscribe((): void => {
        this.newStory = { canonical: '', title: '' };
        this.loadStories();
      }));
  }
}
