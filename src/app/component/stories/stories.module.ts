import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentsModule } from '../shared-components.module';
import { PipesModule } from '../../pipes/pipes.module';
import { StoriesRoutingModule } from './stories-routing.module';
import { StoryComponent } from './story.component';

@NgModule({
  declarations: [
    StoryComponent
  ],
  exports: [
    StoryComponent
  ],
  imports: [
    StoriesRoutingModule,

    CommonModule,

    PipesModule,
    SharedComponentsModule
  ]
})
export class StoriesModule { }
