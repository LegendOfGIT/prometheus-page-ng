import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoryComponent } from './story.component';
import { StoriesComponent } from './stories.component';

const routes: Routes = [
  { path: 'overview', component: StoriesComponent },
  { path: ':storyCanonical', component: StoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoriesRoutingModule { }
