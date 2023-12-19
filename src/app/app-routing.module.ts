import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WishlistItemsComponent } from './component/wishlist/wishlist-items.component';
import { ImprintComponent } from './component/legal/imprint.component';
import { StartPageComponent } from './component/landing-pages/start-page.component';
import { DataProtectionComponent } from './component/legal/data-protection.component';

const routes: Routes = [
  { path: 'data-protection', component: DataProtectionComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'wishlist', component: WishlistItemsComponent },
  {
    path: 'p',
    loadChildren: () => import('./component/product-view/single-product-overview.module').then(m => m.SingleProductOverviewModule)
  },
  {
    path: ':navigationIdLevelA',
    loadChildren: () => import('./component/overview/product-overview.module').then(m => m.ProductOverviewModule)
  },
  { path: '', component: StartPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
