import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemsComponent } from './component/overview/items.component';
import { ProfileComponent } from './component/profile/profile.component';
import { SearchProfilesComponent } from './component/profile/search/search-profiles.component';
import { SearchProfileSelectionComponent } from './component/profile/search/search-profile-selection.component';
import { WishlistItemsComponent } from './component/wishlist/wishlist-items.component';

const routes: Routes = [
    { path: 'profile', component: ProfileComponent },
    { path: 'search-profile', component: SearchProfilesComponent },
    { path: 'wishlist', component: WishlistItemsComponent },
    { path: ':navigationIdLevelA', component: ItemsComponent },
    { path: ':navigationIdLevelA/:navigationIdLevelB', component: ItemsComponent },
    { path: ':navigationIdLevelA/:navigationIdLevelB/:navigationIdLevelC', component: ItemsComponent },
    { path: '', component: ItemsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
