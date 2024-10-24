import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import {DomSanitizer, Meta, SafeHtml, Title} from '@angular/platform-browser';

import { Story } from 'src/app/model/story';
import { StoryElement, StoryElementType } from 'src/app/model/story-element';
import {Navigation} from 'src/app/configurations/navigation';
import {NavigationItem} from 'src/app/model/navigation-item';
import {ContentService} from 'src/app/service/content.service';

@Component({
  selector: 'story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  private stories: Story[] = [];
  public story: Story | undefined;

  public constructor(private sanitizer: DomSanitizer,
                     metaService: Meta,
                     titleService: Title,
                     activatedRoute: ActivatedRoute,
                     contentService: ContentService) {
    this.subscriptions.push(activatedRoute.params.subscribe((params: Params): void => {
      this.subscriptions.push(contentService.getStories().subscribe((stories: Story[]): void => {
        this.stories = stories;
        const foundStory: Story | undefined = this.stories.find((storyItem: Story): boolean => storyItem.canonical === params['storyCanonical']);
        this.subscriptions.push(contentService.getStory(foundStory?.id ?? '').subscribe((story: Story): void => {
          this.story = story;
          titleService.setTitle(this.story?.title ? `Story: "${this.story?.title}" auf we wanna shop!` : 'Story auf we wanna shop!');

          let storyElement: StoryElement | undefined = this.findFirstStoryImage(this.story);
          if (storyElement) {
            metaService.updateTag({name: 'og:image', content: storyElement.content ?? ''});
            metaService.addTag({name: 'og:image:height', content: '450'});
            metaService.addTag({name: 'og:image:width', content: '450'});
          }

          storyElement = (this.story?.elements || [])
            .find((storyElement: StoryElement): boolean => storyElement.type === StoryElementType.Block);
          if (storyElement) {
            metaService.updateTag({
              name: 'description',
              content: storyElement.content
            });
          }
        }));
      }));
    }))
  }

  public getSanitizedElementContent(storyElement: StoryElement): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(storyElement.content);
  }

  public furtherStories(): Story[] {
    const tag: string = this.getTagFromStory(this.story);
    return this.stories
      .filter((story: Story) => story !== this.story && tag === this.getTagFromStory(story));
  }

  public findFirstStoryImage(story: Story | undefined): StoryElement | undefined {
    return (story?.elements || [])
      .find((storyElement: StoryElement): boolean => storyElement.type === StoryElementType.Image);
  }

  public getNavigationItemOfStory(): NavigationItem | undefined {
    return Navigation.getNavigationItemByToId(this.story?.navigationId ?? '');
  }

  private getTagFromStory(story: Story | undefined): string {
    const storyPathParts: string[] | undefined = Navigation.getNavigationItemByToId(story?.navigationId ?? '')?.pathParts;
    return storyPathParts?.length ? storyPathParts[0] : '';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  protected readonly StoryElementType = StoryElementType;
}
