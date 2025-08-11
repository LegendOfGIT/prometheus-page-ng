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
      'Jetzt neu einrichten!',
      'Vertbaudet.de: 15 EUR Gutschrift je 100 EUR Einkaufswert',
      'https://media.vertbaudet.de/medias/45/4/30974/777798193/enm.jpg',
      'Gilt für Aktions-Möbel und Dekoration auf www.vertbaudet.de',
      '',
      undefined,
      new Date(2025, 7, 12, 23, 59, 59)
    ).setConditionsToCheck([
      { conditionId: DISCOUNT_CONDITION_ID_LINK, value: 'vertbaudet' }
    ])
    .setShopLink('https://www.vertbaudet.de/shop/aktion-home.htm'),
    new DiscountItem(
      'Jetzt sparen!',
      'brunobanani.com: Rabatte, die Wellen schlagen!',
      'https://brunobanani.com/media/85/30/eb/1754374736/720x400%20%20Kategorieseite.jpg',
      'Blickfang-Bademode zum Sparpreis. Spare mindestens 30% auf Swimwear!',
      '',
      undefined,
      new Date(2025, 7, 19, 23, 59, 59)
    ).setConditionsToCheck([
      { conditionId: DISCOUNT_CONDITION_ID_LINK, value: 'brunobanani' }
    ])
      .setShopLink('https://brunobanani.com/sale/damen/bademode/'),
    new DiscountItem(
      'Nur für kurze Zeit!',
      'quelle.de: Großer Sommer-Sale bis zu -70%',
      'https://www.quelle.de/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fdrupal-images-quellede%2Fproduction%2F2025-08%2F25KW33_b1_30pro_Strand-_Bademode_1140x350px.jpg&w=1200&q=75',
      '-30% auf Strand- und Bademode. Gilt auch auf bereits reduzierte Artikel',
      '',
      undefined,
      new Date(2025, 7, 15, 23, 59, 59)
    ).setConditionsToCheck([
      { conditionId: DISCOUNT_CONDITION_ID_LINK, value: 'quelle' }
    ])
      .setShopLink('https://www.quelle.de/mode/damen/waesche-bademode/strandmode/strandkleider/'),
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
