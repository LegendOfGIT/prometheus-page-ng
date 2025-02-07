import { NgModule } from '@angular/core';

import { SharedComponentsModule } from '../shared-components.module';
import { PipesModule } from '../../pipes/pipes.module';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CommonModule } from '@angular/common';
import { SingleProductOverviewRoutingModule } from './single-product-overview-routing.module';
import { SingleProductViewComponent } from './single-product-view.component';

@NgModule({
  imports: [
    SingleProductOverviewRoutingModule,
    SingleProductViewComponent,

    CommonModule,
    NgxSliderModule,

    PipesModule,
    SharedComponentsModule
  ]
})
export class SingleProductOverviewModule { }
