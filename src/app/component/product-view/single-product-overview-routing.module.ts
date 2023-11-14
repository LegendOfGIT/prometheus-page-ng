import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SingleProductViewComponent } from './single-product-view.component';

const routes: Routes = [
  { path: ':itemId/:seoFriendlyProductTitle', component: SingleProductViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleProductOverviewRoutingModule { }
