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
    amountOfPages: number = 0;
    amountOfSongs: number = 0;
    author: string = '';
    colors: string = '';
    diameterInInch: number = 0;
    fabric: string = '';
    fabricPattern: string = '';
    fit: string = '';
    interpret: string = '';
    genre: string = '';
    heightInCm: number = 0;
    isbn: string = '';
    languages: string = '';
    loadIndex: number = 0;
    lengthInCm: number = 0;
    material: string = '';
    minimumAge: number = 0;
    publisher: string = '';
    sizes: string = '';
    subgenre: string = '';
    seoDescription: string = '';
    seoKeywords: string = '';
    speedKey: string = '';
    tyreType: string = '';
    widthInCm: number = 0;
    weightInG: number = 0;

    imagesBig: Array<string> = [];
    providers: Array<CorrespondingItem | null> = [];

    static override fromModel(data: ItemDto): Item | null {
        const item = this.bindFrom<ItemDto, Item>(Item, data);
        if (item) {
          item.id = (data as any)._id;
          item.diameterInInch = (data as any)['diameter-in-inch'];
          item.heightInCm = (data as any)['height-in-cm'];
          item.imagesBig = (data as any)['images-big'];
          item.lengthInCm = (data as any)['length-in-cm'];
          item.titleImage = (data as any)['title-image'];
          item.widthInCm = (data as any)['width-in-cm'];
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
        new ItemDetails('AUTHOR', item.author),
        new ItemDetails('INTERPRET', item.interpret),
        new ItemDetails('ISBN', item.isbn),
        new ItemDetails('PUBLISHER', item.publisher),
        new ItemDetails('AMOUNT_OF_MEDIA', item.amountOfMedia),
        new ItemDetails('AMOUNT_OF_PAGES', item.amountOfPages),
        new ItemDetails('AMOUNT_OF_SONGS', item.amountOfSongs),
        new ItemDetails('LANGUAGES', item.languages),
        new ItemDetails('FIT', item.fit),
        new ItemDetails('SIZES', item.sizes),
        new ItemDetails('COLORS', item.colors),
        new ItemDetails('MATERIAL', item.material),
        new ItemDetails('FABRIC', item.fabric),
        new ItemDetails('FABRIC_PATTERN', item.fabricPattern),
        new ItemDetails('LENGTH_IN_CM', item.lengthInCm),
        new ItemDetails('WIDTH_IN_CM', item.widthInCm),
        new ItemDetails('HEIGHT_IN_CM', item.heightInCm),
        new ItemDetails('WEIGHT_IN_G', item.weightInG),
        new ItemDetails('TYRE_TYPE', item.tyreType),
        new ItemDetails('DIAMETER_IN_INCH', item.diameterInInch),
        new ItemDetails('LOADINDEX', item.loadIndex),
        new ItemDetails('SPEEDKEY', item.speedKey)
      ].filter(detail => detail.value);
    }

}
