import {Component, ElementRef, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime} from 'rxjs/operators';

import {UserService} from 'src/app/service/user.service';
import {WishlistItemsApiService} from 'src/app/service/wishlist-items-api.service';
import {Module, NavigationService} from 'src/app/service/navigation.service';
import {NavigationItem} from '../../model/navigation-item';
import {Navigation} from '../../configurations/navigation';
import {isPlatformBrowser} from '@angular/common';
import {DEFAULT_HASHTAGS} from '../../model/user';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public navigationItems: NavigationItem[] = Navigation.ITEMS;

  public Module: typeof Module = Module;

  public searchPatternControl: FormControl = new FormControl();

  @ViewChild('searchPattern')
  private searchPatternElement: ElementRef | undefined = undefined;

  public lastLoggedInFlag: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private navigationService: NavigationService,
    private wishlistService: WishlistItemsApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.subscribeSearchPatternChanges();
    this.lastLoggedInFlag = this.userService.isLoggedIn;
    const searchPattern = this.getParameterFromUrl('search');
    this.searchPatternControl.setValue(searchPattern);
  }

  private getParameterFromUrl(parameterKey: string): string | null {
    return this.isOnClientSide() ? new URL(window.location.href).searchParams.get(parameterKey) : '';
  }

  private isOnClientSide(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private subscribeSearchPatternChanges(): void {
    if (!this.isOnClientSide()) {
      return;
    }

    this.searchPatternControl.valueChanges
      .pipe(debounceTime(10000))
      .subscribe(() => this.searchNow());

  }

  public searchNow(): void {
    const searchPattern = this.getParameterFromUrl('search');
    const hasSearchPatternChanged = searchPattern !== this.searchPatternControl.value;
    const hashtags = this.getParameterFromUrl('hashtags');
    const page = hasSearchPatternChanged ? undefined : this.getParameterFromUrl('page');

    this.router.navigate(
      [],
      {
        queryParams: {
          search: '' === this.searchPatternControl.value ? undefined : this.searchPatternControl.value,
          hashtags,
          page
        }
      }
    ).then(() => {
      if (hasSearchPatternChanged) {
        window.location.reload();
      }
    });
  }

  get hasJustLoggedIn(): boolean {
    if (this.lastLoggedInFlag != this.userService.isLoggedIn) {
      this.lastLoggedInFlag = this.userService.isLoggedIn;
      return true;
    }

    this.lastLoggedInFlag = this.userService.isLoggedIn;
    return false;
  }

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  get userHasAtLeastOneWishlistItem(): boolean {
    return this.wishlistService.items?.length > 0;
  }

  public isModuleActive(module: Module): boolean {
    return module === this.navigationService.activeModule;
  }

  get categoryItems(): NavigationItem[] {
    return this.navigationItems.filter(item => !item.fromId || item.fromId === 'ALL');
  }

  get activeNavigationItem(): NavigationItem | undefined {
    return this.navigationService.activeNavigationItem;
  }

  get showSearchBar(): boolean {
    return -1 !== [Module.ITEMS, Module.HOME].indexOf(this.navigationService.activeModule);
  }
}
