import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentsModule } from '../shared-components.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ThingsOfInterestRoutingModule } from './things-of-interest-routing.module';
import { ThingsOfInterestComponent } from './things-of-interest.component';
import { ThingOfInterestComponent } from './thing-of-interest.component';

@NgModule({
  declarations: [
    ThingsOfInterestComponent,
    ThingOfInterestComponent
  ],
  exports: [
    ThingsOfInterestComponent,
    ThingOfInterestComponent
  ],
  imports: [
    ThingsOfInterestRoutingModule,

    CommonModule,

    PipesModule,
    SharedComponentsModule
  ]
})
export class ThingsOfInterestModule { }
