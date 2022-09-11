import { ItemDto } from './dto/item-dto';
import { BaseModel } from './factory/factory-base';

export class Item extends BaseModel {

    itemId: string = '';
    title: string = '';
    titleImage: string = '';

    static override fromModel(data: ItemDto): Item | null {

        const item = this.bindFrom<ItemDto, Item>(Item, data);
        if (item) {
          item.titleImage = (data as any)['title-image'];
        }

        return item;
    }

}
