import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemsComponent } from './component/overview/items.component';

const routes: Routes = [
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
