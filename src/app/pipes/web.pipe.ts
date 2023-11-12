import { Pipe } from '@angular/core';

@Pipe({ name: 'urlEncode' })
export class UrlEncodePipe {
  public transform(key: string): string {
    return encodeURIComponent(key);
  }
}
