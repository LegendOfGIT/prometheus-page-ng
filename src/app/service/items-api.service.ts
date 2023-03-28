import { HttpClient } from '@angular/common/http';
import {Inject, Injectable, Optional, PLATFORM_ID} from '@angular/core';
import { map } from 'rxjs/operators';
import { endpoints } from '../../environments/endpoints';
import { Item } from '../model/item';
import { ItemsResponseDto } from '../model/dto/items-response-dto';
import { ApiBase } from './api-base';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { ApplicationConfiguration } from '../configurations/app';
import {isPlatformServer} from "@angular/common";
import {Request} from "express";
import {REQUEST} from "@nguniversal/express-engine/tokens";

@Injectable({
    providedIn: 'root'
})
export class ItemsApiService extends ApiBase {

    constructor(
      private http: HttpClient,
      private userService: UserService,
      @Optional() @Inject(REQUEST) private request: Request,
      @Inject(PLATFORM_ID) private platformId: Object
    ) {
        super(ApplicationConfiguration.API_BASE);
    }

    private getRequestBase(): string {
      return isPlatformServer(this.platformId) ? ApplicationConfiguration.SERVICE_REQUESTS_BASE : '';
    }

    getItems(navigationId: string,
             searchPattern: string,
             numberOfResults: number | undefined = undefined,
             randomItems: boolean | undefined = false): Observable<Array<Item | null>> {
      const url = this.getRequestBase() + this.get(
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
      const url = this.getRequestBase() + this.get(
        endpoints.singleItem,
        {
          id
        });

      return this.http
        .get<ItemsResponseDto>(url)
        .pipe(map(dto => dto.items?.map(item => Item.fromModel(item))));
    }

}
