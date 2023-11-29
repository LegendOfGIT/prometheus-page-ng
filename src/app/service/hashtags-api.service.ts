import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { endpoints } from '../../environments/endpoints';
import { ApiBase } from './api-base';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { ApplicationConfiguration } from '../configurations/app';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { map } from 'rxjs/operators';
import { SuggestionItem } from '../model/suggestion-item';
import { HashtagItemsResponseDto } from '../model/dto/hashtag-items-response-dto';

@Injectable({
    providedIn: 'root'
})
export class HashTagsApiService extends ApiBase {
    constructor(
      private http: HttpClient,
      private userService: UserService,
      @Inject(PLATFORM_ID) private platformId: Object,
      @Optional() @Inject(REQUEST) private request: Request
    ) {
        super(ApplicationConfiguration.API_BASE);
    }

    getHashtags(hashtagsPattern: string): Observable<Array<SuggestionItem>> {
      const url: string = this.get(
        endpoints.hashtags,
        {
          hashtagsPattern
        });

      return this.http
        .get<HashtagItemsResponseDto>(url)
        .pipe(map(dto => dto.items
          .map(item => new SuggestionItem(item.hashtag))
          .splice(0, 10)));
    }
}
