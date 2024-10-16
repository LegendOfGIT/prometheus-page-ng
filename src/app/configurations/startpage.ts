import {TeaserItem} from '../model/teaser-item';

export class Startpage {
  public static TEASER_ITEMS: TeaserItem[] = [
    new TeaserItem('/fashion?search=kostüm', 'FASHION', 'kostüm', 'TEASER_HALLOWEEN_COSTUMES')
      .setSsrRendering(true),
    /*new TeaserItem('/hashtags/Schnäppchen?search=Ostern', '', 'Ostern', 'TEASER_TITLE_EASTERN')
      .setHashtags(['Schnäppchen'])
      .setSsrRendering(true),*/
    new TeaserItem('/home/garden', 'HOME_GARDEN', 'grill', 'TEASER_TITLE_INTO_THE_GARDEN'),
    new TeaserItem('', 'HOME_GARDEN_GARDENHOUSES', 'gartenhaus', '')
      .setHashtags(['Schnäppchen']),

    new TeaserItem('', '', '', 'TEASER_TITLE_DEALS_DISCOVERED_TODAY')
      .setHashtags(['Schnäppchen'])
      .setCreatedToday(true)
      .setSsrRendering(true),
    /*new TeaserItem('/hashtags/Highlights?search=vegan', '', 'vegan', 'VEGANuary')
      .setHashtags(['Highlights']),
    new TeaserItem('', 'GROCERIES_FOOD_MEATSUBSTITUTES', 'vegan', ''),*/

    /*new TeaserItem('/sports', 'SPORTS', '', 'TEASER_TITLE_GOOD_INTENTION_MORE_SPORTS')
      .setSsrRendering(true),
    new TeaserItem('/beauty-and-care/health', 'BEAUTY_CARE_HEALTH', '', 'TEASER_TITLE_GOOD_INTENTION_LIVE_HEALTHY'),
    new TeaserItem('', '', 'Yoga', '')
      .setHashtags(['Highlights']),
    new TeaserItem('', 'GROCERIES_FOOD', 'Bio', ''),

    //new TeaserItem('/kids?search=geschenk', 'KIDS', 'geschenk', 'TEASER_TITLE_CHRISTMAS_KIDS_GIFT_IDEAS'),*/

    new TeaserItem('/kids?search=tonies', 'KIDS', 'tonies', 'TEASER_TITLE_TONIES'),

    new TeaserItem('/kids?hashtags=LetsPlay', 'KIDS', '', 'TEASER_TITLE_HASHTAG_LETSPLAY')
      .setHashtags(['LetsPlay']),

    new TeaserItem('/beauty-and-care', 'BEAUTY_CARE', '', 'TEASER_TITLE_BEAUTY_CARE')
      .setSsrRendering(true),
    new TeaserItem('/beauty-and-care/fragrances', 'BEAUTY_CARE_FRAGRANCES_WOMEN', '', 'TEASER_TITLE_FRAGRANCES'),
    new TeaserItem('', 'BEAUTY_CARE_FRAGRANCES_MEN', '', ''),
    new TeaserItem('/beauty-and-care?search=vegan', 'BEAUTY_CARE', 'vegan', 'TEASER_TITLE_VEGAN_COSMETICS'),

    new TeaserItem('/beauty-and-care?filters=1000022', 'BEAUTY_CARE', '', 'Black is beautiful Shop')
      .setFilters(['1000022']),
    new TeaserItem('/beauty-and-care?filters=1000040', 'BEAUTY_CARE', '', 'Sandawha Shop')
      .setFilters(['1000040']),

    new TeaserItem('/hashtags/Schnäppchen', '', '', 'TEASER_TITLE_HASHTAG_DEALS')
      .setHashtags(['Schnäppchen'])
      .setSsrRendering(true),
    new TeaserItem('', 'KIDS', '', '')
      .setHashtags(['Schnäppchen']),
    new TeaserItem('', 'FASHION', '', '')
      .setHashtags(['Schnäppchen']),
    new TeaserItem('', 'ELECTRONICS_AND_COMPUTERS', '', '')
      .setHashtags(['Schnäppchen']),

    new TeaserItem('/electronics-and-computers', 'ELECTRONICS_AND_COMPUTERS', '', 'TEASER_TITLE_HASHTAG_KEEPCOOL')
      .setHashtags(['KeepCool']),
    new TeaserItem('/electronics-and-computers/home/fully-automatic-coffee-machines', 'ELECTRONICS_AND_COMPUTERS_HOME_FULLYAUTOMATICCOFFEEMACHINES', '', 'TEASER_TITLE_COFFEE_MACHINES'),

    new TeaserItem('/kids?filters=1000049', 'FASHION', '', 'Waschbär Shop')
      .setFilters(['1000049']),

    /*new TeaserItem('/fashion?hashtags=Sommer2023', 'FASHION', '', 'TEASER_TITLE_FASHION_SUMMER2023')
      .setHashtags(['Sommer2023'])
      .setSsrRendering(true),*/
    new TeaserItem('/fashion?filters=1000096-1000099-1000102-1000103-1000105', 'FASHION_WOMEN', '', 'TEASER_TITLE_FASHION_BRANDS')
      .setFilters(['1000096', '1000099', '1000102', '1000103', '1000105']),
    new TeaserItem('', 'FASHION_MEN', '', '')
      .setFilters(['1000096', '1000099', '1000102', '1000103', '1000105']),
    new TeaserItem('/fashion/women/maternity-wear', 'FASHION_WOMEN_MATERNITYWEAR', '', 'TEASER_TITLE_MATERNITY'),
    new TeaserItem('', 'KIDS_TOYS_BABIES', '', ''),

    new TeaserItem('/hashtags/Gold', '', '', 'TEASER_TITLE_HASHTAG_GOLD')
      .setHashtags(['Gold']),

    new TeaserItem('/multimedia/games', 'MULTIMEDIA_GAMES', '', 'TEASER_TITLE_VIDEOGAMES')
      .setSsrRendering(true),
    new TeaserItem('/multimedia/movies/anime', 'MULTIMEDIA_MOVIES_ANIME', '', 'TEASER_TITLE_ANIMES'),

    new TeaserItem('/home/wellness', 'HOME_WELLNESS_SAUNAS', '', 'TEASER_TITLE_HOME_WELLNESS'),
    new TeaserItem('', 'HOME_WELLNESS_WHIRLPOOLS', '', ''),
  ];
}
