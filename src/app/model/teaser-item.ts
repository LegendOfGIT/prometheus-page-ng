import {ModeratedTeaserMode} from '../component/landing-pages/moderated-teaser-mode';

export class TeaserItem {
  createdToday: boolean = false;
  filters: Array<string> | undefined;
  hashtags: Array<string> | undefined;
  headerTitle: string = '';
  linkUri: string = '';
  navigationId: string = '';
  searchPattern: string = '';
  ssrRendering: boolean = false;
  moderatedTeaserMode: ModeratedTeaserMode = ModeratedTeaserMode.ALL_SMALL;

  constructor(linkUri: string, navigationId: string, searchPattern: string, headerTitle: string) {
    this.headerTitle = headerTitle;
    this.linkUri = linkUri;
    this.navigationId = navigationId;
    this.searchPattern = searchPattern;
  }

  public setFilters(filters: Array<string>): TeaserItem {
    this.filters = filters;
    return this;
  }

  public setHashtags(hashtags: Array<string>): TeaserItem {
    this.hashtags = hashtags;
    return this;
  }

  public setSsrRendering(ssrRendering: boolean): TeaserItem {
    this.ssrRendering = ssrRendering;
    return this;
  }

  public setModeratedTeaserMode(moderatedTeaserMode: ModeratedTeaserMode): TeaserItem {
    this.moderatedTeaserMode = moderatedTeaserMode;
    return this;
  }

  public setCreatedToday(createdToday: boolean): TeaserItem {
    this.createdToday = createdToday;
    return this;
  }
}
