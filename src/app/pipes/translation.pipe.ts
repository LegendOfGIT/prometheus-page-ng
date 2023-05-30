import { Pipe } from '@angular/core';
import { TranslationService } from 'src/app/service/translation.service';

@Pipe({ name: 'translate' })
export class TranslationPipe {
  constructor(private translationService: TranslationService) {
  }

  public transform(key: string, locale: string = '', defaultValue: string|undefined = undefined): string {
    if (!this.translationService.getTranslations(locale)) {
      return key;
    }

    return this.translationService.getTranslations(locale)[key] || defaultValue || key;
  }
}
