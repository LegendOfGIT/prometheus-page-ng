import { NgModule } from '@angular/core';
import { TranslationPipe } from './translation.pipe';
import { UrlEncodePipe } from './web.pipe';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    TranslationPipe,
    UrlEncodePipe
  ],
  exports: [
    DatePipe,
    TranslationPipe,
    UrlEncodePipe
  ],
  imports: [
    DatePipe
  ]
})
export class PipesModule { }
