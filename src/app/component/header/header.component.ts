import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {debounceTime} from 'rxjs/operators';

import {UserService} from 'src/app/service/user.service';
import {WishlistItemsApiService} from 'src/app/service/wishlist-items-api.service';
import {Module, NavigationService} from 'src/app/service/navigation.service';
import {NavigationItem} from '../../model/navigation-item';
import {Navigation} from '../../configurations/navigation';
import {isPlatformBrowser} from '@angular/common';
import {SuggestionItem, SuggestionItemMode} from '../../model/suggestion-item';
import {HashTagsApiService} from '../../service/hashtags-api.service';
import {SuggestionsApiService} from "../../service/suggestions-api.service";

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

  public lastLoggedInFlag: boolean;

  constructor(
    private router: Router,
    private userService: UserService,
    private navigationService: NavigationService,
    private wishlistService: WishlistItemsApiService,
    private hashtagsService: HashTagsApiService,
    private suggestionsApiService : SuggestionsApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.subscribeSearchPatternChanges();
    this.lastLoggedInFlag = this.userService.isLoggedIn;
    const searchPattern: string | null = this.getParameterFromUrl('search');
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
      .subscribe((): void => {
        this.suggestions = [];
        const searchPattern: string | null = this.getParameterFromUrl('search');
        const givenPattern = this.searchPatternControl.value;
        if (searchPattern === givenPattern) {
          return;
        }

        if (!givenPattern || givenPattern.trim().length < 3) {
          return;
        }

        this.suggestionsApiService.getSearchSuggestions(givenPattern, this.navigationService.activeNavigationItem?.fromId || '').subscribe(((items: Array<SuggestionItem>): void => {
          this.suggestions = [];

          const searchItem: SuggestionItem = new SuggestionItem(givenPattern);
          searchItem.mode = SuggestionItemMode.SEARCH;
          this.suggestions.push(searchItem);

          this.suggestions = this.suggestions.concat(items.map((item: SuggestionItem) => { item.mode = SuggestionItemMode.SEARCH; return item; }));

          this.hashtagsService.getHashtags(givenPattern)
            .subscribe((items: Array<SuggestionItem>): void => {
              if (!items.find((suggestion: SuggestionItem) => !suggestion.isSearchItem() && givenPattern.toLowerCase() === suggestion.label.toLowerCase())) {
                const newHashtagItem: SuggestionItem = new SuggestionItem(givenPattern.split(' ').join('').substring(0, 20));
                newHashtagItem.mode = SuggestionItemMode.NEW;
                items = [newHashtagItem].concat(items);
              }

              this.suggestions = this.suggestions.concat(items);
            });
        }));
      });
  }

  public searchNow(): void {
    const searchPattern: string | null = this.getParameterFromUrl('search');

    if (this.isModuleActive(Module.HOME)) {
      this.router.navigate(
        ['/', 'hashtags', this.userService.getFirstHashtag()],
        {
          queryParams: {
            search: this.searchPatternControl.value
          }
        });

      return;
    }

    const hasSearchPatternChanged: boolean = searchPattern !== this.searchPatternControl.value;
    const queryParametersToKeep: Array<string> = ['hashtags', 'page', 'search'];
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

    if (this.isHashtagsModule && !item.isSearchItem()) {
      return '/hashtags/' + item.label;
    }

    const url: URL = new URL(window.location.href.replace(/\?.*/, ''));
    url.searchParams.set(item.isSearchItem() ? 'search' : 'hashtags', item.label);
    if (item.isSearchItem() && this.isModuleActive(Module.HOME)) {
      url.pathname = `/hashtags/${this.userService.getFirstHashtag()}`
    }

    return url.toString();
  }

  public getSuggestionItemPrefix(item: SuggestionItem): string {
    const searchPattern = this.searchPatternControl.value || '';

    if (!item || searchPattern.length > 15) {
      return '';
    }

    if (item.isNewItem()) {
      return 'CREATE_HASHTAG_PREFIX';
    }

    return item.isSearchItem() ? 'SEARCH_FOR_PATTERN_PREFIX' : 'DISCOVER_HASHTAG_PREFIX';
  }

  public getSuggestionItemSuffix(item: SuggestionItem): string {
    const searchPattern = this.searchPatternControl.value || '';

    if (!item || searchPattern.length > 15) {
      return '';
    }

    if (item.isNewItem()) {
      return 'CREATE_HASHTAG_SUFFIX';
    }

    return item.isSearchItem() ? 'SEARCH_FOR_PATTERN_SUFFIX' : 'DISCOVER_HASHTAG_SUFFIX';
  }

  public navigateToCategory(item: NavigationItem): void {
    if (!item?.pathParts?.length) {
      return;
    }

    const activeModuleBeforeNavigation: Module = this.navigationService.activeModule;
    this.router.navigate([item.pathParts[0]]).then((): void => {
      if (Module.ITEMS !== activeModuleBeforeNavigation) {
        return;
      }

      window.location.reload();
    })
  }

  get categoryItems(): NavigationItem[] {
    return this.navigationItems.filter((item: NavigationItem) => !item.fromId || item.fromId === 'ALL');
  }

  get activeNavigationItem(): NavigationItem | undefined {
    return this.navigationService.activeNavigationItem;
  }

  get showSearchBar(): boolean {
    return -1 !== [Module.HOME, Module.ITEMS, Module.HASHTAGS].indexOf(this.navigationService.activeModule);
  }

  get isHashtagsModule(): boolean {
    return Module.HASHTAGS === this.navigationService.activeModule;
  }

  get activeHashtags(): Array<string> {
    return this.userService.activeUser?.activeHashtags.map((hashtag: string): string => `#${hashtag}`) || [];
  }
}
