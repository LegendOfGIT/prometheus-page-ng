import { Pipe } from '@angular/core';
import { TranslationService } from 'src/app/service/translation.service';

@Pipe({ name: 'translate' })
export class TranslationPipe {
  constructor(private translationService: TranslationService) {
  }

  public transform(key: string): string {
    if (!this.translationService.getTranslations()) {
      return key;
    }

    return this.translationService.getTranslations()[key] || key;
  }
}
