import { Component } from '@angular/core';

import { Navigation } from 'src/app/configurations/navigation';
import { NavigationItem } from 'src/app/model/navigation-item';
import { NavigationService } from 'src/app/service/navigation.service';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  public navigationItems: NavigationItem[] = Navigation.ITEMS;

  constructor(
    private navigationService: NavigationService
  ) {
  }

  get activeNavigationItemLabel(): string {
    const item = this.navigationService.activeNavigationItem;

    return item ? item.toId : '';
  }

  get isActiveNavigationItemRootItem(): boolean {
    const item = this.navigationService.activeNavigationItem;

    return !(item && item.fromId);
  }

  get nextNavigationItems(): Array<NavigationItem> {
    return this.navigationService.nextNavigationItems;
  }

  get previousNavigationItem(): NavigationItem | undefined {
    return this.navigationService.previousNavigationItem;
  }

  public getNonEmptyPathPartsOfNavigationItem(item: NavigationItem): Array<string> {
    return item.pathParts.filter(part => part);
  }

}
