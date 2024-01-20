import {Injectable, inject, Inject, PLATFORM_ID} from '@angular/core';

import { Navigation } from 'src/app/configurations/navigation';
import { NavigationItem } from 'src/app/model/navigation-item';
import {Router} from '@angular/router';
import {isPlatformServer} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

  private _activeModule: Module = Module.HOME;

  private activeNavigationLevelIds: Array<string> = [];

  private router = inject(Router);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public setActiveNavigationLevelIds(activeNavigationLevelIds: Array<string>): void {
    this.activeNavigationLevelIds = activeNavigationLevelIds;
  }

  get activeNavigationItem(): NavigationItem | undefined {
    if(![Module.HOME, Module.ITEMS].indexOf(this._activeModule)) {
      return;
    }

    const activeItems: Array<NavigationItem> = Navigation.ITEMS
      .filter((item: NavigationItem): boolean => JSON.stringify(item.pathParts) == JSON.stringify(this.activeNavigationLevelIds));

    return activeItems && activeItems.length
      ? activeItems[0]
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

  private getParameterFromUrl(parameterKey: string): string | null {
    return isPlatformServer(this.platformId) ? '' : new URL(window.location.href).searchParams.get(parameterKey);
  }

  public navigateWithModifiedQueryParameters(
    keepQueryParameters: Array<string>,
    modificationParameters: any,
    reloadPage: boolean
  ): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    const parametersToKeep: any = {};
    keepQueryParameters.forEach(keepQueryParameter => {
      parametersToKeep[keepQueryParameter] = this.getParameterFromUrl(keepQueryParameter);
    });

    this.router.navigate(
      [],
      {
        queryParams: { ...parametersToKeep, ...modificationParameters }
      }
    ).then(() => {
      if (!reloadPage) {
        return;
      }

      window.location.reload();
    });
  }

}

export enum Module {
  HOME,
  DATA_PROTECTION,
  HASHTAGS,
  IMPRINT,
  ITEMS,
  WISHLIST,
  SINGLE_PRODUCT_VIEW
}
