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
import {AvailableFilterItem} from "../model/available-filter-item";
import {AvailableFiltersResponse} from "../model/available-filters-response";

@Injectable({
    providedIn: 'root'
})
export class FiltersApiService extends ApiBase {

    constructor(
      private http: HttpClient,
      private userService: UserService,
      @Inject(PLATFORM_ID) private platformId: Object,
      @Optional() @Inject(REQUEST) private request: Request
    ) {
        super(ApplicationConfiguration.API_BASE);
    }

    getAvailableFilters(navigationId: string,
                        searchPattern: string,
                        priceFrom: string = '',
                        priceTo: string = ''): Observable<Array<AvailableFilterItem | null>> {
      const url: string = this.get(
        endpoints.availableFilters,
        {
          navigationId,
          priceFrom,
          priceTo,
          searchPattern
        });

      return this.http
         .get<AvailableFiltersResponse>(url)
         .pipe(map(response => response.items));
    }
}
