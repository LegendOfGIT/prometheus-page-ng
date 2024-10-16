import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiBase } from './api-base';
import { ApplicationConfiguration } from 'src/app/configurations/app';
import { endpoints } from 'src/environments/endpoints';
import {Story} from 'src/app/model/story';

@Injectable({
    providedIn: 'root'
})
export class ContentService extends ApiBase {
  constructor(private httpClient: HttpClient) {
    super(ApplicationConfiguration.API_BASE);
  }

  public getStories(): Observable<Story[]> {
    return this.httpClient.get<Story[]>(
      this.get(endpoints.contentGetStories, {})
    );
  }

  public removeStoryById(id: string, secret: number): Observable<Story[]> {
    return this.httpClient.delete<Story[]>(
      this.get(endpoints.contentRemoveStory, { id }),
      {
        body: { secret }
      }
    );
  }
}
