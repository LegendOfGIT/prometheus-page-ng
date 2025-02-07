import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Story } from 'src/app/model/story';
import { ContentService } from 'src/app/service/content.service';
import {Module, NavigationService} from 'src/app/service/navigation.service';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'stories',
  templateUrl: './stories.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  public stories: Story[] = [];

  public constructor(private sanitizer: DomSanitizer,
                     contentService: ContentService,
                     navigationService: NavigationService) {
    navigationService.activeModule = Module.STORIES;

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
