import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { endpoints } from '../../environments/endpoints';
import { Item } from '../model/item';
import { ItemDto } from '../model/dto/item-dto';
import { ItemsResponseDto } from '../model/dto/items-response-dto';
import { ApiBase } from './api-base';

@Injectable({
    providedIn: 'root'
})
export class ItemsApiService extends ApiBase {

    constructor(
      @Inject('API_BASE') apiBase: string,
      private http: HttpClient
    ) {
        super(apiBase);
    }

    getItems(navigationId: string, searchPattern: string) {

        const url = this.get(endpoints.items, { navigationId, searchPattern });

        return this.http
           .get<ItemsResponseDto>(url)
           .pipe(map(dto => dto.items?.map(item => Item.fromModel(item))));

    }

}
