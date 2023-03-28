import { ItemDto } from './dto/item-dto';
import { BaseModel } from './factory/factory-base';
import { CorrespondingItem } from './corresponding-item';
import { ItemDetails } from './item-details';

export class Item extends BaseModel {

    id: string = '';
    itemId: string = '';
    description: string = '';
    title: string = '';
    titleImage: string = '';
    navigationPath: Array<string> = [];

    amountOfMedia: number = 0;
    amountOfSongs: number = 0;
    fabric: string = '';
    fabricPattern: string = '';
    fit: string = '';
    interpret: string = '';
    genre: string = '';
    material: string = '';
    minimumAge: number = 0;
    subgenre: string = '';
    seoDescription: string = '';
    seoKeywords: string = '';

    imagesBig: Array<string> = [];
    providers: Array<CorrespondingItem | null> = [];

    static override fromModel(data: ItemDto): Item | null {
        const item = this.bindFrom<ItemDto, Item>(Item, data);
        if (item) {
          item.id = (data as any)._id;
          item.imagesBig = (data as any)['images-big'];
          item.titleImage = (data as any)['title-image'];
          item.providers = (data.providers || []).map(provider => CorrespondingItem.fromModel(provider));
        }

        return item;
    }

    public static getProviderItemWithLowestPrice(item: Item | null): CorrespondingItem | null {
      if (!item?.providers || !item.providers.length) {
        return null;
      }

      if (1 === item.providers.length) {
        return item.providers[0];
      }

      const providers = item.providers
        .filter(item => (item?.priceCurrent || 0) > 0)
        .sort((a, b) => (a?.priceCurrent || 0) - (b?.priceCurrent || 0));

      return providers[0];
    }

    public getLinkOfLowestPriceItem(): string {
      const item = Item.getProviderItemWithLowestPrice(this);
      return item?.link || '';
    }

    public static renderLowestPrice(item: Item | null): string {
      const itemWithLowestPrice = Item.getProviderItemWithLowestPrice(item);

      const lowestPrice = itemWithLowestPrice?.priceCurrent;
      return lowestPrice ? `${lowestPrice.toLocaleString('de-DE', {minimumFractionDigits: 2})} EUR` : '';
    }

    public static getItemDetails(item: Item | null): Array<ItemDetails> {
      if (!item) {
        return [];
      }

      return [
        new ItemDetails('GENRE', item.genre),
        new ItemDetails('SUBGENRE', item.subgenre),
        new ItemDetails('MINIMUM_AGE', item.minimumAge),
        new ItemDetails('INTERPRET', item.interpret),
        new ItemDetails('AMOUNT_OF_MEDIA', item.amountOfMedia),
        new ItemDetails('AMOUNT_OF_SONGS', item.amountOfSongs),
        new ItemDetails('FIT', item.fit),
        new ItemDetails('MATERIAL', item.material),
        new ItemDetails('FABRIC', item.fabric),
        new ItemDetails('FABRIC_PATTERN', item.fabricPattern),
      ].filter(detail => detail.value);
    }

}
