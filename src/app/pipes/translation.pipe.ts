import { Pipe } from '@angular/core';
import { TranslationService } from 'src/app/service/translation.service';

@Pipe({ name: 'translate' })
export class TranslationPipe {
  constructor(private translationService: TranslationService) {
  }

  public transform(key: string): string {
    return this.translationService.getTranslations()[key] || key;
  }
}
