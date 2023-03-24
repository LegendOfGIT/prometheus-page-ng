import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { endpoints } from '../../environments/endpoints';
import { Item } from '../model/item';
import { ItemsResponseDto } from '../model/dto/items-response-dto';
import { ApiBase } from './api-base';
import { UserService } from './user.service';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ItemsApiService extends ApiBase {

    constructor(
      @Inject('API_BASE') apiBase: string,
      private http: HttpClient,
      private userService: UserService
    ) {
        super(apiBase);
    }

    getItems(navigationId: string,
             searchPattern: string,
             numberOfResults: number | undefined = undefined,
             randomItems: boolean | undefined = false): Observable<Array<Item | null>> {

        const url = this.get(
          endpoints.items,
          {
            navigationId,
            numberOfResults: numberOfResults ? `${numberOfResults}` : '',
            randomItems : randomItems ? 'true': 'false',
            searchPattern,
            searchProfileId: this.userService.activeUser?.activeSearchProfile || ''
          });

        return this.http
           .get<ItemsResponseDto>(url)
           .pipe(map(dto => dto.items?.map(item => Item.fromModel(item))));

    }

    getItemsById(id: string): Observable<Array<Item | null>> {
      const url = this.get(
        endpoints.singleItem,
        {
          id
        });

      return this.http
        .get<ItemsResponseDto>(url)
        .pipe(map(dto => dto.items?.map(item => Item.fromModel(item))));
    }

}
