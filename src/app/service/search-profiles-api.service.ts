import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable, of} from 'rxjs';

import { ApiBase } from './api-base';
import { SearchProfile } from '../model/search-profile';
import { SearchProfileDto } from '../model/dto/search-profile-dto';
import { endpoints } from 'src/environments/endpoints';
import {ApplicationConfiguration} from '../configurations/app';
import {isPlatformServer} from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class SearchProfilesApiService extends ApiBase {

  private _item: SearchProfile | null = null;
  private _items: Array<SearchProfile | null> = [];

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
      super(ApplicationConfiguration.API_BASE);
  }

  get activeItem(): SearchProfile | null {
    return this._item;
  }

  set activeItem(item: SearchProfile | null) {
    this._item = item;
  }

  get items(): Array<SearchProfile | null> {
    return this._items;
  }

  set items(items: Array<SearchProfile | null>) {
    this._items = items;
  }

  public getSearchProfile(searchProfileId: string): Observable<SearchProfile | null> {
    if (isPlatformServer(this.platformId)) {
      return of(null);
    }

    const url = this.get(endpoints.getSearchProfileItem, { searchProfileId });

    return this.http
      .get<SearchProfileDto>(url)
      .pipe(map(item => SearchProfile.fromModel(item)));
  }

  public getItems(userId: string): Observable<Array<SearchProfile | null>> {
    if (isPlatformServer(this.platformId)) {
      return of([]);
    }

    const url = this.get(endpoints.getSearchProfileItems, { userId });

    return this.http
       .get<SearchProfileDto[]>(url)
       .pipe(map(items => items.map((item: SearchProfileDto) => SearchProfile.fromModel(item))));
  }

  public saveSearchProfileForCurrentUser(userId: string, searchProfile: SearchProfile) {
      return this.http.put(
        this.get(endpoints.saveSearchProfile),
        { userId, searchProfile }
      );
  }

  public removeSearchProfileForCurrentUser(userId: string, searchProfileId: string) {
      return this.http.delete(
        this.get(endpoints.removeSearchProfile, { userId, searchProfileId })
      );
  }
}
