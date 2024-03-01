import {Component, Inject, inject, Input, Optional} from '@angular/core';
import {Navigation} from '../../configurations/navigation';
import {TranslationService} from "../../service/translation.service";
import {REQUEST} from "@nguniversal/express-engine/tokens";
import {Request} from "express";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  @Input()
  public navigationIds: Array<string> | undefined = [];

  private translationService: TranslationService = inject(TranslationService);

  constructor(
    @Optional() @Inject(REQUEST) private request: Request,
    private router: Router
  ) {
  }

  public getUriOfNavigationId(navigationId: string): string {
    return `/${(Navigation.getNavigationItemByToId(navigationId)?.pathParts || []).filter(part => part).join('/')}`;
  }

  public navigateToCategory(navigationId: string, event: Event): void {
    if (!UserService.isBotRequest(this.request)) {
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
