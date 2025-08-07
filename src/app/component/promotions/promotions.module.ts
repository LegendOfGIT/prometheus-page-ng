import { NgModule } from '@angular/core';

import {PromotionsRoutingModule} from "./promotions-routing.module";
import {PromotionsOverviewComponent} from './promotions-overview.component';
import {NgForOf, NgIf} from '@angular/common';
import {PipesModule} from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PromotionsOverviewComponent
  ],
  exports: [
    PromotionsOverviewComponent
  ],
  imports: [
    PromotionsRoutingModule,
    NgIf,
    NgForOf,
    PipesModule
  ]
})
export class PromotionsModule { }
