import {Component, inject, Input} from '@angular/core';
import {Navigation} from '../../configurations/navigation';
import {TranslationService} from "../../service/translation.service";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  @Input()
  public navigationIds: Array<string> | undefined = [];

  private translationService: TranslationService = inject(TranslationService);

  public getUriOfNavigationId(navigationId: string): string {
    return `/${(Navigation.getNavigationItemByToId(navigationId)?.pathParts || []).filter(part => part).join('/')}`;
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
