import {Component, ElementRef, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime} from 'rxjs/operators';

import {UserService} from 'src/app/service/user.service';
import {SearchProfilesApiService} from 'src/app/service/search-profiles-api.service';
import {WishlistItemsApiService} from 'src/app/service/wishlist-items-api.service';
import {SearchProfile} from 'src/app/model/search-profile';
import {Module, NavigationService} from 'src/app/service/navigation.service';
import {NavigationItem} from '../../model/navigation-item';
import {Navigation} from '../../configurations/navigation';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public navigationItems: NavigationItem[] = Navigation.ITEMS;

  public searchPatternControl: FormControl = new FormControl();
  public secondBarSearchPatternControl: FormControl = new FormControl();

  public Module: typeof Module = Module;

  @ViewChild('searchPattern')
  private searchPatternElement: ElementRef | undefined = undefined;
  @ViewChild('secondBarSearchPattern')
  private secondBarSearchPatternElement: ElementRef | undefined = undefined;

  public lastLoggedInFlag: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private navigationService: NavigationService,
    private searchProfilesApiService: SearchProfilesApiService,
    private wishlistService: WishlistItemsApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.subscribeSearchPatternChanges();
    this.lastLoggedInFlag = this.userService.isLoggedIn;
    const searchPattern = this.getSearchParameterFromUrl();
    this.searchPatternControl.setValue(searchPattern);
    this.secondBarSearchPatternControl.setValue(searchPattern);
  }

  private getSearchParameterFromUrl(): string | null {
    return this.isOnClientSide() ? new URL(window.location.href).searchParams.get('search') : '';
  }

  private isOnClientSide(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private subscribeSearchPatternChanges(): void {
    if (!this.isOnClientSide()) {
      return;
    }

    this.searchPatternControl.valueChanges
      .subscribe((val) => {
        this.secondBarSearchPatternControl.setValue(val, {onlySelf: true, emitEvent: false});
      });
    this.secondBarSearchPatternControl.valueChanges
      .subscribe((val) => {
        this.searchPatternControl.setValue(val, {onlySelf: true, emitEvent: false});
      });

    this.searchPatternControl.valueChanges
      .pipe(debounceTime(10000))
      .subscribe(() => this.searchNow());

    this.secondBarSearchPatternControl.valueChanges
      .pipe(debounceTime(10000))
      .subscribe(() => this.searchNow());

  }

  public searchNow(): void {
    const searchPattern = this.getSearchParameterFromUrl();

    this.router.navigate(
      [],
      { queryParams: { search: '' === this.searchPatternControl.value ? undefined : this.searchPatternControl.value } }
    ).then(() => {
      if (searchPattern !== this.searchPatternControl.value) {
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

  get searchProfilesOfActiveUser(): Array<SearchProfile | null> {
    return this.searchProfilesApiService.items;
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
