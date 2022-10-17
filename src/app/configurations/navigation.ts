import { NavigationItem } from 'src/app/model/navigation-item';

export class Navigation {

  public static ITEMS: NavigationItem[] = [
    new NavigationItem('ALL', 'MULTIMEDIA', '/multimedia'),
    new NavigationItem('MULTIMEDIA', 'MULTIMEDIA_GAMES', '/multimedia/games'),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_NINTENDO_SWITCH', '/multimedia/games/nintendo-switch'),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_PC', '/multimedia/games/pc'),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_PLAYSTATION_4', '/multimedia/games/playstation-4'),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_PLAYSTATION_3', '/multimedia/games/playstation-3'),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_XBOX_ONE', '/multimedia/games/xbox-one'),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_XBOX_360', '/multimedia/games/xbox-360'),
    new NavigationItem('ALL', 'ELECTRONICS_AND_COMPUTERS', '/electronics-and-computers'),
    new NavigationItem('ELECTRONICS_AND_COMPUTERS', 'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES', '/electronics-and-computers/large-appliances'),
    new NavigationItem('ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES', 'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES_FRIDGES_AND_FREEZERS', '/electronics-and-computers/large-appliances/fridges-and-freezers')
  ];

}
