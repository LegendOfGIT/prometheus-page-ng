import {Component, OnDestroy} from '@angular/core';
import {TranslationService} from "../../../service/translation.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Secrets} from "../../../configurations/secrets";

@Component({
  selector: 'manage-translations',
  templateUrl: './manage-translations.component.html',
  styleUrls: ['./manage-translations.component.scss']
})
export class ManageTranslationsComponent implements OnDestroy {
  private locale: string = 'de_DE';
  private secret: string = '';
  private subscriptions: Subscription[] = [];
  private translationSaveHandle: number = 0;
  private translationsSource: any = {};

  public loading: boolean = false;
  public newTranslationKey: string = '';
  public translations: Translation[] = [];

  public constructor(private translationService: TranslationService,
                     activatedRoute: ActivatedRoute,
                     router: Router) {
    this.subscriptions.push(activatedRoute.queryParams.subscribe((parameters: Params): void => {
      this.secret = parameters['secret'] || '';
      if (Secrets.stringToSecretHash(this.secret) !== Secrets.ITEMS.ADMIN_SECRET) {
        router.navigate(['']);
      }

      this.subscriptions.push(translationService.getTranslationsFromApi(this.locale).subscribe((translations: any): void => {
        this.translationsSource = translations;
        this.updateTranslationItems();
      }));
    }));
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  public switchLanguage(e: Event): void {
    this.locale = (e.target as HTMLInputElement).value;
    this.subscriptions.push(this.translationService.getTranslationsFromApi(this.locale).subscribe((translations: any): void => {
      this.translationsSource = translations;
      this.updateTranslationItems();
    }));
  }

  private updateTranslationItems(): void {
    this.translations = Object.keys(this.translationsSource)
      .map((key: string) => ({ key, value: this.translationsSource[key] }))
      .sort((tA, tB) => tA.key > tB.key ? 1 : -1);
  }

  public removeTranslation(translation: Translation): void {
    delete this.translationsSource[translation.key];
    this.loading = true;
    this.subscriptions.push(this.translationService.saveTranslations(this.locale, this.translationsSource, this.secret)
      .subscribe((): void => {
        this.loading = false;
        this.updateTranslationItems();
      }));
  }

  public saveTranslation(translation: Translation, e: Event): void {
    this.translationsSource[translation.key] = (e.target as HTMLInputElement).value;

    if (this.translationSaveHandle) {
      window.clearTimeout(this.translationSaveHandle);
    }

    this.translationSaveHandle = window.setTimeout((): void => {
      this.loading = true;
      this.subscriptions.push(this.translationService.saveTranslations(this.locale, this.translationsSource, this.secret)
        .subscribe((): void => {
          this.loading = false;
        }));
    }, 2000);
  }

  public saveNewTranslation(): void {
    this.translationsSource[this.newTranslationKey] = '';

    this.loading = true;
    this.subscriptions.push(this.translationService.saveTranslations(this.locale, this.translationsSource, this.secret)
      .subscribe((): void => {
        this.loading = false;
        this.newTranslationKey = '';
        this.updateTranslationItems();
      }));
  }

  public updateNewTranslationKey(e: Event): void {
    this.newTranslationKey = (e.target as HTMLInputElement).value;
  }
}

interface Translation {
  key: string;
  value: string;
}
