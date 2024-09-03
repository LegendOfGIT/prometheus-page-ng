import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WishlistItemsComponent } from './component/wishlist/wishlist-items.component';
import { ImprintComponent } from './component/legal/imprint.component';
import { StartPageComponent } from './component/landing-pages/start-page.component';
import { DataProtectionComponent } from './component/legal/data-protection.component';
import { NotFoundComponent } from './component/landing-pages/not-found.component';
import { WishlistsComponent } from './component/wishlist/wishlists.component';

const routes: Routes = [
  { path: '404', component: NotFoundComponent },
  { path: 'data-protection', component: DataProtectionComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'wishlist', component: WishlistItemsComponent },
  { path: 'wishlist/:wishlistId', component: WishlistItemsComponent },
  { path: 'wishlist/shared/:wishlistHash', component: WishlistItemsComponent },
  { path: 'wishlists', component: WishlistsComponent },
  {
    path: 'p',
    loadChildren: () => import('./component/product-view/single-product-overview.module').then(m => m.SingleProductOverviewModule)
  },
  {
    path: ':navigationIdLevelA',
    loadChildren: () => import('./component/overview/product-overview.module').then(m => m.ProductOverviewModule)
  },
  { path: '', component: StartPageComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
