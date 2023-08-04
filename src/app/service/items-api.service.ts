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

    private getRequestBase(): string {
      return isPlatformServer(this.platformId) ? ApplicationConfiguration.SERVICE_REQUESTS_BASE : '';
    }

    private getActiveHashtags(): Array<string> {
      return this.userService.getHashtags();
    }

    private getUserAgent(): string {
      if (this.request) {
        return this.request.headers['user-agent'] || '';
      }

      return window.navigator.userAgent || '';
    }

    private isBotRequest(): boolean {
      const agent = this.getUserAgent().toLowerCase();
      if (-1 !== agent.indexOf('googlebot')) {
        return true;
      }

      return -1 !== agent.indexOf('bingbot');
    }

    getItems(navigationId: string,
             searchPattern: string,
             filterIds: string = '',
             numberOfResults: number | undefined = undefined,
             randomItems: boolean | undefined = false,
             page: string = '1',
             priceFrom: string = '',
             priceTo: string = ''): Observable<ItemsResponse> {
      const url = this.getRequestBase() + this.get(
        endpoints.items,
        {
          filterIds,
          navigationId,
          numberOfResults: numberOfResults ? `${numberOfResults}` : '',
          isBot: this.isBotRequest() ? 'true': 'false',
          randomItems : randomItems ? 'true': 'false',
          page,
          priceFrom,
          priceTo,
          searchPattern,
          hashtags: isPlatformServer(this.platformId) ? '' : this.getActiveHashtags().join(',')
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
      const url = this.getRequestBase() + this.get(
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
      const url = this.getRequestBase() + this.get(
        endpoints.hashtagsItems,
        {
          filterIds,
          hashtags: this.getActiveHashtags().join(','),
          numberOfResults: numberOfResults ? `${numberOfResults}` : '',
          isBot: this.isBotRequest() ? 'true': 'false',
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
      const url = this.getRequestBase() + this.get(
        endpoints.singleItem,
        {
          id,
          isBot: this.isBotRequest() ? 'true': 'false',
          hashtags: isPlatformServer(this.platformId) ? '' : this.getActiveHashtags().join(',')
        });

      let headers = new HttpHeaders();
      const userAgent = this.getUserAgent();
      if (userAgent) {
        headers = headers.set('user-agent', userAgent);
      }

      return this.http
        .get<ItemsResponseDto>(url, { headers })
        .pipe(map(dto => dto.items?.map(item => Item.fromModel(item))));
    }

}
