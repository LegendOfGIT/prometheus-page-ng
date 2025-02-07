import { NgModule } from '@angular/core';
import { TranslationPipe } from './translation.pipe';
import { HyphenationPipe, UrlEncodePipe } from './web.pipe';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    HyphenationPipe,
    UrlEncodePipe
  ],
  exports: [
    DatePipe,
    HyphenationPipe,
    TranslationPipe,
    UrlEncodePipe
  ],
  imports: [
    DatePipe,
    TranslationPipe
  ]
})
export class PipesModule { }
