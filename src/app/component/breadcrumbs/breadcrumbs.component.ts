import {Component, Inject, inject, Input, Optional} from '@angular/core';
import {Router} from '@angular/router';
import {Request} from 'express';

import {Navigation} from '../../configurations/navigation';
import {TranslationService} from '../../service/translation.service';
import {UserService} from '../../service/user.service';
import {TranslationPipe} from "../../pipes/translation.pipe";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  standalone: true,
  styleUrls: ['./breadcrumbs.component.scss'],
  imports: [TranslationPipe, NgIf, NgForOf]
})
export class BreadcrumbsComponent {
  @Input()
  public navigationIds: Array<string> | undefined = [];

  private translationService: TranslationService = inject(TranslationService);

  constructor(
    @Optional() @Inject('REQUEST') private request: Request, // TODO: inject request
    private router: Router,
    private userService: UserService
  ) {
  }

  public getUriOfNavigationId(navigationId: string): string {
    return `/${(Navigation.getNavigationItemByToId(navigationId)?.pathParts || []).filter(part => part).join('/')}`;
  }

  public navigateToCategory(navigationId: string, event: Event): void {
    if (!this.userService.isBotRequest(this.request)) {
      event.preventDefault();

      this.router.navigateByUrl('/', { skipLocationChange: true }).then((): void => {
        this.router.navigateByUrl(this.getUriOfNavigationId(navigationId));
      });

      return;
    }
  }

  private numberOfTotalBreadcrumbsCharacters(): number {
    let numberOfTotalCharacters: number = 0;
    this.navigationIds?.forEach(navigationId => {
      numberOfTotalCharacters += (this.translationService.getTranslations()[`NAVIGATION_${navigationId}`] || '').length;
    });

    return numberOfTotalCharacters;
  }

  get breadcrumbItemModifier(): string {
    return this.numberOfTotalBreadcrumbsCharacters() >= 40 ? '' : '  breadcrumbs__item--big';
  }

  get showBreadcrumbs(): boolean {
    return (this.navigationIds || []).filter(navigationId => navigationId).length > 0;
  }
}
