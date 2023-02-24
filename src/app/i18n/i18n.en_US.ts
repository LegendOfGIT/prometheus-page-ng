import { I18nInterface } from './i18n.interface';

export class I18nEnUs implements I18nInterface {
  public getTranslations(): any {
    return {
      iAmSearchingFor: 'I am searching for ...',
      languageDeDe: 'german',
      languageEnUs: 'english (US)',
      NAVIGATION_ALL: 'all products',
      NAVIGATION_ELECTRONICS_AND_COMPUTERS: 'electronics & computers',
      NAVIGATION_ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES: 'large appliances',
      NAVIGATION_ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES_FRIDGES_AND_FREEZERS: 'fridges & freezers',
      NAVIGATION_FASHION: 'fashion',
      NAVIGATION_FASHION_MEN: 'men',
      NAVIGATION_FASHION_MEN_JEWELRY: 'jewelry',
      NAVIGATION_FASHION_WOMEN: 'women',
      NAVIGATION_FASHION_WOMEN_JEWELRY: 'jewelry',
      NAVIGATION_MULTIMEDIA: 'multimedia',
      NAVIGATION_MULTIMEDIA_GAMES: 'games',
      NAVIGATION_MULTIMEDIA_GAMES_NINTENDO_SWITCH: 'switch games',
      NAVIGATION_MULTIMEDIA_GAMES_PC: 'pc games',
      NAVIGATION_MULTIMEDIA_GAMES_PLAYSTATION_3: 'playstation 3 games',
      NAVIGATION_MULTIMEDIA_GAMES_PLAYSTATION_4: 'playstation 4 games',
      NAVIGATION_MULTIMEDIA_GAMES_PLAYSTATION_5: 'playstation 5 games',
      NAVIGATION_MULTIMEDIA_GAMES_XBOX_360: 'XBOX 360 games',
      NAVIGATION_MULTIMEDIA_GAMES_XBOX_ONE: 'XBOX One games',
      SEARCH_PROFILE_CATEGORY_CHARACTERISTICS: 'Characteristics',
      SEARCH_PROFILE_CATEGORY_GENDER_AND_AGE: 'Gender and age',
      SEARCH_PROFILE_CHARACTERISTICS_ACTIVE: 'Active',
      SEARCH_PROFILE_CHARACTERISTICS_CLEVER: 'Clever',
      SEARCH_PROFILE_CHARACTERISTICS_CREATIVE: 'Creative',
      SEARCH_PROFILE_GENDER_AGE_BABY: 'Baby',
      SEARCH_PROFILE_GENDER_AGE_GIRL: 'Girl',
      SEARCH_PROFILE_GENDER_AGE_BOY: 'Boy',
      SEARCH_PROFILE_GENDER_AGE_TEENAGER_GIRL: 'Teenager girl',
      SEARCH_PROFILE_GENDER_AGE_TEENAGER_BOY: 'Teenager boy',
      SEARCH_PROFILE_GENDER_AGE_ADULT_WOMAN: 'Woman',
      SEARCH_PROFILE_GENDER_AGE_ADULT_MAN: 'Man',
      SEARCH_PROFILE_GENDER_AGE_ELDER_WOMAN: 'Elder woman',
      SEARCH_PROFILE_GENDER_AGE_ELDER_MAN: 'Elder man',
      profileLogout: "logout"
    }
  }
}
