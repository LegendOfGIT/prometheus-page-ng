import { I18nInterface } from './i18n.interface';

export class I18nDeDe implements I18nInterface {
  public getTranslations(): any {
    return {
      languageDeDe: 'deutsch',
      languageEnUs: 'englisch (US)',
      NAVIGATION_ALL: 'Alles',
      NAVIGATION_ELECTRONICS_AND_COMPUTERS: 'Elektronik & Computer',
      NAVIGATION_ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES: 'Elektro Großgeräte',
      NAVIGATION_ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES_FRIDGES_AND_FREEZERS: 'Kühlschränke & Gefriergeräte',
      NAVIGATION_MULTIMEDIA: 'Multimedia',
      NAVIGATION_MULTIMEDIA_GAMES: 'Games',
      NAVIGATION_MULTIMEDIA_GAMES_NINTENDO_SWITCH: 'Switch games',
      NAVIGATION_MULTIMEDIA_GAMES_PC: 'PC-Games',
      NAVIGATION_MULTIMEDIA_GAMES_PLAYSTATION_3: 'Playstation 3 Games',
      NAVIGATION_MULTIMEDIA_GAMES_PLAYSTATION_4: 'Playstation 4 Games',
      NAVIGATION_MULTIMEDIA_GAMES_PLAYSTATION_5: 'Playstation 5 Games',
      NAVIGATION_MULTIMEDIA_GAMES_XBOX_360: 'XBOX 360 Games',
      NAVIGATION_MULTIMEDIA_GAMES_XBOX_ONE: 'XBOX One Games',
      profileLogout: 'ausloggen'
    }
  }
}
