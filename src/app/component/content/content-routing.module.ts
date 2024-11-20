import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ManageTranslationsComponent} from './translations/manage-translations.component';
import {ManageStoriesComponent} from './stories/manage-stories.component';
import {ManageStoryComponent} from './stories/manage-story.component';
import {ManageThingsOfInterestComponent} from './things-of-interest/manage-things-of-interest.component';
import {ManageThingOfInterestComponent} from './things-of-interest/manage-thing-of-interest.component';

const routes: Routes = [
  { path: 'stories', component: ManageStoriesComponent },
  { path: 'story/:storyId', component: ManageStoryComponent },
  { path: 'things-of-interest', component: ManageThingsOfInterestComponent },
  { path: 'thing-of-interest/:itemId', component: ManageThingOfInterestComponent },
  { path: 'translations', component: ManageTranslationsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
