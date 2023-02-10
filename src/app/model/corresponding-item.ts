import {ItemDto} from "./dto/item-dto";
import {BaseModel} from "./factory/factory-base";
import {CorrespondingItemDto} from "./dto/corresponding-item-dto";

export class CorrespondingItem extends BaseModel {
    link: string = '';
    priceCurrent: number = 0;
    priceInitial: number = 0;

    static override fromModel(data: CorrespondingItemDto): CorrespondingItem {

      const item = this.bindFrom<CorrespondingItemDto, CorrespondingItem>(CorrespondingItem, data) || new CorrespondingItem();
      if (item) {
        item.priceCurrent = (data as any)['price-current'];
        item.priceInitial = (data as any)['price-initial'];
      }

      return item;
    }
}
