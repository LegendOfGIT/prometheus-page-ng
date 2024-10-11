import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ManageTranslationsComponent } from './translations/manage-translations.component';

@NgModule({
  declarations: [
    ManageTranslationsComponent
  ],
  exports: [
    ManageTranslationsComponent
  ],
  imports: [
    ContentRoutingModule,

    CommonModule
  ]
})
export class ContentModule { }
