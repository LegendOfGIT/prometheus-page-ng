import { ItemDto } from './dto/item-dto';
import { BaseModel } from './factory/factory-base';
import { CorrespondingItem } from './corresponding-item';

export class Item extends BaseModel {

    itemId: string = '';
    title: string = '';
    titleImage: string = '';

    providers: Array<CorrespondingItem | null> = [];

    static override fromModel(data: ItemDto): Item | null {
        const item = this.bindFrom<ItemDto, Item>(Item, data);
        if (item) {
          item.titleImage = (data as any)['title-image'];
          item.providers = (data.providers || []).map(provider => CorrespondingItem.fromModel(provider));
        }

        return item;
    }

    private getProviderItemWithLowestPrice(): CorrespondingItem | null {
      if (!this.providers || !this.providers.length) {
        return null;
      }

      this.providers.sort((a, b) =>
        (a as any)['current-price'] - (b as any)['current-price']);

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
