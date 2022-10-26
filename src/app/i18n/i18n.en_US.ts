import { I18nInterface } from './i18n.interface';

export class I18nEnUs implements I18nInterface {
  public getTranslations(): any {
    return {
      languageDeDe: 'german',
      languageEnUs: 'english (US)',
      NAVIGATION_ALL: 'all',
      NAVIGATION_ELECTRONICS_AND_COMPUTERS: 'electronics & computers',
      NAVIGATION_ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES: 'large appliances',
      NAVIGATION_ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES_FRIDGES_AND_FREEZERS: 'fridges & freezers',
      NAVIGATION_MULTIMEDIA: 'multimedia',
      NAVIGATION_MULTIMEDIA_GAMES: 'games',
      NAVIGATION_MULTIMEDIA_GAMES_NINTENDO_SWITCH: 'switch games',
      NAVIGATION_MULTIMEDIA_GAMES_PC: 'pc games',
      NAVIGATION_MULTIMEDIA_GAMES_PLAYSTATION_3: 'playstation 3 games',
      NAVIGATION_MULTIMEDIA_GAMES_PLAYSTATION_4: 'playstation 4 games',
      NAVIGATION_MULTIMEDIA_GAMES_PLAYSTATION_5: 'playstation 5 games',
      NAVIGATION_MULTIMEDIA_GAMES_XBOX_360: 'XBOX 360 games',
      NAVIGATION_MULTIMEDIA_GAMES_XBOX_ONE: 'XBOX One games',
      profileLogout: "logout"
    }
  }
}
