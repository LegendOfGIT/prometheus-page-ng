import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductViewRoutingModule } from './product-view-routing.module';
import { PipesModule } from '../../pipes/pipes.module';
import { SharedComponentsModule } from '../shared-components.module';
import { SingleProductViewComponent } from './single-product-view.component';

@NgModule({
  declarations: [
    SingleProductViewComponent
  ],
  imports: [
    PipesModule,
    SharedComponentsModule,
    ProductViewRoutingModule,
    HttpClientModule
  ]
})
export class ProductViewModule { }
