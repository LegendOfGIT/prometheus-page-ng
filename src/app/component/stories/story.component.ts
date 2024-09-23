import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { Story } from 'src/app/model/story';
import { Stories } from 'src/app/configurations/stories';
import {StoryElement, StoryElementType} from "../../model/story-element";
import {DomSanitizer, SafeHtml, Title} from "@angular/platform-browser";

@Component({
  selector: 'story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  public story: Story | undefined;

  public constructor(private sanitizer: DomSanitizer,
                     titleService: Title,
                     activatedRoute: ActivatedRoute) {
    this.subscriptions.push(activatedRoute.params.subscribe((params: Params): void => {
      this.story = Stories.ITEMS.find((storyItem: Story): boolean => storyItem.canonical === params['storyCanonical']);
      titleService.setTitle(this.story?.title ? `Story: "${this.story?.title}" auf we wanna shop!` : 'Story auf we wanna shop!');
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
