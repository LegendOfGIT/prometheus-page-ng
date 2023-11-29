import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { map } from 'rxjs/operators';
import { endpoints } from '../../environments/endpoints';
import { Item } from '../model/item';
import { ItemsResponseDto } from '../model/dto/items-response-dto';
import { ApiBase } from './api-base';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { ApplicationConfiguration } from '../configurations/app';
import { isPlatformServer } from '@angular/common';
import { ItemsResponse } from '../model/items-response';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { DEFAULT_HASHTAGS } from '../model/user';

@Injectable({
    providedIn: 'root'
})
export class ItemsApiService extends ApiBase {

    constructor(
      private http: HttpClient,
      private userService: UserService,
      @Inject(PLATFORM_ID) private platformId: Object,
      @Optional() @Inject(REQUEST) private request: Request
    ) {
      super(ApplicationConfiguration.API_BASE);
    }

    private getActiveHashtags(): Array<string> {
      return this.userService.getHashtags();
    }

    getItems(navigationId: string,
             searchPattern: string,
             filterIds: string = '',
             numberOfResults: number | undefined = undefined,
             randomItems: boolean | undefined = false,
             page: string = '1',
             priceFrom: string = '',
             priceTo: string = '',
             hashtags: Array<string> | undefined = []): Observable<ItemsResponse> {
      const url: string = this.get(
        endpoints.items,
        {
          filterIds,
          navigationId,
          numberOfResults: numberOfResults ? `${numberOfResults}` : '',
          isBot: UserService.isBotRequest(this.request) ? 'true': 'false',
          randomItems : randomItems ? 'true': 'false',
          page,
          priceFrom,
          priceTo,
          searchPattern,
          hashtags: hashtags && hashtags.length ? hashtags.join(',') : isPlatformServer(this.platformId) ? '' : this.getActiveHashtags().join(',')
        });

      return this.http
         .get<ItemsResponseDto>(url)
         .pipe(map(dto => {
           const response = new ItemsResponse();
           response.items = dto.items?.map(item => Item.fromModel(item));
           response.availablePages = dto.availablePages;
           if (dto.errorCode === 'HASHTAGS_CONTAIN_BAD_TERM') {
             this.userService.setHashTags(DEFAULT_HASHTAGS);
           }


           return response;
         }));
    }

    getRandomItemOfCategories(categoryIds: Array<string>): Observable<ItemsResponse> {
      const url: string = this.get(
        endpoints.itemsByCategories,
        {
          navigationIds: categoryIds.join(','),
          numberOfResults: '1',
          randomItems: 'true'
        });

      return this.http
        .get<ItemsResponseDto>(url)
        .pipe(map(dto => {
          const response = new ItemsResponse();
          response.items = dto.items?.map(item => Item.fromModel(item));
          response.availablePages = dto.availablePages;

          return response;
        }));
    }

    getHashtagsItems(searchPattern: string = '',
                     filterIds: string = '',
                     numberOfResults: number | undefined = undefined,
                     page: string = '1',
                     priceFrom: string = '',
                     priceTo: string = ''): Observable<ItemsResponse> {
      const url: string = this.get(
        endpoints.hashtagsItems,
        {
          filterIds,
          hashtags: this.getActiveHashtags().join(','),
          numberOfResults: numberOfResults ? `${numberOfResults}` : '',
          isBot: UserService.isBotRequest(this.request) ? 'true': 'false',
          page,
          priceFrom,
          priceTo,
          searchPattern
        });

      return this.http
        .get<ItemsResponseDto>(url)
        .pipe(map(dto => {
          const response = new ItemsResponse();
          response.items = dto.items?.map(item => Item.fromModel(item));
          response.availablePages = dto.availablePages;

          return response;
        }));
    }

    getItemsById(id: string): Observable<Array<Item | null>> {
      const url: string = this.get(
        endpoints.singleItem,
        {
          id,
          isBot: UserService.isBotRequest(this.request) ? 'true': 'false',
          hashtags: isPlatformServer(this.platformId) ? '' : this.getActiveHashtags().join(',')
        });

      let headers = new HttpHeaders();
      const userAgent = UserService.getUserAgent(this.request);
      if (userAgent) {
        headers = headers.set('user-agent', userAgent);
      }

      return this.http
        .get<ItemsResponseDto>(url, { headers })
        .pipe(map(dto => dto.items?.map(item => Item.fromModel(item))));
    }

}
