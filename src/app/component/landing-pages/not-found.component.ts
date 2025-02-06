import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslationService } from '../../service/translation.service';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  constructor(
    @Optional() @Inject('RESPONSE') private readonly response: any, // TODO: inject response
    translationService: TranslationService,
    titleService: Title
) {
    this.response = response;
    titleService.setTitle(`We Wanna Shop! ${translationService.getTranslations()['PAGE_NOT_FOUND'] || ''}`);
  }

  ngOnInit(): void {
    if (!this.response) {
      return;
    }

    this.response.status(404);
  }
}
