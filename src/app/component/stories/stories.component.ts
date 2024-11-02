import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';

import { Story } from 'src/app/model/story';
import { StoryElement, StoryElementType } from 'src/app/model/story-element';
import { ContentService } from 'src/app/service/content.service';

@Component({
  selector: 'stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  public stories: Story[] = [];

  public constructor(private sanitizer: DomSanitizer,
                     contentService: ContentService) {
    this.subscriptions.push(contentService.getStories().subscribe((stories: Story[]): void => {
      this.stories = stories;
    }));
  }

  public getSanitizedElementContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content + '<br/><b>weiterlesen -></b>');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
