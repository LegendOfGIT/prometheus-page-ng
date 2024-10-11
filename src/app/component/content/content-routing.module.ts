import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ManageTranslationsComponent} from './translations/manage-translations.component';

const routes: Routes = [
  { path: 'translations', component: ManageTranslationsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
