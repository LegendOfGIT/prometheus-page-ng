import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Inject, Injectable, Optional, PLATFORM_ID} from '@angular/core';
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

@Injectable({
    providedIn: 'root'
})
export class ItemsApiService extends ApiBase {

    constructor(
      private http: HttpClient,
      private userService: UserService,
      @Inject(PLATFORM_ID) private platformId: Object
    ) {
        super(ApplicationConfiguration.API_BASE);
    }

    private getRequestBase(): string {
      return isPlatformServer(this.platformId) ? ApplicationConfiguration.SERVICE_REQUESTS_BASE : '';
    }

    private getActiveSearchProfileId(): string {
      return this.userService.activeUser?.activeSearchProfile || '';
    }

    private getUserAgentFromClient(): string | undefined {
      if (isPlatformServer(this.platformId)) {
        return;
      }

      return window.navigator.userAgent || '';
    }

    getItems(navigationId: string,
             searchPattern: string,
             numberOfResults: number | undefined = undefined,
             randomItems: boolean | undefined = false,
             page: string = '1'): Observable<ItemsResponse> {
      const url = this.getRequestBase() + this.get(
        endpoints.items,
        {
          navigationId,
          numberOfResults: numberOfResults ? `${numberOfResults}` : '',
          randomItems : randomItems ? 'true': 'false',
          page,
          searchPattern,
          searchProfileId: this.getActiveSearchProfileId()
        });

      const headers= new HttpHeaders()
        .set('User-Agent', this.getUserAgentFromClient());

      return this.http
         .get<ItemsResponseDto>(url, { headers })
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
          searchProfileId: this.getActiveSearchProfileId()
        });

      const headers= new HttpHeaders()
        .set('User-Agent', this.getUserAgentFromClient());

      return this.http
        .get<ItemsResponseDto>(url, { headers })
        .pipe(map(dto => dto.items?.map(item => Item.fromModel(item))));
    }

}
