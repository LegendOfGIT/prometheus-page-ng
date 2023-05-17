import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { endpoints } from '../../environments/endpoints';
import { ApiBase } from './api-base';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { ApplicationConfiguration } from '../configurations/app';
import { isPlatformServer } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { DEFAULT_HASHTAGS } from '../model/user';
import { map } from 'rxjs/operators';
import { RankedCategoryDto} from '../model/dto/ranked-category-dto';
import {SuggestionItem} from '../model/suggestion-item';
import {HashtagItemsResponseDto} from '../model/dto/hashtag-items-response-dto';

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
        this.init();
    }

    public rankedCategoryIds: Array<string> = [];

    private init(): void {
      this.getRankedCategoriesByHashtags().subscribe(categoryIds => {
        this.rankedCategoryIds = categoryIds;
      });
    }

    private getRequestBase(): string {
      return isPlatformServer(this.platformId) ? ApplicationConfiguration.SERVICE_REQUESTS_BASE : '';
    }

    private getActiveHashtags(): Array<string> {
      return this.userService.activeUser?.activeHashtags || DEFAULT_HASHTAGS;
    }

    getHashtags(hashtagsPattern: string): Observable<Array<SuggestionItem>> {
      const url = this.getRequestBase() + this.get(
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

    getRankedCategoriesByHashtags(): Observable<Array<string>> {
      const url = this.getRequestBase() + this.get(
        endpoints.rankedCategoriesByHashtags,
        {
          hashtags: this.getActiveHashtags().join(',')
        });

      return this.http
         .get<Array<RankedCategoryDto>>(url)
         .pipe(map(dto => dto.map(rankedCategory => rankedCategory.categoryId)));
    }
}
