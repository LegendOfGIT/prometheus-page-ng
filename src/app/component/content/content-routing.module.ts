import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ManageTranslationsComponent} from './translations/manage-translations.component';
import {ManageStoriesComponent} from './stories/manage-stories.component';

const routes: Routes = [
  { path: 'stories', component: ManageStoriesComponent },
  { path: 'translations', component: ManageTranslationsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
