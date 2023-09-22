import { BaseModel } from './factory/factory-base';
import {ItemDescriptionDto} from './dto/item-description';

export class ItemDescription extends BaseModel {
    public headline: string = '';
    public content: any;

  static override fromModel(data: ItemDescriptionDto): ItemDescription {

    const item = this.bindFrom<ItemDescriptionDto, ItemDescription>(ItemDescription, data) || new ItemDescription();
    if (!item) {
      return new ItemDescription();
    }

    return item;
  }
}
