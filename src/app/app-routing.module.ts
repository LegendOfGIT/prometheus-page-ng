import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './component/profile/profile.component';
import { WishlistItemsComponent } from './component/wishlist/wishlist-items.component';
import { ImprintComponent } from './component/legal/imprint.component';
import { StartPageComponent } from './component/landing-pages/start-page.component';
import { SingleProductViewComponent } from './component/product-view/single-product-view.component';
import { DataProtectionComponent } from './component/legal/data-protection.component';

const routes: Routes = [
  { path: 'data-protection', component: DataProtectionComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'wishlist', component: WishlistItemsComponent },
  { path: 'p/:itemId/:seoFriendlyProductTitle', component: SingleProductViewComponent },
  { path: '', component: StartPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
