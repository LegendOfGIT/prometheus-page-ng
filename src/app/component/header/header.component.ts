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
import {SuggestionItem, SuggestionItemMode} from '../../model/suggestion-item';
import {HashTagsApiService} from '../../service/hashtags-api.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public navigationItems: NavigationItem[] = Navigation.ITEMS;

  public Module: typeof Module = Module;

  public searchPatternControl: FormControl = new FormControl();

  public suggestions: Array<SuggestionItem> = [];

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
    private hashtagsService: HashTagsApiService,
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
      .pipe(debounceTime(150))
      .subscribe(() => {
        this.suggestions = [];
        const searchPattern = this.getParameterFromUrl('search');
        const givenHashtag = this.searchPatternControl.value;
        if (searchPattern === givenHashtag) {
          return;
        }

        if (!givenHashtag || givenHashtag.length < 3) {
          return;
        }

        this.hashtagsService.getHashtags(givenHashtag)
          .subscribe(items => {
            const searchItem = new SuggestionItem(givenHashtag);
            searchItem.mode = SuggestionItemMode.SEARCH;
            this.suggestions.push(searchItem);

            if (!this.suggestions.find(suggestion => !suggestion.isSearchItem() && givenHashtag.toLowerCase() === suggestion.label.toLowerCase())) {
              const newHashtagItem = new SuggestionItem(givenHashtag);
              newHashtagItem.mode = SuggestionItemMode.NEW;
              items = [newHashtagItem].concat(items);
            }

            this.suggestions = this.suggestions.concat(items);
          });
      });
  }

  public searchNow(): void {
    const searchPattern = this.getParameterFromUrl('search');
    const hasSearchPatternChanged = searchPattern !== this.searchPatternControl.value;

    const queryParametersToKeep = ['hashtags', 'page', 'search'];
    if (hasSearchPatternChanged) {
      queryParametersToKeep.push('search');
    }

    this.navigationService.navigateWithModifiedQueryParameters(
      queryParametersToKeep,
      { search: '' === this.searchPatternControl.value ? undefined : this.searchPatternControl.value },
      hasSearchPatternChanged);
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

  public getSuggestionLink(item: SuggestionItem): string {
    if (!this.isOnClientSide()) {
      return '';
    }

    const url = new URL(window.location.href.replace(/\?.*/, ''));
    url.searchParams.set(item.isSearchItem() ? 'search' : 'hashtags', item.label);
    return url.toString();
  }

  get categoryItems(): NavigationItem[] {
    return this.navigationItems.filter(item => !item.fromId || item.fromId === 'ALL');
  }

  get activeNavigationItem(): NavigationItem | undefined {
    return this.navigationService.activeNavigationItem;
  }

  get showSearchBar(): boolean {
    return -1 !== [Module.ITEMS, Module.HASHTAGS, Module.HOME].indexOf(this.navigationService.activeModule);
  }

  get isHashtagsModule(): boolean {
    return Module.HASHTAGS === this.navigationService.activeModule;
  }

  get activeHashtags(): Array<string> {
    return this.userService.activeUser?.activeHashtags.map(hashtag => `#${hashtag}`) || [];
  }
}
