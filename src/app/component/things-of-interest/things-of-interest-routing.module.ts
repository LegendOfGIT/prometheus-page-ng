import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ThingsOfInterestComponent } from './things-of-interest.component';
import { ThingOfInterestComponent } from './thing-of-interest.component';

const routes: Routes = [
  { path: 'shops', component: ThingsOfInterestComponent },
  { path: ':thingOfInterestId/:title', component: ThingOfInterestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThingsOfInterestRoutingModule { }
