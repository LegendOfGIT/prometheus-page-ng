import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '../../environments/endpoints';
import { ApiBase } from './api-base';
import { Observable } from 'rxjs';
import { ApplicationConfiguration } from '../configurations/app';
import { map } from 'rxjs/operators';
import { SuggestionItem } from '../model/suggestion-item';
import {SearchSuggestionsResponseDto} from "../model/dto/search-suggestions-response-dto";
import {SuggestionItemDto} from "../model/dto/suggestion-item-dto";

@Injectable({
    providedIn: 'root'
})
export class SuggestionsApiService extends ApiBase {
    constructor(
      private http: HttpClient
    ) {
        super(ApplicationConfiguration.API_BASE);
    }

    getSearchSuggestions(searchPattern: string, navigationId: string): Observable<Array<SuggestionItem>> {
      const url: string = this.get(
        endpoints.searchSuggestions,
        {
          navigationId,
          searchPattern
        });

      return this.http
        .get<SearchSuggestionsResponseDto>(url)
        .pipe(map((dto: SearchSuggestionsResponseDto) => dto.items
          .map((item: SuggestionItemDto) => new SuggestionItem(item.suggestion))
          .splice(0, 5)));
    }
}
