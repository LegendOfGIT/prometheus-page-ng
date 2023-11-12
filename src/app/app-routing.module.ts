import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './component/profile/profile.component';
import { WishlistItemsComponent } from './component/wishlist/wishlist-items.component';
import { ImprintComponent } from './component/legal/imprint.component';
import { DataProtectionComponent } from './component/legal/data-protection.component';

const routes: Routes = [
    { path: 'data-protection', component: DataProtectionComponent },
    { path: 'imprint', component: ImprintComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'wishlist', component: WishlistItemsComponent },
    {
      path: undefined,
      loadChildren: () => import('./component/product-view/product-view.module').then(m => m.ProductViewModule)
    },
    {
      path: undefined,
      loadChildren: () => import('./component/overview/product-overview.module').then(m => m.ProductOverviewModule)
    },
    {
      path: undefined,
      loadChildren: () => import('./component/landing-pages/start-page.module').then(m => m.StartPageModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
