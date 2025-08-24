import {
  DISCOUNT_CONDITION_ID_DESCRIPTION,
  DISCOUNT_CONDITION_ID_LINK,
  DiscountCondition,
  DiscountItem
} from '../model/discount-item';
import {Item} from '../model/item';

export class Discounts {
  public static DISCOUNTS: DiscountItem[] = [
    new DiscountItem(
      'Jetzt überraschen lassen!',
      'topparfuemerie.de: Gratis Summer Surprise Bag!',
      'https://www.topparfuemerie.de/media/magestore/bannerslider/images/b/a/banner_white_label_shop_desktop_1224_x_410_px_51_.png',
      'Gratis Surprise Bag zu jedem Einkauf ab 49,95€ - mit Goodies gefüllte Kosmetiktasche',
      '',
      undefined,
      new Date(2025, 7, 31, 23, 59, 59)
    ).setConditionsToCheck([
      { conditionId: DISCOUNT_CONDITION_ID_LINK, value: 'topparfuemerie' }
    ])
    .setShopLink('https://www.topparfuemerie.de/'),
    new DiscountItem(
      'Jetzt sparen!',
      'toom.de: Schattige Plätzchen genießen und sparen!',
      'https://toom.de/fileadmin/_processed_/3/8/csm_ST-TH_Hollywoodschaukeln-Aktion-Prio1_25-35_1164x397_654a3225cc.jpg?quality=75&format=jpg&bg-color=ffffff&width=680',
      'Spare bis zu 40% bei ausgewählten Hollywoodschaukeln und Klemmmarkisen',
      '',
      undefined,
      new Date(2025, 7, 29, 23, 59, 59)
    ).setConditionsToCheck([
      { conditionId: DISCOUNT_CONDITION_ID_LINK, value: 'toom' }
    ])
      .setShopLink('https://toom.de/s/Rabattaktion-Hollywoodschaukeln-Markisen/produkte'),
    new DiscountItem(
      'Nur für kurze Zeit!',
      'medimops.de: Summersale',
      'https://cms.medimops.eu/cms2/cache/containers/banners/mm_de_app_home_summersale-min.jpg/aa7badc86b6fc93f915023d8d16b3646.avif',
      '18 % auf Second Hand Produkte: Jetzt nur kurze Zeit bei medimops!',
      'Sommer18',
      undefined,
      new Date(2025, 7, 27, 23, 59, 59)
    ).setConditionsToCheck([
      { conditionId: DISCOUNT_CONDITION_ID_LINK, value: 'medimops' }
    ])
      .setShopLink('https://www.medimops.de/sommer/'),
    new DiscountItem(
      'Jetzt zuschlagen!',
      'silkes-weinkeller.de: Kaufe 3 Flaschen, erhalte 6 Flaschen!',
      'https://www.silkes-weinkeller.de/out/pictures/generated/product/1/328_340_90/33_superdeal_avvolto_appassimento_produktbild.png.webp',
      '3 + 3 Flaschen Avvolto Appassimento 2024 + Versandkostenfrei innerhalb Deutschland',
      '',
      undefined,
      new Date(2025, 7, 31, 23, 59, 59)
    ).setConditionsToCheck([
      { conditionId: DISCOUNT_CONDITION_ID_LINK, value: 'quelle' }
    ])
      .setShopLink('https://www.silkes-weinkeller.de/wein/rotwein/3-3-avvolto-appassimento-2024-versandkostenfrei-d.html'),
    new DiscountItem(
      'Jetzt sparen!',
      'heideman-store.de: Jede Uhr 30 EUR reduziert!',
      'https://heideman-store.de/cdn/shop/files/hu1006-7_1.png?v=1722934202&width=990',
      'Mit dem Code UHR30 erhältst du 30€ Rabatt pro Uhr. Der Code gilt für jede einzelne Uhr in der Bestellung.',
      'UHR30',
      undefined,
      new Date(2025, 11, 31, 23, 59, 59)
    ).setConditionsToCheck([
      { conditionId: DISCOUNT_CONDITION_ID_LINK, value: 'heideman-store' }
    ])
      .setShopLink('https://heideman-store.de/collections/uhren')
  ];

  public static getDiscountForItem(item: Item | null): DiscountItem | undefined {
    const discountItems: Array<DiscountItem> = Discounts.DISCOUNTS.filter((discount: DiscountItem): boolean => {
      if (!discount.isCurrentlyActive()) {
        return false;
      }

      return (discount.conditionsToCheck || []).filter((conditionToCheck: DiscountCondition): boolean => {
          if (DISCOUNT_CONDITION_ID_LINK === conditionToCheck.conditionId && 1 === (item?.providers || []).length) {
            if (-1 !== item?.providers[0]?.link.indexOf(conditionToCheck.value)) {
              return true;
            }
          }

        if (DISCOUNT_CONDITION_ID_DESCRIPTION === conditionToCheck.conditionId) {
          if (-1 !== (item?.description || '').indexOf(conditionToCheck.value)) {
            return true;
          }
        }

          return false;
      }).length === (discount.conditionsToCheck || []).length;
    });

    return discountItems?.length ? discountItems[0] : undefined;
  }
}
