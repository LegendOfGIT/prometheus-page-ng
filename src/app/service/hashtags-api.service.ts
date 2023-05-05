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
import {map} from "rxjs/operators";
import {RankedCategoryDto} from "../model/dto/ranked-category-dto";

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
      this.getRankedCategoriesByHashTags().subscribe(categoryIds => {
        this.rankedCategoryIds = categoryIds;
      });
    }

    private getRequestBase(): string {
      return isPlatformServer(this.platformId) ? ApplicationConfiguration.SERVICE_REQUESTS_BASE : '';
    }

    private getActiveHashTags(): Array<string> {
      return this.userService.activeUser?.activeHashTags || DEFAULT_HASHTAGS;
    }

    getRankedCategoriesByHashTags(): Observable<Array<string>> {
      const url = this.getRequestBase() + this.get(
        endpoints.rankedCategoriesByHashTags,
        {
          hashTags: this.getActiveHashTags().join(',')
        });

      return this.http
         .get<Array<RankedCategoryDto>>(url)
         .pipe(map(dto => dto.map(rankedCategory => rankedCategory.categoryId)));
    }
}
