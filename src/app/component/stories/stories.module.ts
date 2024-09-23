import { NgModule } from '@angular/core';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
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
    NgxSliderModule,

    PipesModule,
    SharedComponentsModule
  ]
})
export class StoriesModule { }
