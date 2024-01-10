import {DISCOUNT_CONDITION_ID_LINK, DiscountCondition, DiscountItem} from '../model/discount-item';
import {Item} from '../model/item';

export class Discounts {
  public static DISCOUNTS: DiscountItem[] = [
    new DiscountItem(
      'DISCOUNT_TEASER_NATURESWAY_NEWYEAR_NEWME',
      'DISCOUNT_CONDITIONS_NATURESWAY_NEWYEAR_NEWME',
      '',
      undefined,
      new Date(2024, 0, 31, 23, 59, 59)
    ).setConditionsToCheck([
      { conditionId: DISCOUNT_CONDITION_ID_LINK, value: 'naturesway' }
    ]),
    new DiscountItem(
      'DISCOUNT_TEASER_KARLKARLO_HEALTHY15',
      '',
      'HEALTHY15',
      undefined,
      new Date(2024, 0, 31, 23, 59, 59)
    ).setConditionsToCheck([
      { conditionId: DISCOUNT_CONDITION_ID_LINK, value: 'karlkarlo' }
    ])
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

          return false;
      }).length > 0;
    });

    return discountItems?.length ? discountItems[0] : undefined;
  }
}
