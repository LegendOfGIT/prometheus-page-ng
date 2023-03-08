import { ItemDto } from './dto/item-dto';
import { BaseModel } from './factory/factory-base';
import { CorrespondingItem } from './corresponding-item';

export class Item extends BaseModel {

    id: string = '';
    itemId: string = '';
    description: string = '';
    title: string = '';
    titleImage: string = '';

    providers: Array<CorrespondingItem | null> = [];

    static override fromModel(data: ItemDto): Item | null {
        const item = this.bindFrom<ItemDto, Item>(Item, data);
        if (item) {
          item.id = (data as any)._id;
          item.titleImage = (data as any)['title-image'];
          item.providers = (data.providers || []).map(provider => CorrespondingItem.fromModel(provider));
        }

        return item;
    }

    public getProviderItemWithLowestPrice(): CorrespondingItem | null {
      if (!this.providers || !this.providers.length) {
        return null;
      }

      this.providers.sort((a, b) =>
        (a?.priceCurrent || 0) - (b?.priceCurrent || 0));

      return this.providers[0];
    }

    public getLinkOfLowestPriceItem(): string {
      const item = this.getProviderItemWithLowestPrice();
      return item?.link || '';
    }

    public renderLowestPrice(): string {
      const item = this.getProviderItemWithLowestPrice();

      const lowestPrice = item?.priceCurrent;
      return lowestPrice ? `${lowestPrice.toLocaleString('de-DE', {minimumFractionDigits: 2})} EUR` : '';
    }

}
