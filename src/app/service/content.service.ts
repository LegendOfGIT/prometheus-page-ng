import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiBase } from './api-base';
import { ApplicationConfiguration } from 'src/app/configurations/app';
import { endpoints } from 'src/environments/endpoints';
import {Story} from 'src/app/model/story';
import {ThingOfInterest} from "../model/thing-of-interest";
import {ThingOfInterestComponent} from "../component/things-of-interest/thing-of-interest.component";
import {map} from "rxjs/operators";

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

  public getThingsOfInterest(): Observable<ThingOfInterest[]> {
    return this.httpClient.get<ThingOfInterest[]>(
      this.get(endpoints.contentGetThingsOfInterest, {})
    );
  }

  public getThingOfInterest(id: string): Observable<ThingOfInterest | undefined> {
    return this.httpClient.get<ThingOfInterest[]>(
      this.get(endpoints.contentGetThingsOfInterest, {})
    )
      .pipe(map((thingsOfInterest: ThingOfInterest[]): ThingOfInterest | undefined => {
          return thingsOfInterest.find((thingOfInterest: ThingOfInterest): boolean => thingOfInterest.id === id);
      }));
  }

  public saveThingOfInterest(item: ThingOfInterest, secret: string): Observable<void> {
    return this.httpClient.post<void>(
      this.get(endpoints.contentSaveThingOfInterest, {}),
      {
        secret,
        ...item,
      }
    );
  }

  public removeThingOfInterestById(id: string, secret: string): Observable<Story[]> {
    return this.httpClient.delete<Story[]>(
      this.get(endpoints.contentRemoveThingOfInterest, { id }),
      {
        body: { secret }
      }
    );
  }
}
