import { Pipe } from '@angular/core';
import { TranslationService } from 'src/app/service/translation.service';

@Pipe({ name: 'urlEncode' })
export class UrlEncodePipe {
  public transform(key: string): string {
    return encodeURIComponent(key);
  }
}
