import { BaseModel } from './factory/factory-base';
import {PriceHistoryItemDto} from "./dto/price-history-item-dto";

export class PriceHistoryItem extends BaseModel {
  public date: string = '';
  public lowestCurrentPrice: number = 0;

  static override fromModel(data: PriceHistoryItemDto): PriceHistoryItem {
    const item: PriceHistoryItem = this.bindFrom<PriceHistoryItemDto, PriceHistoryItem>(PriceHistoryItem, data) || new PriceHistoryItem();
    if (!item) {
      return new PriceHistoryItem();
    }

    return item;
  }
}
