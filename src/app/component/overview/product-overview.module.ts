import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductOverviewRoutingModule } from './product-overview-routing.module';
import { PipesModule } from '../../pipes/pipes.module';
import { SharedComponentsModule } from '../shared-components.module';
import { ItemsComponent } from './items.component';
import { FilterSelectionComponent } from '../filter/filter-selection.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    FilterSelectionComponent,
    ItemsComponent
  ],
  imports: [
    NgxSliderModule,
    PipesModule,
    SharedComponentsModule,
    ProductOverviewRoutingModule,
    HttpClientModule
  ]
})
export class ProductOverviewModule { }
