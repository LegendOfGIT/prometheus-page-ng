import { NavigationItem } from 'src/app/model/navigation-item';

export class Navigation {

  public static ITEMS: NavigationItem[] = [
    new NavigationItem('', 'ALL', ['', '', '']),

    new NavigationItem('ALL', 'FASHION', ['fashion', '', '']),
    new NavigationItem('FASHION', 'FASHION_WOMEN', ['fashion', 'women', '']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_JEWELRY', ['fashion', 'women', 'jewelry']),
    new NavigationItem('FASHION', 'FASHION_MEN', ['fashion', 'men', '']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_JEWELRY', ['fashion', 'men', 'jewelry']),

    new NavigationItem('ALL', 'KIDS', ['kids', '', '']),
    new NavigationItem('KIDS', 'KIDS_PARTY', ['kids', 'party', '']),
    new NavigationItem('KIDS_PARTY', 'KIDS_PARTY_TABLEWARE', ['kids', 'party', 'tableware']),
    new NavigationItem('KIDS', 'KIDS_SCHOOL', ['kids', 'school', '']),
    new NavigationItem('KIDS_SCHOOL', 'KIDS_SCHOOL_SATCHEL', ['kids', 'school', 'satchel']),

    new NavigationItem('ALL', 'MULTIMEDIA', ['multimedia', '', '']),
    new NavigationItem('MULTIMEDIA', 'MULTIMEDIA_GAMES', ['multimedia', 'games', '']),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_NINTENDO_SWITCH', ['multimedia', 'games', 'nintendo-switch']),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_PC', ['multimedia', 'games', 'pc']),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_PLAYSTATION_5', ['multimedia', 'games', 'playstation-5']),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_PLAYSTATION_4', ['multimedia', 'games', 'playstation-4']),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_XBOX_ONE', ['multimedia', 'games', 'xbox-one']),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_XBOX_360', ['multimedia', 'games', 'xbox-360']),

    new NavigationItem('ALL', 'ELECTRONICS_AND_COMPUTERS', ['electronics-and-computers', '', '']),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS',
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES',
      ['electronics-and-computers', 'large-appliances', '']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES',
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES_FRIDGES_AND_FREEZERS',
      ['electronics-and-computers', 'large-appliances', 'fridges-and-freezers']
    ),

    new NavigationItem('ALL', 'MUSIC', ['music', '', '']),
    new NavigationItem('MUSIC', 'MUSIC_CD', ['music', 'cd', '']),
    new NavigationItem('MUSIC_CD', 'MUSIC_CD_GERMANFOLK', ['music', 'cd', 'german-folk-music']),

  ];

}
