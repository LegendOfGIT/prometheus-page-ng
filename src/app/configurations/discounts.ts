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
      'brunobanani.com: Rabatte, die Wellen schlagen!',
      'https://brunobanani.com/media/85/30/eb/1754374736/720x400%20%20Kategorieseite.jpg',
      'Blickfang-Bademode zum Sparpreis. Spare mindestens 30% auf Swimwear!',
      '',
      undefined,
      new Date(2025, 7, 19, 23, 59, 59)
    ).setConditionsToCheck([
      { conditionId: DISCOUNT_CONDITION_ID_LINK, value: 'brunobanani' }
    ])
      .setShopLink('https://brunobanani.com/sale/damen/bademode/')
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
