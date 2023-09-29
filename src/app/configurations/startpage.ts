import {TeaserItem} from '../model/teaser-item';

export class Startpage {
  public static TEASER_ITEMS: TeaserItem[] = [
    new TeaserItem('/kids?hashtags=LetsPlay', 'KIDS', '', 'TEASER_TITLE_HASHTAG_LETSPLAY')
      .setHashtags(['LetsPlay'])
      .setSsrRendering(true),

    new TeaserItem('/home?filters=1000165', 'HOME', '', 'TEASER_TITLE_FUNZY')
      .setFilters(['1000165'])
      .setSsrRendering(true),

    new TeaserItem('/kids?search=tonies', 'KIDS', 'tonies', 'TEASER_TITLE_TONIES'),
    //new TeaserItem('/kids?search=pokemon', 'KIDS', 'pokemon', 'TEASER_TITLE_POKEMON'),

    new TeaserItem('/home/accessoires/decorations?search=halloween', 'HOME_ACCESSOIRES_DECORATIONS', 'halloween', 'TEASER_TITLE_AUTUMNANDHALLOWEEN'),
    new TeaserItem('/home/accessoires/decorations?search=herbst', 'HOME_ACCESSOIRES_DECORATIONS', 'herbst', ''),
    new TeaserItem('/fashion/girls/disguises', 'FASHION_GIRLS_DISGUISES', '', ''),
    new TeaserItem('/fashion/boys/disguises', 'FASHION_BOYS_DISGUISES', '', ''),

    new TeaserItem('/beauty-and-care', 'BEAUTY_CARE', '', 'TEASER_TITLE_BEAUTY_CARE')
      .setSsrRendering(true),
    new TeaserItem('/beauty-and-care/fragrances', 'BEAUTY_CARE_FRAGRANCES_WOMEN', '', 'TEASER_TITLE_FRAGRANCES'),
    new TeaserItem('', 'BEAUTY_CARE_FRAGRANCES_MEN', '', ''),
    new TeaserItem('/beauty-and-care?search=vegan', 'BEAUTY_CARE', 'vegan', 'TEASER_TITLE_VEGAN_COSMETICS'),

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
      .setHashtags(['KeepCool'])
      .setSsrRendering(true),
    new TeaserItem('/electronics-and-computers/home/fully-automatic-coffee-machines', 'ELECTRONICS_AND_COMPUTERS_HOME_FULLYAUTOMATICCOFFEEMACHINES', '', 'TEASER_TITLE_COFFEE_MACHINES'),

    new TeaserItem('/fashion?hashtags=Sommer2023', 'FASHION', '', 'TEASER_TITLE_FASHION_SUMMER2023')
      .setHashtags(['Sommer2023'])
      .setSsrRendering(true),
    new TeaserItem('/fashion?filters=1000096-1000099-1000102-1000103-1000105', 'FASHION_WOMEN', '', 'TEASER_TITLE_FASHION_BRANDS')
      .setFilters(['1000096', '1000099', '1000102', '1000103', '1000105']),
    new TeaserItem('', 'FASHION_MEN', '', '')
      .setFilters(['1000096', '1000099', '1000102', '1000103', '1000105']),
    new TeaserItem('/fashion/women/maternity-wear', 'FASHION_WOMEN_MATERNITYWEAR', '', 'TEASER_TITLE_MATERNITY'),
    new TeaserItem('', 'KIDS_TOYS_BABIES', '', ''),

    new TeaserItem('/hashtags/Gold', '', '', 'TEASER_TITLE_HASHTAG_GOLD')
      .setHashtags(['Gold'])
      .setSsrRendering(true),

    new TeaserItem('/multimedia/games', 'MULTIMEDIA_GAMES', '', 'TEASER_TITLE_VIDEOGAMES')
      .setSsrRendering(true),
    new TeaserItem('/multimedia/movies/anime', 'MULTIMEDIA_MOVIES_ANIME', '', 'TEASER_TITLE_ANIMES'),

    new TeaserItem('/home/garden', 'HOME_GARDEN', 'grill', 'TEASER_TITLE_INTO_THE_GARDEN'),
    new TeaserItem('', 'HOME_GARDEN_GARDENHOUSES', 'gartenhaus', ''),

    new TeaserItem('/home/wellness', 'HOME_WELLNESS_SAUNAS', '', 'TEASER_TITLE_HOME_WELLNESS'),
    new TeaserItem('', 'HOME_WELLNESS_WHIRLPOOLS', '', ''),
  ];
}
