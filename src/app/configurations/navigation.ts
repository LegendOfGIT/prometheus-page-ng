import { NavigationItem } from 'src/app/model/navigation-item';

export class Navigation {

  public static ITEMS: NavigationItem[] = [
    new NavigationItem('', 'ALL', ['', '', '']),

    new NavigationItem('ALL', 'FASHION', ['fashion', '', ''], 1)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('FASHION', 'FASHION_WOMEN', ['fashion', 'women', '']).setHasSlogan(true),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_BAGS', ['fashion', 'women', 'bags']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_JACKETS', ['fashion', 'women', 'jackets']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_JEANS', ['fashion', 'women', 'jeans']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_JEWELRY', ['fashion', 'women', 'jewelry']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_PANTS', ['fashion', 'women', 'pants']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_SHOES', ['fashion', 'women', 'shoes']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_SWEATERS_AND_KNITWEAR', ['fashion', 'women', 'sweaters-and-knitwear']),
    new NavigationItem('FASHION', 'FASHION_MEN', ['fashion', 'men', '']).setHasSlogan(true),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_JACKETS', ['fashion', 'men', 'jackets']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_JEANS', ['fashion', 'men', 'jeans']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_JEWELRY', ['fashion', 'men', 'jewelry']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_PANTS', ['fashion', 'men', 'pants']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_SHOES', ['fashion', 'men', 'shoes']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_SWEATERS_AND_KNITWEAR', ['fashion', 'men', 'sweaters-and-knitwear']),

    new NavigationItem('ALL', 'LUXURIES', ['luxuries', '', ''], 2)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('LUXURIES', 'LUXURIES_WRITINGSUPPLIES', ['luxuries', 'writing-supplies', '']),
    new NavigationItem('LUXURIES_WRITINGSUPPLIES', 'LUXURIES_WRITINGSUPPLIES_BIROS', ['luxuries', 'writing-supplies', 'biros']),
    new NavigationItem('LUXURIES_WRITINGSUPPLIES', 'LUXURIES_WRITINGSUPPLIES_FOUNTAINPENS', ['luxuries', 'writing-supplies', 'fountain-pens']),

    new NavigationItem('ALL', 'KIDS', ['kids', '', ''], 5)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('KIDS', 'KIDS_BOOKS', ['kids', 'books', '']),
    new NavigationItem('KIDS_BOOKS', 'KIDS_BOOKS_AUDIOBOOKS', ['kids', 'books', 'audio-books']),
    new NavigationItem('KIDS', 'KIDS_PARTY', ['kids', 'party', '']).setHasSlogan(true),
    new NavigationItem('KIDS_PARTY', 'KIDS_PARTY_TABLEWARE', ['kids', 'party', 'tableware']),
    new NavigationItem('KIDS', 'KIDS_SCHOOL', ['kids', 'school', '']).setHasSlogan(true),
    new NavigationItem('KIDS_SCHOOL', 'KIDS_SCHOOL_SATCHEL', ['kids', 'school', 'satchel']),
    new NavigationItem('KIDS', 'KIDS_TOYS', ['kids', 'toys', '']).setHasSlogan(true),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_BABIES', ['kids', 'toys', 'babies']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_CONSTRUCTIONTOYS', ['kids', 'toys', 'construction-toys']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_GAMES', ['kids', 'toys', 'games']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_ELECTRICVEHICLES', ['kids', 'toys', 'electric-vehicles']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_SCOOTERS', ['kids', 'toys', 'scooters']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_TOYVEHICLES', ['kids', 'toys', 'toy-vehicles']),

    new NavigationItem('ALL', 'MULTIMEDIA', ['multimedia', '', ''], 4)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('MULTIMEDIA', 'MULTIMEDIA_BOOKS', ['multimedia', 'books', '']).setHasSlogan(true),
    new NavigationItem('MULTIMEDIA_BOOKS', 'MULTIMEDIA_BOOKS_HISTORY', ['multimedia', 'books', 'history']),
    new NavigationItem('MULTIMEDIA_BOOKS', 'MULTIMEDIA_BOOKS_PHILOSOPHY', ['multimedia', 'books', 'philosophy']),
    new NavigationItem('MULTIMEDIA', 'MULTIMEDIA_GAMES', ['multimedia', 'games', '']).setHasSlogan(true),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_NINTENDO_SWITCH', ['multimedia', 'games', 'nintendo-switch']),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_PC', ['multimedia', 'games', 'pc']),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_PLAYSTATION_5', ['multimedia', 'games', 'playstation-5']),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_PLAYSTATION_4', ['multimedia', 'games', 'playstation-4']),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_XBOX_ONE', ['multimedia', 'games', 'xbox-one']),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_XBOX_360', ['multimedia', 'games', 'xbox-360']),

    new NavigationItem('ALL', 'ELECTRONICS_AND_COMPUTERS', ['electronics-and-computers', '', ''], 3)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS',
      'ELECTRONICS_AND_COMPUTERS_COMPUTERS',
      ['electronics-and-computers', 'computers', '']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_COMPUTERS',
      'ELECTRONICS_AND_COMPUTERS_COMPUTERS_TABLETS',
      ['electronics-and-computers', 'computers', 'tablets']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS',
      'ELECTRONICS_AND_COMPUTERS_HOME',
      ['electronics-and-computers', 'home', '']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_HOME',
      'ELECTRONICS_AND_COMPUTERS_HOME_TVS',
      ['electronics-and-computers', 'home', 'tvs']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS',
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES',
      ['electronics-and-computers', 'large-appliances', '']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES',
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES_FRIDGES_AND_FREEZERS',
      ['electronics-and-computers', 'large-appliances', 'fridges-and-freezers']
    ).setHasSlogan(true),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES',
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES_DRYERS',
      ['electronics-and-computers', 'large-appliances', 'dryers']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES',
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES_WASHING_MACHINES',
      ['electronics-and-computers', 'large-appliances', 'washing-machines']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES',
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES_DISHWASHERS',
      ['electronics-and-computers', 'large-appliances', 'dishwashers']
    ),

    new NavigationItem('ALL', 'LIGHTING', ['lighting', '', ''], 6)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('LIGHTING', 'LIGHTING_INNERLIGHTING', ['lighting', 'inner-lighting', '']),
    new NavigationItem('LIGHTING_INNERLIGHTING', 'LIGHTING_INNERLIGHTING_ACCESSOIRES', ['lighting', 'inner-lighting', 'accessoires']),
    new NavigationItem('LIGHTING_INNERLIGHTING', 'LIGHTING_INNERLIGHTING_CEILING', ['lighting', 'inner-lighting', 'ceiling']),

    new NavigationItem('ALL', 'MUSIC', ['music', '', ''], 7)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('MUSIC', 'MUSIC_CD', ['music', 'cd', '']),
    new NavigationItem('MUSIC_CD', 'MUSIC_CD_ALTERNATIVE', ['music', 'cd', 'alternative']),
    new NavigationItem('MUSIC_CD', 'MUSIC_CD_GERMANFOLK', ['music', 'cd', 'german-folk-music']),
    new NavigationItem('MUSIC_CD', 'MUSIC_CD_POP', ['music', 'cd', 'pop']),
    new NavigationItem('MUSIC_CD', 'MUSIC_CD_ROCK', ['music', 'cd', 'rock']),

    new NavigationItem('ALL', 'BEAUTY_CARE', ['beauty-and-care', '', ''], 8)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('BEAUTY_CARE', 'BEAUTY_CARE_SKIN_CARE', ['beauty-and-care', 'skin-care', '']),
    new NavigationItem('BEAUTY_CARE_SKIN_CARE', 'BEAUTY_CARE_SKIN_CARE_FACE_CARE', ['beauty-and-care', 'skin-care', 'face-care']),
    new NavigationItem('BEAUTY_CARE_SKIN_CARE', 'BEAUTY_CARE_SKIN_CARE_KIDS', ['beauty-and-care', 'skin-care', 'kids']),

    new NavigationItem('ALL', 'HOME', ['home', '', ''], 10)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('HOME', 'HOME_ACCESSOIRES', ['home', 'accessoires', '']),
    new NavigationItem('HOME_ACCESSOIRES', 'HOME_ACCESSOIRES_CARPETS', ['home', 'accessoires', 'carpets']),
    new NavigationItem('HOME', 'HOME_FURNITURE', ['home', 'furniture', '']),
    new NavigationItem('HOME_FURNITURE', 'HOME_FURNITURE_BEDS', ['home', 'furniture', 'beds']),
    new NavigationItem('HOME_FURNITURE', 'HOME_FURNITURE_GAMINGCHAIRS', ['home', 'furniture', 'gaming-chairs']),
    new NavigationItem('HOME_FURNITURE', 'HOME_FURNITURE_KIDSBEDS', ['home', 'furniture', 'kids-beds']),
    new NavigationItem('HOME', 'HOME_GARDEN', ['home', 'garden', '']),
    new NavigationItem('HOME_GARDEN', 'HOME_GARDEN_GARDENHOUSES', ['home', 'garden', 'garden-houses']),
    new NavigationItem('HOME_GARDEN', 'HOME_GARDEN_GRILLS', ['home', 'garden', 'grills']),
    new NavigationItem('HOME_GARDEN', 'HOME_GARDEN_LOUNGEFURNITURE', ['home', 'garden', 'lounge-furniture']),
    new NavigationItem('HOME', 'HOME_TOOLS', ['home', 'tools', '']),
    new NavigationItem('HOME_TOOLS', 'HOME_TOOLS_DRILLINGMACHINES', ['home', 'tools', 'drilling-machines']),
    new NavigationItem('HOME_TOOLS', 'HOME_TOOLS_ELECTRICSAWS', ['home', 'tools', 'electric-saws']),

    new NavigationItem('ALL', 'COSMETICS', ['cosmetics', '', ''], 9)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('COSMETICS', 'COSMETICS_HAIR', ['cosmetics', 'hair', '']),
    new NavigationItem('COSMETICS_HAIR', 'COSMETICS_HAIR_STYLING', ['cosmetics', 'hair', 'styling']),
    new NavigationItem('COSMETICS', 'COSMETICS_MAKEUP', ['cosmetics', 'makeup', '']),
    new NavigationItem('COSMETICS_MAKEUP', 'COSMETICS_MAKEUP_EYES', ['cosmetics', 'makeup', 'eyes']),
    new NavigationItem('COSMETICS_MAKEUP', 'COSMETICS_MAKEUP_LIPS', ['cosmetics', 'makeup', 'lips']),
    new NavigationItem('COSMETICS', 'COSMETICS_WOMEN', ['cosmetics', 'women', '']),
    new NavigationItem('COSMETICS_WOMEN', 'COSMETICS_WOMEN_FRAGRANCES', ['cosmetics', 'women', 'fragrances']),

    new NavigationItem('ALL', 'VEHICLES', ['vehicles', '', ''], 11)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('VEHICLES', 'VEHICLES_BICYCLES', ['vehicles', 'bicycles', '']),
    new NavigationItem('VEHICLES_BICYCLES', 'VEHICLES_BICYCLES_CITYBIKES', ['vehicles', 'bicycles', 'city-bikes']),
    new NavigationItem('VEHICLES_BICYCLES', 'VEHICLES_BICYCLES_ELECTRICBIKES', ['vehicles', 'bicycles', 'electric-bikes']),
    new NavigationItem('VEHICLES', 'VEHICLES_CARS', ['vehicles', 'cars', '']),
    new NavigationItem('VEHICLES_CARS', 'VEHICLES_CARS_CHILDSEATS', ['vehicles', 'cars', 'child-seats']),
    new NavigationItem('VEHICLES_CARS', 'VEHICLES_CARS_SUMMERTYRES', ['vehicles', 'cars', 'summer-tyres']),
    new NavigationItem('VEHICLES_CARS', 'VEHICLES_CARS_WINTERTYRES', ['vehicles', 'cars', 'winter-tyres']),
    new NavigationItem('VEHICLES_CARS', 'VEHICLES_CARS_ALLWEATHERTYRES', ['vehicles', 'cars', 'all-weather-tyres']),

    new NavigationItem('ALL', 'SPORTS', ['sports', '', ''], 12)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('SPORTS', 'SPORTS_EXERCISE', ['sports', 'exercise', '']),
    new NavigationItem('SPORTS_EXERCISE', 'SPORTS_EXERCISE_EQUIPMENT', ['sports', 'exercise', 'equipment'])
  ];

  public static getAllRootItems(): Array<NavigationItem> {
    const rootItems = this.ITEMS.filter(item => 'ALL' === item.fromId);
    rootItems.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    return rootItems;
  }

  public static getNavigationItemByToId(toId: string): NavigationItem | undefined {
    const items = this.ITEMS.filter(item => toId === item.toId);
    return items && items.length ? items[0] : undefined;
  }
}
