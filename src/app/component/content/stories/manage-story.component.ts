import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {Secrets} from 'src/app/configurations/secrets';
import {ContentService} from 'src/app/service/content.service';
import {Story} from 'src/app/model/story';
import {StoryElement, StoryElementType} from "../../../model/story-element";

@Component({
  selector: 'manage-story',
  templateUrl: './manage-story.component.html',
  styleUrls: ['./manage-story.component.scss']
})
export class ManageStoryComponent implements OnDestroy {
  private secret: number = 0;
  private storyId = '';
  private subscriptions: Subscription[] = [];
  public newElement: StoryElement = { type: StoryElementType.Block, content: '' };
  public secretParameter = '';
  public story: Story | undefined;

  public constructor(private contentService: ContentService,
                     activatedRoute: ActivatedRoute,
                     router: Router) {
    this.subscriptions.push(activatedRoute.queryParams.subscribe((parameters: Params): void => {
      this.storyId = parameters['storyId'] || '';
      this.secretParameter = parameters['secret'] || '';
      this.secret = Secrets.stringToSecretHash(this.secretParameter);
      if (this.secret !== Secrets.ITEMS.ADMIN_SECRET) {
        router.navigate(['']);
      }
    }));

    this.subscriptions.push(activatedRoute.params.subscribe((parameters: Params): void => {
      this.storyId = parameters['storyId'] || '';
      this.loadStory();
    }));
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  private loadStory(): void {
    this.subscriptions.push(this.contentService.getStory(this.storyId).subscribe((story: Story): void => {
      this.story = story;
    }));
  }

  public updateStoryCanonical(event: Event): void {
    if (!this.story) {
      return;
    }

    this.story.canonical = ((event.target as HTMLInputElement).value);
    this.saveStory();
  }

  public updateStoryTitle(event: Event): void {
    if (!this.story) {
      return;
    }

    this.story.title = ((event.target as HTMLInputElement).value);
    this.saveStory();
  }

  public updateStoryNavigationId(event: Event): void {
    if (!this.story) {
      return;
    }

    this.story.navigationId = ((event.target as HTMLInputElement).value);
    this.saveStory();
  }

  public updateNewElementContent(event: Event): void {
    this.newElement.content = ((event.target as HTMLInputElement).value);
  }

  public updateNewElementType(event: Event): void {
    // @ts-ignore
    this.newElement.type = StoryElementType[((event.target as HTMLInputElement).value)];
  }

  public updateElementType(element: StoryElement, event: Event): void {
    // @ts-ignore
    element.type = StoryElementType[((event.target as HTMLInputElement).value)];
    this.saveStory();
  }

  public updateElementContent(element: StoryElement, event: Event): void {
    // @ts-ignore
    element.content = ((event.target as HTMLInputElement).value);
    this.saveStory();
  }

  public addNewElement(): void {
    if (!this.story) {
      return;
    }

    this.story.elements = this.story.elements || [];
    this.story.elements.push(Object.assign({}, this.newElement));
    this.saveStory();
  }

  private saveStory(): void {
    if (!this.story) {
      return;
    }

    if (this.story?.canonical === '' || this.story?.title === '') {
      return;
    }

    this.subscriptions.push(this.contentService.saveStory(this.story, this.secretParameter)
      .subscribe((): void => {}));
  }

  protected readonly StoryElementType = StoryElementType;
}
