import { TrackingInterestLevel } from './tracking-interest-level';

export class TrackingActivityItem {
    private interestLevel: TrackingInterestLevel = TrackingInterestLevel.AVERAGE;
    private informationItemId: string = '';
    private trackingId: string = '';
    private activityTimestamp: Date = new Date();

    public static create(): TrackingActivityItem {
      return new TrackingActivityItem();
    }

    public getInterestLevel(): TrackingInterestLevel {
      return this.interestLevel;
    }

    public setInterestLevel(interestLevel: TrackingInterestLevel): TrackingActivityItem {
      this.interestLevel = interestLevel;
      return this;
    }

    public getInformationItemId(): string {
      return this.informationItemId;
    }

    public setInformationItemId(informationItemId: string): TrackingActivityItem {
      this.informationItemId = informationItemId;
      return this;
    }

    public getTrackingId(): string {
      return this.trackingId;
    }

    public setTrackingId(trackingId: string): TrackingActivityItem {
      this.trackingId = trackingId;
      return this;
    }

    public getActivityTimestamp(): Date {
      return this.activityTimestamp;
    }
}
