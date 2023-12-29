export class DiscountItem {
  code: string = '';
  conditions: string = '';
  conditionsToCheck: Array<DiscountCondition> = [];
  minimumDate: Date | undefined;
  maximumDate: Date | undefined;
  teaser: string = '';

  constructor(teaser: string, conditions: string, code: string = '', minimumDate: Date | undefined = undefined, maximumDate: Date | undefined = undefined) {
    this.code = code;
    this.conditions = conditions;
    this.maximumDate = maximumDate;
    this.minimumDate = minimumDate;
    this.teaser = teaser;
  }

  public setConditionsToCheck(conditionsToCheck: Array<DiscountCondition>): DiscountItem {
    this.conditionsToCheck = conditionsToCheck;
    return this;
  }

  public isCurrentlyActive(): boolean {
    const now = new Date();
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
