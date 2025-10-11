import { NavigationItem } from 'src/app/model/navigation-item';

export class Navigation {

  public static ITEMS: NavigationItem[] = [
    new NavigationItem('', 'ALL', ['', '', '']),

    new NavigationItem('ALL', 'FASHION', ['mode', '', ''], 1)
      .setHasSlogan(true)
      .setHasTeaser(true),

    new NavigationItem('FASHION', 'FASHION_BOYS', ['fashion', 'boys', '']),
    new NavigationItem('FASHION', 'FASHION_BOYS', ['bio-kinderkleidung', '', ''])
      .setPathPartsForNavigation(['fashion', 'boys', ''])
      .setSearchPattern('bio'),
    new NavigationItem('FASHION', 'FASHION_BOYS', ['uv-kleidung-für-kinder', '', ''])
      .setPathPartsForNavigation(['fashion', 'boys', ''])
      .setSearchPattern('uv'),
    new NavigationItem('FASHION', 'FASHION_BOYS', ['sommerkleidung-für-jungen', '', ''])
      .setPathPartsForNavigation(['fashion', 'boys', ''])
      .setSearchPattern('sommer'),
    new NavigationItem('FASHION_BOYS', 'FASHION_BOYS_DISGUISES', ['fashion', 'boys', 'disguises']),
    new NavigationItem('FASHION_BOYS', 'FASHION_BOYS_HATS', ['fashion', 'boys', 'hats']),
    new NavigationItem('FASHION_BOYS', 'FASHION_BOYS_RAINWEAR', ['fashion', 'boys', 'rainwear']),
    new NavigationItem('FASHION_BOYS', 'FASHION_BOYS_SHOES', ['fashion', 'boys', 'shoes']),
    new NavigationItem('FASHION_BOYS', 'FASHION_BOYS_SWEATERS_AND_KNITWEAR', ['fashion', 'boys', 'sweaters-and-knitwear']),
    new NavigationItem('FASHION_BOYS', 'FASHION_BOYS_SWIMWEAR', ['fashion', 'boys', 'swimwear']),
    new NavigationItem('FASHION', 'FASHION_GIRLS', ['fashion', 'girls', '']),
    new NavigationItem('FASHION', 'FASHION_GIRLS', ['sommerkleidung-für-mädchen', '', ''])
      .setPathPartsForNavigation(['fashion', 'girls', ''])
      .setSearchPattern('sommer'),
    new NavigationItem('FASHION_GIRLS', 'FASHION_GIRLS_DISGUISES', ['fashion', 'girls', 'disguises']),
    new NavigationItem('FASHION_GIRLS', 'FASHION_GIRLS_RAINWEAR', ['fashion', 'girls', 'rainwear']),
    new NavigationItem('FASHION_GIRLS', 'FASHION_GIRLS_SHOES', ['fashion', 'girls', 'shoes']),
    new NavigationItem('FASHION_GIRLS', 'FASHION_GIRLS_SWEATERS_AND_KNITWEAR', ['fashion', 'girls', 'sweaters-and-knitwear']),
    new NavigationItem('FASHION_GIRLS', 'FASHION_GIRLS_SWIMWEAR', ['fashion', 'girls', 'swimwear']),

    new NavigationItem('FASHION', 'FASHION_WOMEN', ['mode', 'damenmode', ''])
      .setHasSlogan(true),

    new NavigationItem('FASHION', 'FASHION_WOMEN', ['sommerkleidung-für-frauen', '', ''])
      .setPathPartsForNavigation(['fashion', 'women', ''])
      .setSearchPattern('sommer'),
    new NavigationItem('FASHION', 'FASHION_WOMEN', ['sportkleidung-für-frauen', '', ''])
      .setPathPartsForNavigation(['fashion', 'women', ''])
      .setSearchPattern('sport'),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_BAGS', ['mode', 'damenmode', 'taschen']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_DISGUISES', ['mode', 'damenmode', 'verkleidungen']),
    new NavigationItem(
      'FASHION_WOMEN', 'FASHION_WOMEN_DISGUISES',
      ['aussergewöhnliche-kostüme-damen', '', '']
    )
      .setPathPartsForNavigation(['fashion', 'women', 'disguises'])
      .setSEOId('EXTRAORDINARYWOMENDISGUISES'),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_JACKETS', ['mode', 'damenmode', 'jacken']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_JEANS', ['mode', 'damenmode', 'jeans']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_JEANS', ['schwarze-damen-jeans', '', ''])
      .setPathPartsForNavigation(['fashion', 'women', 'jeans'])
      .setFilters(['1000014'])
      .setSEOId('BLACKWOMENJEANS'),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_JEANS', ['weisse-damen-jeans', '', ''])
      .setPathPartsForNavigation(['fashion', 'women', 'jeans'])
      .setFilters(['1000016'])
      .setSEOId('WHITEWOMENJEANS'),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_JEWELRY', ['mode', 'damenmode', 'schmuck']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_MATERNITYWEAR', ['mode', 'damenmode', 'umstandsmode']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_NIGHTWEAR', ['mode', 'damenmode', 'nachtwäsche']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_PANTS', ['mode', 'damenmode', 'hosen']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_RAINWEAR', ['mode', 'damenmode', 'regenkleidung']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_SHOES', ['mode', 'damenmode', 'schuhe']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_SKIRTS', ['mode', 'damenmode', 'röcke']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_SWEATERS_AND_KNITWEAR', ['mode', 'damenmode', 'pullover-strickwaren']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_SWIMWEAR', ['mode', 'damenmode', 'schwimmkleidung']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_UNDERWEAR', ['mode', 'damenmode', 'unterwäsche']),
    new NavigationItem('FASHION_WOMEN', 'FASHION_WOMEN_WATCHES', ['mode', 'damenmode', 'uhren']),

    new NavigationItem('FASHION', 'FASHION_MEN', ['fashion', 'men', '']).setHasSlogan(true),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_DISGUISES', ['fashion', 'men', 'disguises']),
    new NavigationItem(
      'FASHION_MEN', 'FASHION_MEN_DISGUISES',
      ['aussergewöhnliche-kostüme-herren', '', '']
    )
      .setPathPartsForNavigation(['fashion', 'men', 'disguises'])
      .setSEOId('EXTRAORDINARYMENDISGUISES'),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_EROTICUNDERWEAR', ['fashion', 'men', 'erotic-underwear']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_HATS', ['fashion', 'men', 'hats']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_JACKETS', ['fashion', 'men', 'jackets']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_JEANS', ['fashion', 'men', 'jeans']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_JEWELRY', ['fashion', 'men', 'jewelry']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_NIGHTWEAR', ['fashion', 'men', 'nightwear']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_PANTS', ['fashion', 'men', 'pants']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_RAINWEAR', ['fashion', 'men', 'rainwear']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_SHIRTS', ['fashion', 'men', 'shirts']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_SHOES', ['fashion', 'men', 'shoes']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_SHORTS', ['fashion', 'men', 'shorts']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_UNDERWEAR', ['fashion', 'men', 'underwear']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_SWEATERS_AND_KNITWEAR', ['fashion', 'men', 'sweaters-and-knitwear']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_SWIMWEAR', ['fashion', 'men', 'swimwear']),
    new NavigationItem('FASHION_MEN', 'FASHION_MEN_WATCHES', ['fashion', 'men', 'watches']),

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
    new NavigationItem('ALL', 'KIDS', ['wasserspielzeug-für-kinder', '', ''])
      .setPathPartsForNavigation(['kids', '', ''])
      .setSearchPattern('wasserspielzeug'),
    new NavigationItem('KIDS', 'KIDS_BABIES', ['familie', 'babys', '']),
    new NavigationItem('KIDS_BABIES', 'KIDS_BABIES_DIAPERS', ['familie', 'babys', 'windeln']),
    new NavigationItem('KIDS_BABIES', 'KIDS_BABIES_FOOD', ['familie', 'babys', 'babynahrung']),
    new NavigationItem('KIDS', 'KIDS_BOOKS', ['familie', 'bücher', '']),
    new NavigationItem('KIDS_BOOKS', 'KIDS_BOOKS_AUDIOBOOKS', ['familie', 'bücher', 'hörspiele']),
    new NavigationItem('KIDS_BOOKS', 'KIDS_BOOKS_LEARNINGBOOKS', ['familie', 'bücher', 'lernbücher']),
    new NavigationItem('KIDS_BOOKS', 'KIDS_BOOKS_READINGBOOKS', ['familie', 'bücher', 'lesebücher']),
    new NavigationItem('KIDS', 'KIDS_PARTY', ['familie', 'party', '']).setHasSlogan(true),
    new NavigationItem('KIDS_PARTY', 'KIDS_PARTY_TABLEWARE', ['familie', 'party', 'tischdeko-geschirr']),
    new NavigationItem('KIDS', 'KIDS_SCHOOL', ['familie', 'schule', '']).setHasSlogan(true),
    new NavigationItem('KIDS', 'KIDS_SCHOOL', ['alltagshelfer-für-kinder', '', ''])
      .setPathPartsForNavigation(['familie', 'schule', '']),
    new NavigationItem('KIDS_SCHOOL', 'KIDS_SCHOOL_DRINKINGBOTTLES', ['familie', 'schule', 'trinkflaschen']),
    new NavigationItem('KIDS_SCHOOL', 'KIDS_SCHOOL_LUNCHBOXES', ['familie', 'schule', 'brotdosen']),
    new NavigationItem('KIDS_SCHOOL', 'KIDS_SCHOOL_SATCHEL', ['familie', 'schule', 'schulranzen']),
    new NavigationItem('KIDS_SCHOOL', 'KIDS_SCHOOL_SCHOOLCONES', ['familie', 'schule', 'schultüten']),
    new NavigationItem('KIDS_SCHOOL', 'KIDS_SCHOOL_SUPPLIES', ['familie', 'schule', 'schulausstattung']),
    new NavigationItem('KIDS', 'KIDS_TOYS', ['familie', 'spielzeug', '']).setHasSlogan(true),
    new NavigationItem('KIDS', 'KIDS_TOYS', ['holzspielzeug-für-kinder', '', ''])
      .setPathPartsForNavigation(['familie', 'spielzeug', ''])
      .setSearchPattern('holz'),
    new NavigationItem('KIDS', 'KIDS_TOYS', ['kooperationsspiele-für-kinder', '', ''])
      .setPathPartsForNavigation(['familie', 'spielzeug', ''])
      .setSearchPattern('koop'),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_BABIES', ['familie', 'spielzeug', 'für-babys']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_BEACHANDWATER', ['familie', 'spielzeug', 'strand-wasser']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_CONSTRUCTIONTOYS', ['familie', 'spielzeug', 'bausteine']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_CUDDLYTOYS', ['familie', 'spielzeug', 'kuscheltiere']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_DOLLS', ['familie', 'spielzeug', 'puppen']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_EDUCATIONALTOYS', ['familie', 'spielzeug', 'lernspielzeug']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_GAMES', ['familie', 'spielzeug', 'spiele']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_GYMNASTICSTOYS', ['familie', 'spielzeug', 'beweglichkeitsspiele']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_ELECTRICVEHICLES', ['familie', 'spielzeug', 'elektrische-fahrzeuge']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_EXPERIMENTANDRESEARCH', ['familie', 'spielzeug', 'experimentieren-forschen']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_FIGURES', ['familie', 'spielzeug', 'figuren']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_SCOOTERS', ['familie', 'spielzeug', 'scooter']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_TOYVEHICLES', ['familie', 'spielzeug', 'spielzeug-fahrzeuge']),
    new NavigationItem('KIDS_TOYS', 'KIDS_TOYS_TRADINGCARDS', ['familie', 'spielzeug', 'sammelkarten']),

    new NavigationItem('ALL', 'MULTIMEDIA', ['multimedia', '', ''], 4)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('MULTIMEDIA', 'MULTIMEDIA_ART', ['multimedia', 'art', '']),
    new NavigationItem('MULTIMEDIA_ART', 'MULTIMEDIA_ART_POSTERSANDPICTURES', ['multimedia', 'art', 'pictures-and-posters']),
    new NavigationItem('MULTIMEDIA', 'MULTIMEDIA_BOOKS', ['multimedia', 'books', '']).setHasSlogan(true),
    new NavigationItem('MULTIMEDIA_BOOKS', 'MULTIMEDIA_BOOKS_COMICS', ['multimedia', 'books', 'comics']),
    new NavigationItem('MULTIMEDIA_BOOKS', 'MULTIMEDIA_BOOKS_CRIMETHRILLERS', ['multimedia', 'books', 'crime-and-thrillers']),
    new NavigationItem('MULTIMEDIA_BOOKS', 'MULTIMEDIA_BOOKS_FANTASY', ['multimedia', 'books', 'fantasy']),
    new NavigationItem('MULTIMEDIA_BOOKS', 'MULTIMEDIA_BOOKS_HISTORY', ['multimedia', 'books', 'history']),
    new NavigationItem('MULTIMEDIA_BOOKS', 'MULTIMEDIA_BOOKS_MANGAS', ['multimedia', 'books', 'mangas']),
    new NavigationItem('MULTIMEDIA_BOOKS', 'MULTIMEDIA_BOOKS_NUTRITION', ['multimedia', 'books', 'nutrition']),
    new NavigationItem('MULTIMEDIA_BOOKS', 'MULTIMEDIA_BOOKS_PHILOSOPHY', ['multimedia', 'books', 'philosophy']),
    new NavigationItem('MULTIMEDIA_BOOKS', 'MULTIMEDIA_BOOKS_SCHOOLBOOKS', ['multimedia', 'books', 'school-books']),
    new NavigationItem('MULTIMEDIA_BOOKS', 'MULTIMEDIA_BOOKS_SCIENCEFICTION', ['multimedia', 'books', 'science-fiction']),
    new NavigationItem('MULTIMEDIA', 'MULTIMEDIA_GAMES', ['multimedia', 'games', '']).setHasSlogan(true),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_NINTENDODS', ['multimedia', 'games', 'nintendo-ds']),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_NINTENDO_SWITCH', ['multimedia', 'games', 'nintendo-switch']),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_PC', ['multimedia', 'games', 'pc']),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_PLAYSTATION_5', ['multimedia', 'games', 'playstation-5']),
    new NavigationItem(
      'MULTIMEDIA_GAMES',
      'MULTIMEDIA_GAMES_PLAYSTATION_5',
      ['playstation-5-shooter', '', '']
    )
      .setFilters(['1000205'])
      .setPathPartsForNavigation(['multimedia', 'games', 'playstation-5'])
      .setSEOId('PLAYSTATION5SHOOTER'),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_PLAYSTATION_4', ['multimedia', 'games', 'playstation-4']),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_XBOX_ONE', ['multimedia', 'games', 'xbox-one']),
    new NavigationItem('MULTIMEDIA_GAMES', 'MULTIMEDIA_GAMES_XBOX_360', ['multimedia', 'games', 'xbox-360']),
    new NavigationItem('MULTIMEDIA', 'MULTIMEDIA_MOVIES', ['multimedia', 'movies', '']),
    new NavigationItem('MULTIMEDIA_MOVIES', 'MULTIMEDIA_MOVIES_ACTION', ['multimedia', 'movies', 'action']),
    new NavigationItem('MULTIMEDIA_MOVIES', 'MULTIMEDIA_MOVIES_ANIME', ['multimedia', 'movies', 'anime']),
    new NavigationItem('MULTIMEDIA_MOVIES', 'MULTIMEDIA_MOVIES_FANTASY', ['multimedia', 'movies', 'fantasy']),

    new NavigationItem('ALL', 'ELECTRONICS_AND_COMPUTERS', ['technik', '', ''], 3)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('ALL', 'ELECTRONICS_AND_COMPUTERS', ['saugroboter', '', ''])
      .setPathPartsForNavigation(['technik', '', ''])
      .setSearchPattern('saugroboter'),
    new NavigationItem('ALL', 'ELECTRONICS_AND_COMPUTERS', ['refurbished-technik', '', ''])
      .setPathPartsForNavigation(['technik', '', ''])
      .setFilters(['1000020']),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS',
      'ELECTRONICS_AND_COMPUTERS_CABLES',
      ['technik', 'kabel', '']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_CABLES',
      'ELECTRONICS_AND_COMPUTERS_CABLES_AUDIOCABLES',
      ['technik', 'kabel', 'audio-kabel']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_CABLES',
      'ELECTRONICS_AND_COMPUTERS_CABLES_ELECTRICCABLES',
      ['technik', 'kabel', 'elektrische-kabel']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_CABLES',
      'ELECTRONICS_AND_COMPUTERS_CABLES_DISPLAYCABLES',
      ['technik', 'kabel', 'video-kabel']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_CABLES',
      'ELECTRONICS_AND_COMPUTERS_CABLES_NETWORKCABLES',
      ['technik', 'kabel', 'netzwerk-kabel']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS',
      'ELECTRONICS_AND_COMPUTERS_CAMERAS',
      ['technik', 'kameras', '']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_CAMERAS',
      'ELECTRONICS_AND_COMPUTERS_CAMERAS_CAMERAOBJECTIVES',
      ['technik', 'kameras', 'kamera-objektive']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_CAMERAS',
      'ELECTRONICS_AND_COMPUTERS_CAMERAS_CAMERASUPPLEMENTS',
      ['technik', 'kameras', 'kamera-zubehör']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_CAMERAS',
      'ELECTRONICS_AND_COMPUTERS_CAMERAS_SLRCAMERAS',
      ['technik', 'kameras', 'spiegelreflex-kameras']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_CAMERAS',
      'ELECTRONICS_AND_COMPUTERS_CAMERAS_SYSTEMCAMERAS',
      ['technik', 'kameras', 'system-kameras']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS',
      'ELECTRONICS_AND_COMPUTERS_COMPUTERS',
      ['technik', 'computer', '']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_COMPUTERS',
      'ELECTRONICS_AND_COMPUTERS_COMPUTERS_LAPTOPS',
      ['technik', 'computer', 'laptops']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_COMPUTERS',
      'ELECTRONICS_AND_COMPUTERS_COMPUTERS_TABLETS',
      ['technik', 'computer', 'tablets']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS',
      'ELECTRONICS_AND_COMPUTERS_EROTIC',
      ['technik', 'erotik', '']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_EROTIC',
      'ELECTRONICS_AND_COMPUTERS_EROTIC_VIBRATORS',
      ['technik', 'erotik', 'vibratoren']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_EROTIC',
      'ELECTRONICS_AND_COMPUTERS_EROTIC_VIBRATORS',
      ['toys-für-frauen', '', '']
    )
      .setPathPartsForNavigation(['technik', 'erotik', 'vibratoren'])
      .setFilters(['1000255'])
      .setSEOId('TOYSFORHER'),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_EROTIC',
      'ELECTRONICS_AND_COMPUTERS_EROTIC_VIBRATORS',
      ['toys-für-paare', '', '']
    )
      .setPathPartsForNavigation(['technik', 'erotik', 'vibratoren'])
      .setFilters(['1000255'])
      .setSEOId('TOYSFORCOUPLES'),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS',
      'ELECTRONICS_AND_COMPUTERS_HOME',
      ['technik', 'wohnen', '']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_HOME',
      'ELECTRONICS_AND_COMPUTERS_HOME_AIRPURIFIERS',
      ['technik', 'wohnen', 'luftreiniger']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_HOME',
      'ELECTRONICS_AND_COMPUTERS_HOME_AIRPURIFIERS',
      ['philips-luftreiniger', '', '']
    )
      .setPathPartsForNavigation(['technik', 'wohnen', 'luftreiniger'])
      .setSearchPattern('Philips'),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_HOME',
      'ELECTRONICS_AND_COMPUTERS_HOME_AIRVENTS',
      ['technik', 'wohnen', 'ventilatoren']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_HOME',
      'ELECTRONICS_AND_COMPUTERS_HOME_ESPRESSOMACHINES',
      ['technik', 'wohnen', 'espresso-maschinen']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_HOME',
      'ELECTRONICS_AND_COMPUTERS_HOME_FULLYAUTOMATICCOFFEEMACHINES',
      ['technik', 'wohnen', 'kaffeevollautomaten']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_HOME',
      'ELECTRONICS_AND_COMPUTERS_HOME_HEADPHONES',
      ['technik', 'wohnen', 'kopfhörer']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_HOME',
      'ELECTRONICS_AND_COMPUTERS_HOME_HOMECINEMA',
      ['technik', 'wohnen', 'heimkino']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_HOME',
      'ELECTRONICS_AND_COMPUTERS_HOME_HOMECINEMA',
      ['dein-kino-für-zuhause', '', '']
    )
      .setPathPartsForNavigation(['technik', 'wohnen', 'heimkino']),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_HOME',
      'ELECTRONICS_AND_COMPUTERS_HOME_INKJETPRINTER',
      ['technik', 'wohnen', 'tintenstrahldrucker']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_HOME',
      'ELECTRONICS_AND_COMPUTERS_HOME_LASERPRINTER',
      ['technik', 'wohnen', 'laserdrucker']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_HOME',
      'ELECTRONICS_AND_COMPUTERS_HOME_SOLARSYSTEMS',
      ['technik', 'wohnen', 'solaranlagen']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_HOME',
      'ELECTRONICS_AND_COMPUTERS_HOME_SPEAKERS',
      ['technik', 'wohnen', 'lautsprecher']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_HOME',
      'ELECTRONICS_AND_COMPUTERS_HOME_TVS',
      ['technik', 'wohnen', 'fernseher']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_HOME',
      'ELECTRONICS_AND_COMPUTERS_HOME_VACUUMCLEANERS',
      ['technik', 'wohnen', 'staubsauger']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS',
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES',
      ['technik', 'grossgeräte', '']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES',
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES_DISHWASHERS',
      ['technik', 'grossgeräte', 'geschirrspüler']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES',
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES_DRYERS',
      ['technik', 'grossgeräte', 'trockner']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES',
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES_FRIDGES_AND_FREEZERS',
      ['technik', 'grossgeräte', 'kühlschränke-gefriertruhen']
    ).setHasSlogan(true),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES',
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES_FRIDGES_AND_FREEZERS',
      ['kühlboxen', '', '']
    )
      .setPathPartsForNavigation(['technik', 'grossgeräte', 'kühlschränke-gefriertruhen'])
      .setSearchPattern('kühlbox'),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES',
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES_OVENS',
      ['technik', 'grossgeräte', 'öfen']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES',
      'ELECTRONICS_AND_COMPUTERS_LARGE_APPLIANCES_WASHING_MACHINES',
      ['technik', 'grossgeräte', 'waschmaschinen']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS',
      'ELECTRONICS_AND_COMPUTERS_PHONES',
      ['technik', 'telefone', '']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_PHONES',
      'ELECTRONICS_AND_COMPUTERS_PHONES_SMARTPHONEACCESSORIES',
      ['technik', 'telefone', 'smartphone-zubehör']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_PHONES',
      'ELECTRONICS_AND_COMPUTERS_PHONES_SMARTPHONESCELLPHONES',
      ['technik', 'telefone', 'smartphones']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_PHONES',
      'ELECTRONICS_AND_COMPUTERS_PHONES_SMARTPHONESCELLPHONES',
      ['apple-iphones', '', '']
    )
      .setPathPartsForNavigation(['technik', 'telefone', 'smartphones'])
      .setFilters(['1000087'])
      .setSEOId('APPLEIPHONES'),

    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS',
      'ELECTRONICS_AND_COMPUTERS_WEARABLES',
      ['technik', 'wearables', '']
    ),
    new NavigationItem(
      'ELECTRONICS_AND_COMPUTERS_WEARABLES',
      'ELECTRONICS_AND_COMPUTERS_WEARABLES_SMARTWATCHES',
      ['technik', 'wearables', 'smartwatches']
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
    new NavigationItem('MUSIC_CD', 'MUSIC_CD_ROCKANDROLL', ['music', 'cd', 'rock-and-roll']),
    new NavigationItem('MUSIC', 'MUSIC_INSTRUMENTS', ['music', 'instruments', '']),
    new NavigationItem('MUSIC_INSTRUMENTS', 'MUSIC_INSTRUMENTS_GUITARS', ['music', 'instruments', 'guitars']),
    new NavigationItem('MUSIC_INSTRUMENTS', 'MUSIC_INSTRUMENTS_MIXINGPANELS', ['music', 'instruments', 'mixing-panels']),
    new NavigationItem('MUSIC_INSTRUMENTS', 'MUSIC_INSTRUMENTS_PIANOS', ['music', 'instruments', 'pianos']),

    new NavigationItem('ALL', 'BEAUTY_CARE', ['schönheit-und-pflege', '', ''], 8)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('ALL', 'BEAUTY_CARE', ['sonnencreme', '', ''])
      .setPathPartsForNavigation(['schönheit-und-pflege', '', ''])
      .setSearchPattern('Sonne'),
    new NavigationItem('BEAUTY_CARE', 'BEAUTY_CARE_BODYCARE', ['schönheit-und-pflege', 'körperpflege', '']),
    new NavigationItem('BEAUTY_CARE_BODYCARE', 'BEAUTY_CARE_BODYCARE_SOAP', ['schönheit-und-pflege', 'körperpflege', 'seife']),
    new NavigationItem('BEAUTY_CARE', 'BEAUTY_CARE_EROTIC', ['schönheit-und-pflege', 'erotik', '']),
    new NavigationItem('BEAUTY_CARE_EROTIC', 'BEAUTY_CARE_EROTIC_MASSAGES', ['schönheit-und-pflege', 'erotik', 'massage']),
    new NavigationItem('BEAUTY_CARE', 'BEAUTY_CARE_FRAGRANCES', ['schönheit-und-pflege', 'düfte', '']),
    new NavigationItem('BEAUTY_CARE_FRAGRANCES', 'BEAUTY_CARE_FRAGRANCES_MEN', ['schönheit-und-pflege', 'düfte', 'für-männer']),
    new NavigationItem('BEAUTY_CARE_FRAGRANCES', 'BEAUTY_CARE_FRAGRANCES_UNISEX', ['schönheit-und-pflege', 'düfte', 'unisex']),
    new NavigationItem('BEAUTY_CARE_FRAGRANCES', 'BEAUTY_CARE_FRAGRANCES_WOMEN', ['schönheit-und-pflege', 'düfte', 'für-frauen']),
    new NavigationItem('BEAUTY_CARE', 'BEAUTY_CARE_HAIR', ['schönheit-und-pflege', 'haarpflege', '']),
    new NavigationItem('BEAUTY_CARE_HAIR', 'BEAUTY_CARE_HAIR_CARE', ['schönheit-und-pflege', 'haare', 'haarpflege']),
    new NavigationItem('BEAUTY_CARE_HAIR', 'BEAUTY_CARE_HAIR_HAIRREMOVERS', ['schönheit-und-pflege', 'haare', 'haarentfernung']),
    new NavigationItem('BEAUTY_CARE_HAIR', 'BEAUTY_CARE_HAIR_SHAVERS', ['schönheit-und-pflege', 'haare', 'rasierer']),
    new NavigationItem('BEAUTY_CARE_HAIR', 'BEAUTY_CARE_HAIR_STYLING', ['schönheit-und-pflege', 'haare', 'styling']),
    new NavigationItem('BEAUTY_CARE', 'BEAUTY_CARE_HEALTH', ['schönheit-und-pflege', 'gesundheit', '']),
    new NavigationItem('BEAUTY_CARE_HEALTH', 'BEAUTY_CARE_HEALTH_NUTRITIALSUPPLEMENTS', ['schönheit-und-pflege', 'gesundheit', 'nahrungsergänzung']),
    new NavigationItem('BEAUTY_CARE_HEALTH', 'BEAUTY_CARE_HEALTH_ORALHYGIENE', ['schönheit-und-pflege', 'gesundheit', 'mundhygiene']),
    new NavigationItem('BEAUTY_CARE_HEALTH', 'BEAUTY_CARE_HEALTH_PAINKILLERS', ['schönheit-und-pflege', 'gesundheit', 'schmerzmittel']),
    new NavigationItem('BEAUTY_CARE', 'BEAUTY_CARE_MAKEUP', ['schönheit-und-pflege', 'makeup', '']),
    new NavigationItem('BEAUTY_CARE_MAKEUP', 'BEAUTY_CARE_MAKEUP_EYES', ['schönheit-und-pflege', 'makeup', 'augen']),
    new NavigationItem('BEAUTY_CARE_MAKEUP', 'BEAUTY_CARE_MAKEUP_LIPS', ['schönheit-und-pflege', 'makeup', 'lippen']),
    new NavigationItem('BEAUTY_CARE', 'BEAUTY_CARE_SLEEP', ['schönheit-und-pflege', 'schlaf', '']),
    new NavigationItem('BEAUTY_CARE_SLEEP', 'BEAUTY_CARE_SLEEP_SLEEPAIDS', ['schönheit-und-pflege', 'schlaf', 'schlafhilfen']),
    new NavigationItem('BEAUTY_CARE', 'BEAUTY_CARE_SKIN_CARE', ['schönheit-und-pflege', 'haut', '']),
    new NavigationItem('BEAUTY_CARE_SKIN_CARE', 'BEAUTY_CARE_SKIN_CARE_FACE_CARE', ['schönheit-und-pflege', 'hautpflege', 'gesichtspflege']),
    new NavigationItem('BEAUTY_CARE_SKIN_CARE', 'BEAUTY_CARE_SKIN_CARE_HANDCARE', ['schönheit-und-pflege', 'hautpflege', 'handpflege']),
    new NavigationItem('BEAUTY_CARE_SKIN_CARE', 'BEAUTY_CARE_SKIN_CARE_KIDS', ['schönheit-und-pflege', 'hautpflege', 'für-kinder']),

    new NavigationItem('ALL', 'HOME', ['wohnen', '', ''], 10)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('HOME', 'HOME_ACCESSOIRES', ['wohnen', 'accessoires', '']),
    new NavigationItem('HOME_ACCESSOIRES', 'HOME_ACCESSOIRES_BEDCOVERS', ['wohnen', 'accessoires', 'bettbezüge']),
    new NavigationItem('HOME_ACCESSOIRES', 'HOME_ACCESSOIRES_CARPETS', ['wohnen', 'accessoires', 'teppiche']),
    new NavigationItem('HOME_ACCESSOIRES', 'HOME_ACCESSOIRES_CUPS', ['wohnen', 'accessoires', 'tassen']),
    new NavigationItem('HOME_ACCESSOIRES', 'HOME_ACCESSOIRES_DECORATIONS', ['wohnen', 'accessoires', 'dekoration']),
    new NavigationItem('HOME_ACCESSOIRES', 'HOME_ACCESSOIRES_DECORATIONS', ['herbstdeko', '', ''])
      .setPathPartsForNavigation(['wohnen', 'accessoires', 'dekoration'])
      .setSearchPattern('Herbst'),
    new NavigationItem('HOME_ACCESSOIRES', 'HOME_ACCESSOIRES_MATTRESSES', ['wohnen', 'accessoires', 'matratzen']),
    new NavigationItem('HOME_ACCESSOIRES', 'HOME_ACCESSOIRES_PILLOWS', ['wohnen', 'accessoires', 'kissen']),
    new NavigationItem('HOME', 'HOME_CLEANING', ['wohnen', 'reinigen', '']),
    new NavigationItem('HOME_CLEANING', 'HOME_CLEANING_LAUNDRYDETERGENT', ['wohnen', 'reinigen', 'waschmittel']),
    new NavigationItem('HOME', 'HOME_COOKINGANDBAKING', ['wohnen', 'kochen-backen', '']),
    new NavigationItem('HOME_COOKINGANDBAKING', 'HOME_COOKINGANDBAKING_BAKINGSUPPLIES', ['wohnen', 'kochen-backen', 'backzubehör']),
    new NavigationItem('HOME_COOKINGANDBAKING', 'HOME_COOKINGANDBAKING_KITCHENACCESSORIES', ['wohnen', 'kochen-backen', 'küchenausstattung']),
    new NavigationItem('HOME', 'HOME_FURNITURE', ['wohnen', 'möbel', '']),
    new NavigationItem('HOME_FURNITURE', 'HOME_FURNITURE_BEDS', ['wohnen', 'möbel', 'betten']),
    new NavigationItem('HOME_FURNITURE', 'HOME_FURNITURE_DININGTABLES', ['wohnen', 'möbel', 'esstische']),
    new NavigationItem('HOME_FURNITURE', 'HOME_FURNITURE_GAMINGCHAIRS', ['wohnen', 'möbel', 'gaming-stühle']),
    new NavigationItem('HOME_FURNITURE', 'HOME_FURNITURE_KIDSBEDS', ['wohnen', 'möbel', 'kinderbetten']),
    new NavigationItem('HOME_FURNITURE', 'HOME_FURNITURE_KIDSSOFAS', ['wohnen', 'möbel', 'kindersofas']),
    new NavigationItem('HOME_FURNITURE', 'HOME_FURNITURE_OFFICECHAIRS', ['wohnen', 'möbel', 'bürostühle']),
    new NavigationItem('HOME_FURNITURE', 'HOME_FURNITURE_SOFAS', ['wohnen', 'möbel', 'sofas']),
    new NavigationItem('HOME', 'HOME_GARDEN', ['wohnen', 'garten', '']),
    new NavigationItem('HOME_GARDEN', 'HOME_GARDEN_DECORATIONS', ['wohnen', 'garten', 'dekoration']),
    new NavigationItem('HOME_GARDEN', 'HOME_GARDEN_GARDENHOUSES', ['wohnen', 'garten', 'gartenhäuser']),
    new NavigationItem('HOME_GARDEN', 'HOME_GARDEN_GRILLS', ['wohnen', 'garten', 'grills']),
    new NavigationItem('HOME_GARDEN', 'HOME_GARDEN_PLANTS', ['wohnen', 'garten', 'pflanzen']),
    new NavigationItem('HOME_GARDEN', 'HOME_GARDEN_LAWNMOWERS', ['wohnen', 'garten', 'rasenmäher']),
    new NavigationItem('HOME_GARDEN', 'HOME_GARDEN_LEAFBLOWERS', ['wohnen', 'garten', 'laubbläser']),
    new NavigationItem('HOME_GARDEN', 'HOME_GARDEN_LOUNGEFURNITURE', ['wohnen', 'garten', 'lounge-möbel']),
    new NavigationItem('HOME_GARDEN', 'HOME_GARDEN_SPORTS', ['wohnen', 'garten', 'sport']),
    new NavigationItem('HOME', 'HOME_PETS', ['wohnen', 'haustiere', '']),
    new NavigationItem('HOME_PETS', 'HOME_PETS_CATS', ['wohnen', 'haustiere', 'katzen']),
    new NavigationItem('HOME_PETS', 'HOME_PETS_DOGS', ['wohnen', 'haustiere', 'hunde']),
    new NavigationItem('HOME', 'HOME_WELLNESS', ['wohnen', 'wellness', '']),
    new NavigationItem('HOME_WELLNESS', 'HOME_WELLNESS_SAUNAS', ['wohnen', 'wellness', 'saunas']),
    new NavigationItem('HOME_WELLNESS', 'HOME_WELLNESS_WHIRLPOOLS', ['wohnen', 'wellness', 'whirlpools']),

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
    new NavigationItem('VEHICLES', 'VEHICLES_KIDS', ['vehicles', 'kids', '']),
    new NavigationItem('VEHICLES_KIDS', 'VEHICLES_KIDS_HANDCARTS', ['vehicles', 'kids', 'handcarts']),
    new NavigationItem('VEHICLES_KIDS', 'VEHICLES_KIDS_STROLLERS', ['vehicles', 'kids', 'strollers']),
    new NavigationItem('VEHICLES', 'VEHICLES_MOTORCYCLES', ['vehicles', 'motorcycles', '']),
    new NavigationItem('VEHICLES_MOTORCYCLES', 'VEHICLES_MOTORCYCLES_MOTORBIKES', ['vehicles', 'motorcycles', 'motor-bikes']),
    new NavigationItem('VEHICLES_MOTORCYCLES', 'VEHICLES_MOTORCYCLES_QUADS', ['vehicles', 'motorcycles', 'quads']),
    new NavigationItem('VEHICLES', 'VEHICLES_SCOOTERS', ['vehicles', 'scooters', '']),
    new NavigationItem('VEHICLES_SCOOTERS', 'VEHICLES_SCOOTERS_ELECTRICALSCOOTERS', ['vehicles', 'scooters', 'e-scooters']),
    new NavigationItem('VEHICLES_SCOOTERS', 'VEHICLES_SCOOTERS_SELFBALANCINGSCOOTERS', ['vehicles', 'scooters', 'self-balancing-scooters']),

    new NavigationItem('ALL', 'SPORTS', ['sports', '', ''], 12)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('SPORTS', 'SPORTS_BALLSPORTS', ['sports', 'ballsports', '']),
    new NavigationItem('SPORTS_BALLSPORTS', 'SPORTS_BALLSPORTS_SOCCER', ['sports', 'ballsports', 'soccer']),
    new NavigationItem('SPORTS_BALLSPORTS', 'SPORTS_BALLSPORTS_SOCCERSHOES', ['sports', 'ballsports', 'soccer-shoes']),
    new NavigationItem('SPORTS', 'SPORTS_CLIMBING', ['sports', 'climbing', '']),
    new NavigationItem('SPORTS_CLIMBING', 'SPORTS_CLIMBING_BACKPACKS', ['sports', 'climbing', 'backpacks']),
    new NavigationItem('SPORTS_CLIMBING', 'SPORTS_CLIMBING_HELMETS', ['sports', 'climbing', 'helmets']),
    new NavigationItem('SPORTS_CLIMBING', 'SPORTS_CLIMBING_SHOES', ['sports', 'climbing', 'shoes']),
    new NavigationItem('SPORTS_CLIMBING', 'SPORTS_CLIMBING_SUNGLASSES', ['sports', 'climbing', 'sunglasses']),
    new NavigationItem('SPORTS', 'SPORTS_EXERCISE', ['sports', 'exercise', '']),
    new NavigationItem('SPORTS_EXERCISE', 'SPORTS_EXERCISE_EQUIPMENT', ['sports', 'exercise', 'equipment']),
    new NavigationItem('SPORTS_EXERCISE', 'SPORTS_EXERCISE_MULTIGYMS', ['sports', 'exercise', 'multi-gyms']),
    new NavigationItem('SPORTS', 'SPORTS_TABLESPORTS', ['sports', 'tablesports', '']),
    new NavigationItem('SPORTS_TABLESPORTS', 'SPORTS_TABLESPORTS_BILLARD', ['sports', 'tablesports', 'billard']),
    new NavigationItem('SPORTS_TABLESPORTS', 'SPORTS_TABLESPORTS_TABLESOCCER', ['sports', 'tablesports', 'tablesoccer']),
    new NavigationItem('SPORTS_TABLESPORTS', 'SPORTS_TABLESPORTS_TABLETENNIS', ['sports', 'tablesports', 'tabletennis']),

    new NavigationItem('ALL', 'GROCERIES', ['groceries', '', ''], 13)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('GROCERIES', 'GROCERIES_DRINKS', ['groceries', 'drinks', '']),
    new NavigationItem('GROCERIES', 'GROCERIES_DRINKS', ['geschenke-für-kaffeeliebhaber', '', ''])
      .setFilters(['1000209', '1000210'])
      .setPathPartsForNavigation(['groceries', 'drinks', ''])
      .setSEOId('GIFTSFORCOFFELOVERS'),
    new NavigationItem('GROCERIES_DRINKS', 'GROCERIES_DRINKS_BEER', ['groceries', 'drinks', 'beer']),
    new NavigationItem('GROCERIES_DRINKS', 'GROCERIES_DRINKS_CHAMPAIGN', ['groceries', 'drinks', 'champaign']),
    new NavigationItem('GROCERIES_DRINKS', 'GROCERIES_DRINKS_COFFEE', ['groceries', 'drinks', 'coffee']),
    new NavigationItem('GROCERIES_DRINKS', 'GROCERIES_DRINKS_COFFEEACCESSORIES', ['groceries', 'drinks', 'coffee-accessories']),
    new NavigationItem('GROCERIES_DRINKS', 'GROCERIES_DRINKS_SPARKLINGWINE', ['groceries', 'drinks', 'sparkling-wine']),
    new NavigationItem('GROCERIES_DRINKS', 'GROCERIES_DRINKS_SPIRITS', ['groceries', 'drinks', 'spirits']),
    new NavigationItem('GROCERIES_DRINKS', 'GROCERIES_DRINKS_TEA', ['groceries', 'drinks', 'tea']),
    new NavigationItem('GROCERIES_DRINKS', 'GROCERIES_DRINKS_WINE', ['groceries', 'drinks', 'wine']),
    new NavigationItem('GROCERIES', 'GROCERIES_FOOD', ['groceries', 'food', '']),
    new NavigationItem('GROCERIES_FOOD', 'GROCERIES_FOOD_DESSERTS', ['groceries', 'food', 'desserts']),
    new NavigationItem('GROCERIES_FOOD', 'GROCERIES_FOOD_DRYFRUITS', ['groceries', 'food', 'dry-fruits']),
    new NavigationItem('GROCERIES_FOOD', 'GROCERIES_FOOD_MEATSUBSTITUTES', ['groceries', 'food', 'meat-substitutes']),
    new NavigationItem('GROCERIES_FOOD', 'GROCERIES_FOOD_NOODLES', ['groceries', 'food', 'noodles']),
    new NavigationItem('GROCERIES_FOOD', 'GROCERIES_FOOD_NUTS', ['groceries', 'food', 'nuts']),
    new NavigationItem('GROCERIES_FOOD', 'GROCERIES_FOOD_OILSVINEGAR', ['groceries', 'food', 'oils-and-vinegar']),
    new NavigationItem('GROCERIES_FOOD', 'GROCERIES_FOOD_RICE', ['groceries', 'food', 'rice']),
    new NavigationItem('GROCERIES_FOOD', 'GROCERIES_FOOD_SAUCES', ['groceries', 'food', 'sauces']),
    new NavigationItem('GROCERIES_FOOD', 'GROCERIES_FOOD_SNACKS', ['groceries', 'food', 'snacks']),
    new NavigationItem('GROCERIES_FOOD', 'GROCERIES_FOOD_SPICES', ['groceries', 'food', 'spices']),

    new NavigationItem('ALL', 'DIY', ['diy', '', ''], 14)
      .setHasSlogan(true)
      .setHasTeaser(true),
    new NavigationItem('DIY', 'DIY_BUILDANDRENOVATE', ['diy', 'build-and-renovate', '']),
    new NavigationItem('DIY_BUILDANDRENOVATE', 'DIY_BUILDANDRENOVATE_BATHROOM', ['diy', 'build-and-renovate', 'bathroom']),
    new NavigationItem('DIY_BUILDANDRENOVATE', 'DIY_BUILDANDRENOVATE_DOORS', ['diy', 'build-and-renovate', 'doors']),
    new NavigationItem('DIY_BUILDANDRENOVATE', 'DIY_BUILDANDRENOVATE_FLOORACCESSOIRES', ['diy', 'build-and-renovate', 'floor-accessoires']),
    new NavigationItem('DIY_BUILDANDRENOVATE', 'DIY_BUILDANDRENOVATE_LAMINATEFLOOR', ['diy', 'build-and-renovate', 'laminate-floor']),
    new NavigationItem('DIY_BUILDANDRENOVATE', 'DIY_BUILDANDRENOVATE_PARQUETFLOOR', ['diy', 'build-and-renovate', 'parquet-floor']),
    new NavigationItem('DIY_BUILDANDRENOVATE', 'DIY_BUILDANDRENOVATE_RADIATORS', ['diy', 'build-and-renovate', 'radiators']),
    new NavigationItem('DIY_BUILDANDRENOVATE', 'DIY_BUILDANDRENOVATE_TILES', ['diy', 'build-and-renovate', 'tiles']),
    new NavigationItem('DIY_BUILDANDRENOVATE', 'DIY_BUILDANDRENOVATE_VINYLFLOOR', ['diy', 'build-and-renovate', 'vinyl-floor']),
    new NavigationItem('DIY_BUILDANDRENOVATE', 'DIY_BUILDANDRENOVATE_WALLPAINT', ['diy', 'build-and-renovate', 'wallpaint']),
    new NavigationItem('DIY', 'DIY_HOUSEINSTALLATIONS', ['diy', 'house-installations', '']),
    new NavigationItem('DIY_HOUSEINSTALLATIONS', 'DIY_HOUSEINSTALLATIONS_INTERCOMS', ['diy', 'house-installations', 'intercoms']),
    new NavigationItem('DIY_HOUSEINSTALLATIONS', 'DIY_HOUSEINSTALLATIONS_MAILBOXES', ['diy', 'house-installations', 'mailboxes']),
    new NavigationItem('DIY', 'DIY_SEW', ['diy', 'sew', '']),
    new NavigationItem('DIY_SEW', 'DIY_SEW_FABRICS', ['diy', 'sew', 'fabrics']),
    new NavigationItem('DIY', 'DIY_TOOLS', ['diy', 'tools', '']),
    new NavigationItem('DIY', 'DIY_TOOLS', ['die-besten-einhell-akku-geräte', '', ''])
      .setPathPartsForNavigation(['diy', 'tools', ''])
      .setFilters(['1000212'])
      .setSEOId('BESTEINHELLACCUTOOLS'),
    new NavigationItem('DIY_TOOLS', 'DIY_TOOLS_DRILLINGMACHINES', ['diy', 'tools', 'drilling-machines']),
    new NavigationItem('DIY_TOOLS', 'DIY_TOOLS_DRILLINGMACHINES', ['der-beste-bosch-akkuschrauber', '', ''])
      .setPathPartsForNavigation(['diy', 'tools', 'drilling-machines'])
      .setFilters(['1000216'])
      .setSEOId('BESTBOSCHACCUDRILLINGMACHINE'),

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
    const items: Array<NavigationItem> = this.ITEMS.filter(item => toId === item.toId);
    return items && items.length ? items[0] : undefined;
  }

  public static getNextLevelNavigationItemsFrom(item: NavigationItem | undefined): Array<NavigationItem> {
    if (!item) {
      return [];
    }

    return this.ITEMS
      .filter((navigationItem: NavigationItem): boolean => !navigationItem.pathPartsForNavigation?.length && item.toId === navigationItem.fromId);
  }

  public static getAllSupersequentNavigationIdsByItem(item: NavigationItem | undefined): Array<string> {
    let navigationIds: Array<string> = []

    let previousLevelItem: NavigationItem | undefined = Navigation.ITEMS.find(i => i.toId == item?.fromId);
    while (undefined !== previousLevelItem && previousLevelItem.fromId) {
      navigationIds = navigationIds.concat(previousLevelItem.toId);
      previousLevelItem = Navigation.ITEMS.find(i => i.toId == previousLevelItem?.fromId);
    }

    return navigationIds.reverse();
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

    let levelItem: NavigationItem | undefined = this.ITEMS.find(i => i.toId === item.fromId);
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
