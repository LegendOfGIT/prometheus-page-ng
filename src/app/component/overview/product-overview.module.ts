import { NgModule } from '@angular/core';

import { ItemsComponent } from './items.component';
import { SharedComponentsModule } from '../shared-components.module';
import { PipesModule } from '../../pipes/pipes.module';
import { FilterSelectionComponent } from '../filter/filter-selection.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    FilterSelectionComponent,
    ItemsComponent
  ],
  exports: [
    ItemsComponent
  ],
  imports: [
    BrowserModule,
    NgxSliderModule,

    PipesModule,
    SharedComponentsModule
  ]
})
export class ProductOverviewModule { }
