import { NavigationItem } from 'src/app/model/navigation-item';
import {Item} from '../model/item';

export class Navigation {

  public static ITEMS: NavigationItem[] = [
    new NavigationItem('', 'ALL', ['', '', '']),

    new NavigationItem('ALL', 'FASHION', ['fashion', '', ''], 1)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('FASHION', 'FASHION_BOYS', ['fashion', 'boys', '']),
    new NavigationItem('FASHION_BOYS', 'FASHION_BOYS_DISGUISES', ['fashion', 'boys', 'disguises']),
    new NavigationItem('FASHION_BOYS', 'FASHION_BOYS_SHOES', ['fashion', 'boys', 'shoes']),
    new NavigationItem('FASHION_BOYS', 'FASHION_BOYS_SWIMWEAR', ['fashion', 'boys', 'swimwear']),
    new NavigationItem('FASHION', 'FASHION_GIRLS', ['fashion', 'girls', '']),
    new NavigationItem('FASHION_GIRLS', 'FASHION_GIRLS_DISGUISES', ['fashion', 'girls', 'disguises']),
    new NavigationItem('FASHION_GIRLS', 'FASHION_GIRLS_SHOES', ['fashion', 'girls', 'shoes']),
    new NavigationItem('FASHION_GIRLS', 'FASHION_GIRLS_SWIMWEAR', ['fashion', 'girls', 'swimwear']),
    new NavigationItem('FASHION', 'FASHION_WOMEN', ['fashion', 'women', '']).setHasSlogan(true),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_BAGS', ['fashion', 'women', 'bags']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_DISGUISES', ['fashion', 'women', 'disguises']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_JACKETS', ['fashion', 'women', 'jackets']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_JEANS', ['fashion', 'women', 'jeans']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_JEWELRY', ['fashion', 'women', 'jewelry']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_NIGHTWEAR', ['fashion', 'women', 'nightwear']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_PANTS', ['fashion', 'women', 'pants']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_SHOES', ['fashion', 'women', 'shoes']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_SKIRTS', ['fashion', 'women', 'skirts']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_SWEATERS_AND_KNITWEAR', ['fashion', 'women', 'sweaters-and-knitwear']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_SWIMWEAR', ['fashion', 'women', 'swimwear']),
    new NavigationItem('FASHION', 'FASHION_MEN', ['fashion', 'men', '']).setHasSlogan(true),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_DISGUISES', ['fashion', 'men', 'disguises']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_EROTICUNDERWEAR', ['fashion', 'men', 'erotic-underwear']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_JACKETS', ['fashion', 'men', 'jackets']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_JEANS', ['fashion', 'men', 'jeans']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_JEWELRY', ['fashion', 'men', 'jewelry']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_NIGHTWEAR', ['fashion', 'men', 'nightwear']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_PANTS', ['fashion', 'men', 'pants']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_SHIRTS', ['fashion', 'men', 'shirts']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_SHOES', ['fashion', 'men', 'shoes']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_SHORTS', ['fashion', 'men', 'shorts']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_UNDERWEAR', ['fashion', 'men', 'underwear']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_SWEATERS_AND_KNITWEAR', ['fashion', 'men', 'sweaters-and-knitwear']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_SWIMWEAR', ['fashion', 'men', 'swimwear']),

    new NavigationItem('ALL', 'LUXURIES', ['luxuries', '', ''], 2)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('LUXURIES', 'LUXURIES_DRINKS', ['luxuries', 'drinks', '']),
    new NavigationItem('LUXURIES_DRINKS', 'LUXURIES_DRINKS_COFFEE', ['luxuries', 'drinks', 'coffee']),
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
    new NavigationItem('KIDS_SCHOOL', 'KIDS_SCHOOL_SCHOOLCONES', ['kids', 'school', 'school-cones']),
    new NavigationItem('KIDS_SCHOOL', 'KIDS_SCHOOL_SUPPLIES', ['kids', 'school', 'supplies']),
    new NavigationItem('KIDS', 'KIDS_TOYS', ['kids', 'toys', '']).setHasSlogan(true),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_BABIES', ['kids', 'toys', 'babies']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_CONSTRUCTIONTOYS', ['kids', 'toys', 'construction-toys']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_GAMES', ['kids', 'toys', 'games']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_ELECTRICVEHICLES', ['kids', 'toys', 'electric-vehicles']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_EXPERIMENTANDRESEARCH', ['kids', 'toys', 'experiment-and-research']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_FIGURES', ['kids', 'toys', 'toy-figures']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_SCOOTERS', ['kids', 'toys', 'scooters']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_TOYVEHICLES', ['kids', 'toys', 'toy-vehicles']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_TRADINGCARDS', ['kids', 'toys', 'trading-cards']),

    new NavigationItem('ALL', 'MULTIMEDIA', ['multimedia', '', ''], 4)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('MULTIMEDIA', 'MULTIMEDIA_BOOKS', ['multimedia', 'books', '']).setHasSlogan(true),
    new NavigationItem('MULTIMEDIA_BOOKS', 'MULTIMEDIA_BOOKS_CRIMETHRILLERS', ['multimedia', 'books', 'crime-and-thrillers']),
    new NavigationItem('MULTIMEDIA_BOOKS', 'MULTIMEDIA_BOOKS_FANTASY', ['multimedia', 'books', 'fantasy']),
    new NavigationItem('MULTIMEDIA_BOOKS', 'MULTIMEDIA_BOOKS_HISTORY', ['multimedia', 'books', 'history']),
    new NavigationItem('MULTIMEDIA_BOOKS', 'MULTIMEDIA_BOOKS_PHILOSOPHY', ['multimedia', 'books', 'philosophy']),
    new NavigationItem('MULTIMEDIA_BOOKS', 'MULTIMEDIA_BOOKS_SCHOOLBOOKS', ['multimedia', 'books', 'school-books']),
    new NavigationItem('MULTIMEDIA_BOOKS', 'MULTIMEDIA_BOOKS_SCIENCEFICTION', ['multimedia', 'books', 'science-fiction']),
    new NavigationItem('MULTIMEDIA', 'MULTIMEDIA_GAMES', ['multimedia', 'games', '']).setHasSlogan(true),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_NINTENDODS', ['multimedia', 'games', 'nintendo-ds']),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_NINTENDO_SWITCH', ['multimedia', 'games', 'nintendo-switch']),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_PC', ['multimedia', 'games', 'pc']),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_PLAYSTATION_5', ['multimedia', 'games', 'playstation-5']),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_PLAYSTATION_4', ['multimedia', 'games', 'playstation-4']),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_XBOX_ONE', ['multimedia', 'games', 'xbox-one']),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_XBOX_360', ['multimedia', 'games', 'xbox-360']),
    new NavigationItem('MULTIMEDIA', 'MULTIMEDIA_MOVIES', ['multimedia', 'movies', '']),
    new NavigationItem('MULTIMEDIA_MOVIES', 'MULTIMEDIA_MOVIES_ACTION', ['multimedia', 'movies', 'action']),
    new NavigationItem('MULTIMEDIA_MOVIES', 'MULTIMEDIA_MOVIES_ANIME', ['multimedia', 'movies', 'anime']),
    new NavigationItem('MULTIMEDIA_MOVIES', 'MULTIMEDIA_MOVIES_FANTASY', ['multimedia', 'movies', 'fantasy']),

    new NavigationItem('ALL', 'ELECTRONICS_AND_COMPUTERS', ['electronics-and-computers', '', ''], 3)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS',
      'ELECTRONICS_AND_COMPUTERS_CABLES',
      ['electronics-and-computers', 'cables', '']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_CABLES',
      'ELECTRONICS_AND_COMPUTERS_CABLES_AUDIOCABLES',
      ['electronics-and-computers', 'cables', 'audio-cables']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_CABLES',
      'ELECTRONICS_AND_COMPUTERS_CABLES_ELECTRICCABLES',
      ['electronics-and-computers', 'cables', 'electrical-cables']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_CABLES',
      'ELECTRONICS_AND_COMPUTERS_CABLES_DISPLAYCABLES',
      ['electronics-and-computers', 'cables', 'display-cables']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_CABLES',
      'ELECTRONICS_AND_COMPUTERS_CABLES_NETWORKCABLES',
      ['electronics-and-computers', 'cables', 'network-cables']
    ),
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
      'ELECTRONICS_AND_COMPUTERS_EROTIC',
      ['electronics-and-computers', 'erotic', '']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_EROTIC',
      'ELECTRONICS_AND_COMPUTERS_EROTIC_VIBRATORS',
      ['electronics-and-computers', 'erotic', 'vibrators']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS',
      'ELECTRONICS_AND_COMPUTERS_HOME',
      ['electronics-and-computers', 'home', '']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_HOME',
      'ELECTRONICS_AND_COMPUTERS_HOME_AIRPURIFIERS',
      ['electronics-and-computers', 'home', 'air-purifiers']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_HOME',
      'ELECTRONICS_AND_COMPUTERS_HOME_AIRVENTS',
      ['electronics-and-computers', 'home', 'air-vents']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_HOME',
      'ELECTRONICS_AND_COMPUTERS_HOME_FULLYAUTOMATICCOFFEEMACHINES',
      ['electronics-and-computers', 'home', 'fully-automatic-coffee-machines']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_HOME',
      'ELECTRONICS_AND_COMPUTERS_HOME_HOMECINEMA',
      ['electronics-and-computers', 'home', 'home-cinema']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_HOME',
      'ELECTRONICS_AND_COMPUTERS_HOME_INKJETPRINTER',
      ['electronics-and-computers', 'home', 'inkjet-printers']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_HOME',
      'ELECTRONICS_AND_COMPUTERS_HOME_LASERPRINTER',
      ['electronics-and-computers', 'home', 'laser-printers']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_HOME',
      'ELECTRONICS_AND_COMPUTERS_HOME_TVS',
      ['electronics-and-computers', 'home', 'tvs']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_HOME',
      'ELECTRONICS_AND_COMPUTERS_HOME_VACUUMCLEANERS',
      ['electronics-and-computers', 'home', 'vacuum-cleaners']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS',
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES',
      ['electronics-and-computers', 'large-appliances', '']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES',
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES_DISHWASHERS',
      ['electronics-and-computers', 'large-appliances', 'dishwashers']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES',
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES_DRYERS',
      ['electronics-and-computers', 'large-appliances', 'dryers']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES',
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES_FRIDGES_AND_FREEZERS',
      ['electronics-and-computers', 'large-appliances', 'fridges-and-freezers']
    ).setHasSlogan(true),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES',
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES_OVENS',
      ['electronics-and-computers', 'large-appliances', 'ovens']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES',
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES_WASHING_MACHINES',
      ['electronics-and-computers', 'large-appliances', 'washing-machines']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS',
      'ELECTRONICS_AND_COMPUTERS_PHONES',
      ['electronics-and-computers', 'phones', '']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_PHONES',
      'ELECTRONICS_AND_COMPUTERS_PHONES_SMARTPHONESCELLPHONES',
      ['electronics-and-computers', 'phones', 'smartphones-and-cellphones']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS',
      'ELECTRONICS_AND_COMPUTERS_WEARABLES',
      ['electronics-and-computers', 'wearables', '']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_WEARABLES',
      'ELECTRONICS_AND_COMPUTERS_WEARABLES_SMARTWATCHES',
      ['electronics-and-computers', 'wearables', 'smartwatches']
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
    new NavigationItem('MUSIC', 'MUSIC_INSTRUMENTS', ['music', 'instruments', '']),
    new NavigationItem('MUSIC_INSTRUMENTS', 'MUSIC_INSTRUMENTS_GUITARS', ['music', 'instruments', 'guitars']),
    new NavigationItem('MUSIC_INSTRUMENTS', 'MUSIC_INSTRUMENTS_MIXINGPANELS', ['music', 'instruments', 'mixing-panels']),
    new NavigationItem('MUSIC_INSTRUMENTS', 'MUSIC_INSTRUMENTS_PIANOS', ['music', 'instruments', 'pianos']),

    new NavigationItem('ALL', 'BEAUTY_CARE', ['beauty-and-care', '', ''], 8)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('BEAUTY_CARE', 'BEAUTY_CARE_BODYCARE', ['beauty-and-care', 'body-care', '']),
    new NavigationItem('BEAUTY_CARE_BODYCARE', 'BEAUTY_CARE_BODYCARE_SOAP', ['beauty-and-care', 'body-care', 'soap']),
    new NavigationItem('BEAUTY_CARE', 'BEAUTY_CARE_EROTIC', ['beauty-and-care', 'erotic', '']),
    new NavigationItem('BEAUTY_CARE_EROTIC', 'BEAUTY_CARE_EROTIC_MASSAGES', ['beauty-and-care', 'erotic', 'massages']),
    new NavigationItem('BEAUTY_CARE', 'BEAUTY_CARE_FRAGRANCES', ['beauty-and-care', 'fragrances', '']),
    new NavigationItem('BEAUTY_CARE_FRAGRANCES', 'BEAUTY_CARE_FRAGRANCES_MEN', ['beauty-and-care', 'fragrances', 'men']),
    new NavigationItem('BEAUTY_CARE_FRAGRANCES', 'BEAUTY_CARE_FRAGRANCES_UNISEX', ['beauty-and-care', 'fragrances', 'unisex']),
    new NavigationItem('BEAUTY_CARE_FRAGRANCES', 'BEAUTY_CARE_FRAGRANCES_WOMEN', ['beauty-and-care', 'fragrances', 'women']),
    new NavigationItem('BEAUTY_CARE', 'BEAUTY_CARE_HAIR', ['beauty-and-care', 'hair', '']),
    new NavigationItem('BEAUTY_CARE_HAIR', 'BEAUTY_CARE_HAIR_CARE', ['beauty-and-care', 'hair', 'care']),
    new NavigationItem('BEAUTY_CARE_HAIR', 'BEAUTY_CARE_HAIR_STYLING', ['beauty-and-care', 'hair', 'styling']),
    new NavigationItem('BEAUTY_CARE', 'BEAUTY_CARE_HEALTH', ['beauty-and-care', 'health', '']),
    new NavigationItem('BEAUTY_CARE_HEALTH', 'BEAUTY_CARE_HEALTH_NUTRITIALSUPPLEMENTS', ['beauty-and-care', 'health', 'nutritional-supplements']),
    new NavigationItem('BEAUTY_CARE_HEALTH', 'BEAUTY_CARE_HEALTH_PAINKILLERS', ['beauty-and-care', 'health', 'painkillers']),
    new NavigationItem('BEAUTY_CARE', 'BEAUTY_CARE_MAKEUP', ['beauty-and-care', 'makeup', '']),
    new NavigationItem('BEAUTY_CARE_MAKEUP', 'BEAUTY_CARE_MAKEUP_EYES', ['beauty-and-care', 'makeup', 'eyes']),
    new NavigationItem('BEAUTY_CARE_MAKEUP', 'BEAUTY_CARE_MAKEUP_LIPS', ['beauty-and-care', 'makeup', 'lips']),
    new NavigationItem('BEAUTY_CARE', 'BEAUTY_CARE_SKIN_CARE', ['beauty-and-care', 'skin-care', '']),
    new NavigationItem('BEAUTY_CARE_SKIN_CARE', 'BEAUTY_CARE_SKIN_CARE_FACE_CARE', ['beauty-and-care', 'skin-care', 'face-care']),
    new NavigationItem('BEAUTY_CARE_SKIN_CARE', 'BEAUTY_CARE_SKIN_CARE_KIDS', ['beauty-and-care', 'skin-care', 'kids']),

    new NavigationItem('ALL', 'HOME', ['home', '', ''], 10)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('HOME', 'HOME_ACCESSOIRES', ['home', 'accessoires', '']),
    new NavigationItem('HOME_ACCESSOIRES', 'HOME_ACCESSOIRES_BEDCOVERS', ['home', 'accessoires', 'bed-covers']),
    new NavigationItem('HOME_ACCESSOIRES', 'HOME_ACCESSOIRES_CARPETS', ['home', 'accessoires', 'carpets']),
    new NavigationItem('HOME_ACCESSOIRES', 'HOME_ACCESSOIRES_DECORATIONS', ['home', 'accessoires', 'decorations']),
    new NavigationItem('HOME_ACCESSOIRES', 'HOME_ACCESSOIRES_PILLOWS', ['home', 'accessoires', 'pillows']),
    new NavigationItem('HOME', 'HOME_CLEANING', ['home', 'cleaning', '']),
    new NavigationItem('HOME_CLEANING', 'HOME_CLEANING_LAUNDRYDETERGENT', ['home', 'cleaning', 'laundry-detergent']),
    new NavigationItem('HOME', 'HOME_COOKINGANDBAKING', ['home', 'cooking-and-baking', '']),
    new NavigationItem('HOME_COOKINGANDBAKING', 'HOME_COOKINGANDBAKING_BAKINGSUPPLIES', ['home', 'cooking-and-baking', 'baking-supplies']),
    new NavigationItem('HOME', 'HOME_FURNITURE', ['home', 'furniture', '']),
    new NavigationItem('HOME_FURNITURE', 'HOME_FURNITURE_BEDS', ['home', 'furniture', 'beds']),
    new NavigationItem('HOME_FURNITURE', 'HOME_FURNITURE_DININGTABLES', ['home', 'furniture', 'dining-tables']),
    new NavigationItem('HOME_FURNITURE', 'HOME_FURNITURE_GAMINGCHAIRS', ['home', 'furniture', 'gaming-chairs']),
    new NavigationItem('HOME_FURNITURE', 'HOME_FURNITURE_KIDSBEDS', ['home', 'furniture', 'kids-beds']),
    new NavigationItem('HOME_FURNITURE', 'HOME_FURNITURE_OFFICECHAIRS', ['home', 'furniture', 'office-chairs']),
    new NavigationItem('HOME_FURNITURE', 'HOME_FURNITURE_SOFAS', ['home', 'furniture', 'sofas']),
    new NavigationItem('HOME', 'HOME_GARDEN', ['home', 'garden', '']),
    new NavigationItem('HOME_GARDEN', 'HOME_GARDEN_DECORATIONS', ['home', 'garden', 'decorations']),
    new NavigationItem('HOME_GARDEN', 'HOME_GARDEN_GARDENHOUSES', ['home', 'garden', 'garden-houses']),
    new NavigationItem('HOME_GARDEN', 'HOME_GARDEN_GRILLS', ['home', 'garden', 'grills']),
    new NavigationItem('HOME_GARDEN', 'HOME_GARDEN_LAWNMOWERS', ['home', 'garden', 'lawnmowers']),
    new NavigationItem('HOME_GARDEN', 'HOME_GARDEN_LEAFBLOWERS', ['home', 'garden', 'leafblowers']),
    new NavigationItem('HOME_GARDEN', 'HOME_GARDEN_LOUNGEFURNITURE', ['home', 'garden', 'lounge-furniture']),
    new NavigationItem('HOME_GARDEN', 'HOME_GARDEN_SPORTS', ['home', 'garden', 'sports']),
    new NavigationItem('HOME', 'HOME_PETS', ['home', 'pets', '']),
    new NavigationItem('HOME_PETS', 'HOME_PETS_CATS', ['home', 'pets', 'cats']),
    new NavigationItem('HOME_PETS', 'HOME_PETS_DOGS', ['home', 'pets', 'dogs']),
    new NavigationItem('HOME', 'HOME_WELLNESS', ['home', 'wellness', '']),
    new NavigationItem('HOME_WELLNESS', 'HOME_WELLNESS_SAUNAS', ['home', 'wellness', 'saunas']),
    new NavigationItem('HOME_WELLNESS', 'HOME_WELLNESS_WHIRLPOOLS', ['home', 'wellness', 'whirlpools']),

    new NavigationItem('ALL', 'VEHICLES', ['vehicles', '', ''], 11)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('VEHICLES', 'VEHICLES_BICYCLES', ['vehicles', 'bicycles', '']),
    new NavigationItem('VEHICLES_BICYCLES', 'VEHICLES_BICYCLES_CITYBIKES', ['vehicles', 'bicycles', 'city-bikes']),
    new NavigationItem('VEHICLES_BICYCLES', 'VEHICLES_BICYCLES_ELECTRICBIKES', ['vehicles', 'bicycles', 'electric-bikes']),
    new NavigationItem('VEHICLES_BICYCLES', 'VEHICLES_BICYCLES_KIDSBIKES', ['vehicles', 'bicycles', 'kids-bikes']),
    new NavigationItem('VEHICLES', 'VEHICLES_CARS', ['vehicles', 'cars', '']),
    new NavigationItem('VEHICLES_CARS', 'VEHICLES_CARS_CHILDSEATS', ['vehicles', 'cars', 'child-seats']),
    new NavigationItem('VEHICLES_CARS', 'VEHICLES_CARS_SUMMERTYRES', ['vehicles', 'cars', 'summer-tyres']),
    new NavigationItem('VEHICLES_CARS', 'VEHICLES_CARS_WINTERTYRES', ['vehicles', 'cars', 'winter-tyres']),
    new NavigationItem('VEHICLES_CARS', 'VEHICLES_CARS_ALLWEATHERTYRES', ['vehicles', 'cars', 'all-weather-tyres']),
    new NavigationItem('VEHICLES', 'VEHICLES_MOTORCYCLES', ['vehicles', 'motorcycles', '']),
    new NavigationItem('VEHICLES_MOTORCYCLES', 'VEHICLES_MOTORCYCLES_MOTORBIKES', ['vehicles', 'motorcycles', 'motor-bikes']),
    new NavigationItem('VEHICLES_MOTORCYCLES', 'VEHICLES_MOTORCYCLES_QUADS', ['vehicles', 'motorcycles', 'quads']),
    new NavigationItem('VEHICLES', 'VEHICLES_SCOOTERS', ['vehicles', 'scooters', '']),
    new NavigationItem('VEHICLES_SCOOTERS', 'VEHICLES_SCOOTERS_ELECTRICALSCOOTERS', ['vehicles', 'scooters', 'e-scooters']),

    new NavigationItem('ALL', 'SPORTS', ['sports', '', ''], 12)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('SPORTS', 'SPORTS_BALLSPORTS', ['sports', 'ballsports', '']),
    new NavigationItem('SPORTS_BALLSPORTS', 'SPORTS_BALLSPORTS_SOCCER', ['sports', 'ballsports', 'soccer']),
    new NavigationItem('SPORTS', 'SPORTS_CLIMBING', ['sports', 'climbing', '']),
    new NavigationItem('SPORTS_CLIMBING', 'SPORTS_CLIMBING_BACKPACKS', ['sports', 'climbing', 'backpacks']),
    new NavigationItem('SPORTS_CLIMBING', 'SPORTS_CLIMBING_HELMETS', ['sports', 'climbing', 'helmets']),
    new NavigationItem('SPORTS_CLIMBING', 'SPORTS_CLIMBING_SHOES', ['sports', 'climbing', 'shoes']),
    new NavigationItem('SPORTS_CLIMBING', 'SPORTS_CLIMBING_SUNGLASSES', ['sports', 'climbing', 'sunglasses']),
    new NavigationItem('SPORTS', 'SPORTS_EXERCISE', ['sports', 'exercise', '']),
    new NavigationItem('SPORTS_EXERCISE', 'SPORTS_EXERCISE_EQUIPMENT', ['sports', 'exercise', 'equipment']),
    new NavigationItem('SPORTS', 'SPORTS_TABLESPORTS', ['sports', 'tablesports', '']),
    new NavigationItem('SPORTS_TABLESPORTS', 'SPORTS_TABLESPORTS_BILLARD', ['sports', 'tablesports', 'billard']),
    new NavigationItem('SPORTS_TABLESPORTS', 'SPORTS_TABLESPORTS_TABLESOCCER', ['sports', 'tablesports', 'tablesoccer']),
    new NavigationItem('SPORTS_TABLESPORTS', 'SPORTS_TABLESPORTS_TABLETENNIS', ['sports', 'tablesports', 'tabletennis']),

    new NavigationItem('ALL', 'GROCERIES', ['groceries', '', ''], 13)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('GROCERIES', 'GROCERIES_DRINKS', ['groceries', 'drinks', '']),
    new NavigationItem('GROCERIES_DRINKS', 'GROCERIES_DRINKS_BEER', ['groceries', 'drinks', 'beer']),
    new NavigationItem('GROCERIES_DRINKS', 'GROCERIES_DRINKS_CHAMPAIGN', ['groceries', 'drinks', 'champaign']),
    new NavigationItem('GROCERIES_DRINKS', 'GROCERIES_DRINKS_COFFEE', ['groceries', 'drinks', 'coffee']),
    new NavigationItem('GROCERIES_DRINKS', 'GROCERIES_DRINKS_SPARKLINGWINE', ['groceries', 'drinks', 'sparkling-wine']),
    new NavigationItem('GROCERIES_DRINKS', 'GROCERIES_DRINKS_TEA', ['groceries', 'drinks', 'tea']),
    new NavigationItem('GROCERIES_DRINKS', 'GROCERIES_DRINKS_WINE', ['groceries', 'drinks', 'wine']),
    new NavigationItem('GROCERIES', 'GROCERIES_FOOD', ['groceries', 'food', '']),
    new NavigationItem('GROCERIES_FOOD', 'GROCERIES_FOOD_DRYFRUITS', ['groceries', 'food', 'dry-fruits']),
    new NavigationItem('GROCERIES_FOOD', 'GROCERIES_FOOD_NUTS', ['groceries', 'food', 'nuts']),
    new NavigationItem('GROCERIES_FOOD', 'GROCERIES_FOOD_OILSVINEGAR', ['groceries', 'food', 'oils-and-vinegar']),
    new NavigationItem('GROCERIES_FOOD', 'GROCERIES_FOOD_SAUCES', ['groceries', 'food', 'sauces']),
    new NavigationItem('GROCERIES_FOOD', 'GROCERIES_FOOD_SPICES', ['groceries', 'food', 'spices']),

    new NavigationItem('ALL', 'DIY', ['diy', '', ''], 14)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('DIY', 'DIY_BUILDANDRENOVATE', ['diy', 'build-and-renovate', '']),
    new NavigationItem('DIY_BUILDANDRENOVATE', 'DIY_BUILDANDRENOVATE_DOORS', ['diy', 'build-and-renovate', 'doors']),
    new NavigationItem('DIY_BUILDANDRENOVATE', 'DIY_BUILDANDRENOVATE_TILES', ['diy', 'build-and-renovate', 'tiles']),
    new NavigationItem('DIY_BUILDANDRENOVATE', 'DIY_BUILDANDRENOVATE_WALLPAINT', ['diy', 'build-and-renovate', 'wallpaint']),
    new NavigationItem('DIY', 'DIY_SEW', ['diy', 'sew', '']),
    new NavigationItem('DIY_SEW', 'DIY_SEW_FABRICS', ['diy', 'sew', 'fabrics']),
    new NavigationItem('DIY', 'DIY_TOOLS', ['diy', 'tools', '']),
    new NavigationItem('DIY_TOOLS', 'DIY_TOOLS_DRILLINGMACHINES', ['diy', 'tools', 'drilling-machines']),
    new NavigationItem('DIY_TOOLS', 'DIY_TOOLS_ELECTRICSAWS', ['diy', 'tools', 'electric-saws'])
  ];

  public static getAllRootItems(): Array<NavigationItem> {
    const rootItems = this.ITEMS.filter(item => 'ALL' === item.fromId);
    rootItems.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    return rootItems;
  }

  public static getDeepestLevelItems(): Array<NavigationItem> {
    return this.ITEMS.filter(item => 0 === (item.pathParts || []).filter(pathPart => '' === pathPart).length);
  }

  public static getNavigationItemByToId(toId: string): NavigationItem | undefined {
    const items = this.ITEMS.filter(item => toId === item.toId);
    return items && items.length ? items[0] : undefined;
  }

  public static getNextLevelNavigationItemsFrom(item: NavigationItem | undefined): Array<NavigationItem> {
    if (!item) {
      return [];
    }

    return this.ITEMS
      .filter(navigationItem => item.toId === navigationItem.fromId);
  }

  public static getAllSubsequentNavigationIdsByItem(item: NavigationItem | undefined): Array<string> {
    let navigationIds: Array<string> = []

    const nextLevelItems: Array<NavigationItem> = this.getNextLevelNavigationItemsFrom(item);
    nextLevelItems?.forEach(nextLevelItem => {
      navigationIds.push(nextLevelItem.toId);
      navigationIds = navigationIds.concat(this.getAllSubsequentNavigationIdsByItem(nextLevelItem))
    });

    return navigationIds;
  }

  public static getTeaserIdForNavigationItem(item: NavigationItem | undefined): string {
    if (!item) {
      return '';
    }

    if (item.hasTeaser) {
      return `NAVIGATION_TEASER_${item.toId}`;
    }

    let levelItem = this.ITEMS.find(i => i.toId === item.fromId);
    if (levelItem?.hasTeaser) {
      return `NAVIGATION_TEASER_${levelItem.toId}`;
    }

    while (levelItem && levelItem.fromId !== 'ALL') {
      levelItem = this.ITEMS.find(i => i.toId === levelItem?.fromId);
      if (levelItem?.hasTeaser) {
        return `NAVIGATION_TEASER_${levelItem.toId}`;
      }
    }

    return '';
  }
}
