import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ManageTranslationsComponent } from './translations/manage-translations.component';
import {ManageStoriesComponent} from "./stories/manage-stories.component";
import {ManageStoryComponent} from "./stories/manage-story.component";

@NgModule({
  declarations: [
    ManageStoriesComponent,
    ManageStoryComponent,
    ManageTranslationsComponent
  ],
  exports: [
    ManageStoriesComponent,
    ManageStoryComponent,
    ManageTranslationsComponent
  ],
  imports: [
    ContentRoutingModule,

    CommonModule
  ]
})
export class ContentModule { }
