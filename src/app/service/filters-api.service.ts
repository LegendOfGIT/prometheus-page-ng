import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { map } from 'rxjs/operators';
import { endpoints } from '../../environments/endpoints';
import { ApiBase } from './api-base';
import { Observable } from 'rxjs';
import { ApplicationConfiguration } from '../configurations/app';
import {AvailableFilterItem} from "../model/available-filter-item";
import {AvailableFiltersResponse} from "../model/available-filters-response";

@Injectable({
    providedIn: 'root'
})
export class FiltersApiService extends ApiBase {

    constructor(
      private http: HttpClient
    ) {
        super(ApplicationConfiguration.API_BASE);
    }

    getAvailableFilters(navigationId: string,
                        searchPattern: string,
                        priceFrom: string = '',
                        priceTo: string = ''): Observable<Array<AvailableFilterItem | null>> {
      const url: string = this.get(
        endpoints.itemsAvailableFilters,
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
