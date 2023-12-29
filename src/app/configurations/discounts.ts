import {DISCOUNT_CONDITION_ID_LINK, DiscountCondition, DiscountItem} from '../model/discount-item';
import {Item} from '../model/item';

export class Discounts {
  public static DISCOUNTS: DiscountItem[] = [
    new DiscountItem(
      'DISCOUNT_TEASER_SRLOPEZ_XMAS',
      'DISCOUNT_CONDITIONS_SRLOPEZ_XMAS',
      'XMASRABATT10',
      undefined,
      new Date(2023, 11, 31, 23, 59, 59)
    ).setConditionsToCheck([
      { conditionId: DISCOUNT_CONDITION_ID_LINK, value: 'srlopez' }
    ]),
    new DiscountItem(
      'DISCOUNT_TEASER_SILKESWK_NEUJAHR',
      'DISCOUNT_CONDITIONS_SILKESWK_NEUJAHR',
      '24NEUJAHR20',
      new Date(2024, 0, 2, 0, 0, 0),
      new Date(2024, 0, 5, 23, 59, 59)
    ).setConditionsToCheck([
      { conditionId: DISCOUNT_CONDITION_ID_LINK, value: 'silkes-weinkeller' }
    ]),
    new DiscountItem(
      'DISCOUNT_TEASER_VANDERSTORM_ENDSPURT',
      '',
      'SALE10',
      undefined,
      new Date(2024, 0, 1, 23, 59, 59)
    ).setConditionsToCheck([
      { conditionId: DISCOUNT_CONDITION_ID_LINK, value: 'janvanderstorm' }
    ]),
    new DiscountItem(
      'DISCOUNT_TEASER_NATURESWAY_4THADVENT',
      'DISCOUNT_CONDITIONS_NATURESWAY_4THADVENT',
      'WINTER',
      undefined,
      new Date(2023, 11, 30, 23, 59, 59)
    ).setConditionsToCheck([
      { conditionId: DISCOUNT_CONDITION_ID_LINK, value: 'naturesway' }
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
