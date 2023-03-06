import { Injectable } from '@angular/core';

import { Navigation } from 'src/app/configurations/navigation';
import { NavigationItem } from 'src/app/model/navigation-item';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

  private _activeModule: Module = Module.HOME;

  private activeNavigationLevelIds: Array<string> = [];

  public setActiveNavigationLevelIds(activeNavigationLevelIds: Array<string>): void {
    this.activeNavigationLevelIds = activeNavigationLevelIds;
  }

  get activeNavigationItem(): NavigationItem | undefined {
    const activeItems = Navigation.ITEMS
      .filter((item: NavigationItem) => JSON.stringify(item.pathParts) == JSON.stringify(this.activeNavigationLevelIds));

    return activeItems && activeItems.length
      ? activeItems[0]
      : undefined;
  }

  get previousNavigationItem(): NavigationItem | undefined {
    const activeItem = this.activeNavigationItem;
    if (!activeItem) {
      return;
    }

    const items = Navigation.ITEMS
      .filter((item: NavigationItem) => activeItem.fromId == item.toId);

    return items && items.length
      ? items[0]
      : undefined;

  }

  get nextNavigationItems(): Array<NavigationItem> {
    const activeItem = this.activeNavigationItem;
    if (!activeItem) {
      return [];
    }

    return Navigation.ITEMS
                 .filter((item: NavigationItem) => activeItem.toId == item.fromId);
  }

  get activeModule(): Module {
    return this._activeModule;
  }

  set activeModule(activeModule: Module) {
    this._activeModule = activeModule;
  }

}

export enum Module {
  HOME,
  IMPRINT,
  ITEMS,
  PROFILE,
  SEARCH_PROFILES,
  WISHLIST,
  SINGLE_PRODUCT_VIEW
}
