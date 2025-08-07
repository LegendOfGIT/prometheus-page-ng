export class DiscountItem {
  code: string = '';
  conditions: string = '';
  conditionsToCheck: Array<DiscountCondition> = [];
  minimumDate: Date | undefined;
  maximumDate: Date | undefined;
  shopLink: string = '';
  teaser: string = '';
  teaserImage: string = '';

  constructor(teaser: string, teaserImage: string = '', conditions: string, code: string = '', minimumDate: Date | undefined = undefined, maximumDate: Date | undefined = undefined) {
    this.code = code;
    this.conditions = conditions;
    this.maximumDate = maximumDate;
    this.minimumDate = minimumDate;
    this.teaser = teaser;
    this.teaserImage = teaserImage;
  }

  public setConditionsToCheck(conditionsToCheck: Array<DiscountCondition>): DiscountItem {
    this.conditionsToCheck = conditionsToCheck;
    return this;
  }

  public setShopLink(shopLink: string): DiscountItem {
    this.shopLink = shopLink;
    return this;
  }

  public isCurrentlyActive(): boolean {
    const now: Date = new Date();
    if (this.maximumDate && now > this.maximumDate) {
      return false;
    }

    return !(this.minimumDate && now < this.minimumDate);
  }
}

export interface DiscountCondition {
  conditionId: string;
  value: any;
}

export const DISCOUNT_CONDITION_ID_LINK = 'DISCOUNT_CONDITION_ID_LINK';
export const DISCOUNT_CONDITION_ID_DESCRIPTION = 'DISCOUNT_CONDITION_ID_DESCRIPTION';
