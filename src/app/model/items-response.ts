
import { BaseModel } from './factory/factory-base';
import { Item } from './item';

export class ItemsResponse extends BaseModel {
    items: Array<Item | null> = [];
    availablePages: Array<number> = [];
}
