import { BaseModel } from './factory/factory-base';

export class PriceHistoryItem extends BaseModel {
  public date: string = '';
  public lowestCurrentPrice: number = 0;
}
