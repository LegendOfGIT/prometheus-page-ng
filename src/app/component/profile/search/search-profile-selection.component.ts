import { Component } from '@angular/core';

import { SearchProfilesApiService } from 'src/app/service/search-profiles-api.service';
import { UserService } from 'src/app/service/user.service';
import { SearchProfile } from 'src/app/model/search-profile';
import { User } from 'src/app/model/user';

@Component({
  selector: 'search-profile-selection',
  templateUrl: './search-profile-selection.component.html',
  styleUrls: ['./search-profile-selection.component.scss']
})
export class SearchProfileSelectionComponent {

  public selectionOpened: boolean = false;

  constructor(private searchProfilesService: SearchProfilesApiService,
              private userService: UserService) {
  }

  public pickSearchProfile(profileId: string | undefined): void {
    this.userService.setActiveSearchProfile(profileId || '');
    this.selectionOpened = false;
  }

  get selectedSearchProfile(): SearchProfile | null {
    if(!this.searchProfilesOfActiveUser.length) {
      return null;
    }

    const profiles = this.searchProfilesOfActiveUser.filter(profile => profile?.id == this.userService.activeUser?.activeSearchProfile);
    if (profiles?.length) {
      return profiles[0];
    }

    if (this.userService.activeUser?.activeSearchProfile) {
      this.pickSearchProfile('');
    }

    return null;
  }

  get searchProfilesOfActiveUser(): Array<SearchProfile | null> {
    return this.searchProfilesService.items;
  }
}
