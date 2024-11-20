import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ManageTranslationsComponent } from './translations/manage-translations.component';
import { ManageStoriesComponent } from './stories/manage-stories.component';
import { ManageStoryComponent } from './stories/manage-story.component';
import { ManageThingsOfInterestComponent } from './things-of-interest/manage-things-of-interest.component';
import { ManageThingOfInterestComponent } from './things-of-interest/manage-thing-of-interest.component';

@NgModule({
  declarations: [
    ManageStoriesComponent,
    ManageStoryComponent,
    ManageThingsOfInterestComponent,
    ManageThingOfInterestComponent,
    ManageTranslationsComponent
  ],
  exports: [
    ManageStoriesComponent,
    ManageStoryComponent,
    ManageThingsOfInterestComponent,
    ManageThingOfInterestComponent,
    ManageTranslationsComponent
  ],
  imports: [
    ContentRoutingModule,

    CommonModule
  ]
})
export class ContentModule { }
