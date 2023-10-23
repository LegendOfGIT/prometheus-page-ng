import { TrackingInterestLevel } from './tracking-interest-level';

export class TrackingActivityItem {
    public interestLevel: TrackingInterestLevel = TrackingInterestLevel.AVERAGE;
    public informationItemId: string = '';
    public filters: string = '';
    public searchPattern: string = '';
    public trackingId: string = '';
    public activityTimestamp: Date = new Date();

    public static create(): TrackingActivityItem {
      return new TrackingActivityItem();
    }


    public setInterestLevel(interestLevel: TrackingInterestLevel): TrackingActivityItem {
      this.interestLevel = interestLevel;
      return this;
    }

    public setInformationItemId(informationItemId: string): TrackingActivityItem {
      this.informationItemId = informationItemId;
      return this;
    }

    public setTrackingId(trackingId: string): TrackingActivityItem {
      this.trackingId = trackingId;
      return this;
    }

    public setSearchPattern(searchPattern: string): TrackingActivityItem {
      this.searchPattern = searchPattern;
      return this;
    }

    public setFilters(filters: string): TrackingActivityItem {
      this.filters = filters;
      return this;
    }
}
