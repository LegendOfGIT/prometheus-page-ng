import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromotionsOverviewComponent } from './promotions-overview.component';

const routes: Routes = [
  { path: '', component: PromotionsOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionsRoutingModule { }
