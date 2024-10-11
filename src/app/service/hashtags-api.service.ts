import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '../../environments/endpoints';
import { ApiBase } from './api-base';
import { Observable } from 'rxjs';
import { ApplicationConfiguration } from '../configurations/app';
import { map } from 'rxjs/operators';
import { SuggestionItem } from '../model/suggestion-item';
import { HashtagItemsResponseDto } from '../model/dto/hashtag-items-response-dto';
import {SuggestionItemDto} from "../model/dto/suggestion-item-dto";

@Injectable({
    providedIn: 'root'
})
export class HashTagsApiService extends ApiBase {
    constructor(
      private http: HttpClient
    ) {
        super(ApplicationConfiguration.API_BASE);
    }

    getHashtags(hashtagsPattern: string): Observable<Array<SuggestionItem>> {
      const url: string = this.get(
        endpoints.itemsHashtags,
        {
          hashtagsPattern
        });

      return this.http
        .get<HashtagItemsResponseDto>(url)
        .pipe(map((dto: HashtagItemsResponseDto) => dto.items
          .map((item: SuggestionItemDto) => new SuggestionItem(item.hashtag))
          .splice(0, 5)));
    }
}
