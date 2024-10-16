import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ManageTranslationsComponent } from './translations/manage-translations.component';
import {ManageStoriesComponent} from "./stories/manage-stories.component";

@NgModule({
  declarations: [
    ManageStoriesComponent,
    ManageTranslationsComponent
  ],
  exports: [
    ManageStoriesComponent,
    ManageTranslationsComponent
  ],
  imports: [
    ContentRoutingModule,

    CommonModule
  ]
})
export class ContentModule { }
