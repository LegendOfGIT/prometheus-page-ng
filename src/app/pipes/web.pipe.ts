import {Injectable, Pipe} from '@angular/core';

@Pipe({ name: 'urlEncode' })
export class UrlEncodePipe {
  public transform(key: string): string {
    return encodeURIComponent(key);
  }
}

@Pipe({ name: 'hyphenate' })
@Injectable({
  providedIn: 'root'
})
export class HyphenationPipe {
  public transform(value: string): string {
    return (value || '').substring(0, 100)
      .replace(",", "")
      .replace(/[^\w\s]/gi, '')
      .replace(/[()]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase();
  }
}
