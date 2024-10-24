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

  public getStory(storyId: string): Observable<Story> {
    return this.httpClient.get<Story>(
      this.get(endpoints.contentGetSingleStory, { id: storyId })
    );
  }

  public saveStory(story: Story, secret: string): Observable<void> {
    return this.httpClient.post<void>(
      this.get(endpoints.contentSaveStory, {}),
      {
        secret,
        ...story,
      }
    );
  }

  public removeStoryById(id: string, secret: string): Observable<Story[]> {
    return this.httpClient.delete<Story[]>(
      this.get(endpoints.contentRemoveStory, { id }),
      {
        body: { secret }
      }
    );
  }
}
