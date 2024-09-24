import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import {DomSanitizer, Meta, SafeHtml, Title} from '@angular/platform-browser';

import { Story } from 'src/app/model/story';
import { Stories } from 'src/app/configurations/stories';
import { StoryElement, StoryElementType } from 'src/app/model/story-element';

@Component({
  selector: 'story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  public story: Story | undefined;

  public constructor(private sanitizer: DomSanitizer,
                     metaService: Meta,
                     titleService: Title,
                     activatedRoute: ActivatedRoute) {
    this.subscriptions.push(activatedRoute.params.subscribe((params: Params): void => {
      this.story = Stories.ITEMS.find((storyItem: Story): boolean => storyItem.canonical === params['storyCanonical']);
      titleService.setTitle(this.story?.title ? `Story: "${this.story?.title}" auf we wanna shop!` : 'Story auf we wanna shop!');

      let storyElement: StoryElement | undefined = (this.story?.elements || [])
        .find((storyElement: StoryElement): boolean => storyElement.type === StoryElementType.Image);
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
    }))
  }

  public getSanitizedElementContent(storyElement: StoryElement): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(storyElement.content);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  protected readonly StoryElementType = StoryElementType;
}
