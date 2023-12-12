import {inject, Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiBase } from './api-base';
import { TrackingActivityItem } from '../model/tracking-activity-item';
import { TrackingInterestLevel } from '../model/tracking-interest-level';
import { UserService } from './user.service';
import { endpoints } from 'src/environments/endpoints';
import { ApplicationConfiguration } from '../configurations/app';
import { isPlatformServer } from '@angular/common';
import { StorageService } from './storage.service';
import { DEFAULT_HASHTAGS } from '../model/user';

@Injectable({
    providedIn: 'root'
})
export class TrackingService extends ApiBase {

    private trackedActivities: Array<TrackingActivityItem> = [];
    private interestLevelToScoringMapping = [
      { level: TrackingInterestLevel.VERY_LOW, scoring: -1.0 },
      { level: TrackingInterestLevel.LOW, scoring: -0.5 },
      { level: TrackingInterestLevel.SLIGHTLY_LOW, scoring: -0.25 },
      { level: TrackingInterestLevel.AVERAGE, scoring: 0 },
      { level: TrackingInterestLevel.SLIGHTLY_HIGH, scoring: 0.10 },
      { level: TrackingInterestLevel.HIGH, scoring: 0.20 },
      { level: TrackingInterestLevel.VERY_HIGH, scoring: 0.40 },
      { level: TrackingInterestLevel.EVEN_HIGHER, scoring: 0.60 }
    ];

    private http: HttpClient = inject(HttpClient);
    private storageService: StorageService = inject(StorageService);
    private userService: UserService = inject(UserService);

    constructor(@Inject(PLATFORM_ID) platformId: Object) {
        super(ApplicationConfiguration.API_BASE);

        if (isPlatformServer(platformId)) {
          return;
        }

        setInterval((): void => {
          this.trackedActivities = this.storageService.getFromStorageById('activities') || [];

          while (this.trackedActivities.length) {
            const trackedActivity = this.trackedActivities.pop();
            this.storageService.storeWithId('activities', this.trackedActivities);

            if (!trackedActivity) {
              return;
            }

            const scoring = this.interestLevelToScoringMapping.find(mappingItem => trackedActivity.interestLevel == mappingItem.level);
            if (!scoring) {
              return;
            }

            this.http.put(
              this.get(`${endpoints.scoreItem}?itemTitle=${trackedActivity.informationItemLabel || ''}`),
              {
                itemId: trackedActivity.informationItemId,
                filters: trackedActivity.filters,
                hashtags: (this.userService.activeUser?.activeHashtags || DEFAULT_HASHTAGS).join(','),
                scoring: scoring.scoring,
                searchPattern: trackedActivity.searchPattern
              }
            ).subscribe();
          }
        }, 3000);
    }

    public addActivity(activity: TrackingActivityItem): void {
      this.trackedActivities.push(activity);
      this.storageService.storeWithId('activities', this.trackedActivities);
    }
}
