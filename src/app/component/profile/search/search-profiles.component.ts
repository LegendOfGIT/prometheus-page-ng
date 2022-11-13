import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { SearchProfileConfiguration } from 'src/app/configurations/search-profile';
import { SearchProfileItem } from 'src/app/model/search-profile-item';
import { SearchProfilesApiService } from 'src/app/service/search-profiles-api.service';
import { UserService } from 'src/app/service/user.service';
import { SearchProfile } from 'src/app/model/search-profile';

@Component({
  selector: 'search-profiles',
  templateUrl: './search-profiles.component.html',
  styleUrls: ['./search-profiles.component.scss']
})
export class SearchProfilesComponent {

  private selectedProfileItemIds : Array<string> = [];
  public profileNameControl: FormControl = new FormControl();
  public step: typeof Step = Step;
  public activeStep: Step = Step.SELECTION;

  constructor(private searchProfilesService: SearchProfilesApiService,
              private userService: UserService) {
  }

  private getHashFromString(str: string, seed: number = 0) {
    let h1 = 0xdeadbeef ^ seed,
        h2 = 0x41c6ce57 ^ seed;

    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }

    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  };

  public get subCategoryIds(): Array<string> {
    const subCategoryIds = new Array<string>;
    SearchProfileConfiguration.ITEMS.forEach((item: SearchProfileItem) => {
      if (-1 !== subCategoryIds.indexOf(item.subCategoryId)) {
        return;
      }

      subCategoryIds.push(item.subCategoryId);
    });

    return subCategoryIds;
  }

  public searchProfileItemsOfSubCategory(subCategoryId: string): Array<string> {
    return SearchProfileConfiguration.ITEMS
      .filter((item: SearchProfileItem) => subCategoryId == item.subCategoryId)
      .map((item: SearchProfileItem) => item.id);
  }

  public toggleProfileItemSelectionById(profileItemId: string): void {
    const selectionIndex = this.selectedProfileItemIds.indexOf(profileItemId);

    if (-1 !== selectionIndex) {
      this.selectedProfileItemIds.splice(selectionIndex, 1);
      return;
    }

    this.selectedProfileItemIds.push(profileItemId);
    this.selectedProfileItemIds.sort();
  }

  public isProfileItemSelected(profileItemId: string): boolean {
    return -1 !== this.selectedProfileItemIds.indexOf(profileItemId);
  }

  public saveProfile(): void {
    this.searchProfilesService.saveSearchProfileForCurrentUser(
      this.userService.activeUser?.id || '',
      new SearchProfile()
        .setId('' + this.getHashFromString(this.selectedProfileItemIds.join()))
        .setAvatarBackgroundColor(this.profileNameControl.value)
        .setProfileItemIds(this.selectedProfileItemIds));
  }

  get searchProfilesOfActiveUser(): Array<SearchProfile | null> {
    return this.searchProfilesService.items;
  }

}

enum Step {
  SELECTION,
  CREATE_EDIT_PROFILE
}
