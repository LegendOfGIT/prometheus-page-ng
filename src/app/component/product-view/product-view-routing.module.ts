import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleProductViewComponent } from "./single-product-view.component";

const routes: Routes = [
  { path: 'p/:itemId/:seoFriendlyProductTitle', component: SingleProductViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class ProductViewRoutingModule { }
