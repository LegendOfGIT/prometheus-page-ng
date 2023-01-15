import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiBase } from './api-base';
import { TrackingActivityItem } from '../model/tracking-activity-item';
import { TrackingInterestLevel } from '../model/tracking-interest-level';
import { UserService } from './user.service';
import { endpoints } from 'src/environments/endpoints';

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
      { level: TrackingInterestLevel.SLIGHTLY_HIGH, scoring: 0.25 },
      { level: TrackingInterestLevel.HIGH, scoring: 0.5 },
      { level: TrackingInterestLevel.VERY_HIGH, scoring: 1.0 }
    ];

    constructor(@Inject('API_BASE') apiBase: string,
                private http: HttpClient,
                private userService: UserService) {
        super(apiBase);

        setInterval(() => {
          while(this.trackedActivities.length) {
            const trackedActivity = this.trackedActivities.pop();
            if (!trackedActivity) {
              return;
            }

            const scorings = this.interestLevelToScoringMapping.filter(mappingItem => trackedActivity.getInterestLevel() == mappingItem.level);
            if (!(scorings || []).length) {
              return;
            }

            this.http.put(
              this.get(endpoints.scoreItem),
              {
                itemId: trackedActivity.getInformationItemId(),
                searchProfileId: userService.activeUser?.activeSearchProfile,
                scoring: scorings[0].scoring
              }
            ).subscribe();
          }
        }, 3000);
    }

    public addActivity(activity: TrackingActivityItem): void {
      this.trackedActivities.push(activity);
    }
}