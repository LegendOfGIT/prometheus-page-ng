export class User {
    id: string = '';
    activeHashtags: Array<string> = DEFAULT_HASHTAGS;
    activeWishlistId: string = '';
    localeForDisplay: string = 'de_DE';

    public setId(id: string) : User {
      this.id = id;
      return this;
    }
}

export const DEFAULT_HASHTAGS: Array<string> = [ 'Highlights' ];
