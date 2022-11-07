import { SearchProfileDto } from './dto/search-profile-dto';
import { BaseModel } from './factory/factory-base';

export class SearchProfile extends BaseModel {
    id: string = '';
    avatarBackgroundColor: string = '';
    profileItemIds: Array<string> = [];

    public setId(id: string): SearchProfile {
      this.id = id;
      return this;
    }

    public setAvatarBackgroundColor(avatarBackgroundColor: string): SearchProfile {
      this.avatarBackgroundColor = avatarBackgroundColor;
      return this;
    }

    public setProfileItemIds(profileItemIds: Array<string>): SearchProfile {
      this.profileItemIds = profileItemIds;
      return this;
    }

    static override fromModel(data: SearchProfileDto): SearchProfile | null {
      return this.bindFrom<SearchProfileDto, SearchProfile>(SearchProfile, data);
    }
}
