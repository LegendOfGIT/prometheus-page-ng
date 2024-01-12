import { ItemDto } from './dto/item-dto';
import { BaseModel } from './factory/factory-base';
import { CorrespondingItem } from './corresponding-item';
import { ItemDetails } from './item-details';
import {ItemDescription} from "./item-description";

export class Item extends BaseModel {
    id: string = '';
    itemId: string = '';
    description: string = '';
    title: string = '';
    titleImage: string = '';
    navigationPath: Array<string> = [];
    hashtags: Array<string> = [];

    amountOfMedia: number = 0;
    amountOfPages: number = 0;
    amountOfSongs: number = 0;
    annualConsumptionInKWH: number = 0;
    author: string = '';
    brand: string = '';
    colors: string = '';
    contentsOfDelivery: string = '';
    countryOfOrigin: string = '';
    coverType: string = '';
    diameterInInch: number = 0;
    fabric: string = '';
    fabricPattern: string = '';
    flavours: string = '';
    fit: string = '';
    interpret: string = '';
    genre: string = '';
    heightInCm: number = 0;
    importantHints: string = '';
    isbn: string = '';
    languages: string = '';
    loadIndex: number = 0;
    lengthInCm: number = 0;
    make: string = '';
    material: string = '';
    innerMaterial: string = '';
    outerMaterial: string = '';
    minimumAge: number = 0;
    publisher: string = '';
    ramSize: string = '';
    regionOfOrigin: string = '';
    resolution: string = '';
    size: string = '';
    sizes: string = '';
    storageSize: string = '';
    subgenre: string = '';
    scent: string = '';
    seoDescription: string = '';
    seoKeywords: string = '';
    speedKey: string = '';
    tasteType: string = '';
    teaserTexts: Array<string> = [];
    type: string = '';
    types: string = '';
    tyreType: string = '';
    widthInCm: number = 0;
    weightInKG: number = 0;
    weightInG: number = 0;

    imagesBig: Array<string> = [];
    descriptions: Array<ItemDescription | null> = [];
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
          item.teaserTexts = (data as any)['teaser-texts'];
          item.widthInCm = (data as any)['width-in-cm'];

          item.descriptions = (data.descriptions || [])
            .map(description => ItemDescription.fromModel(description))
            .filter(description => description.content);
          item.providers = (data.providers || []).map(provider => CorrespondingItem.fromModel(provider));

          const hashtagsToIgnore = ['', 'noprofile', 'WeWannaShop'];
          item.hashtags = Object.keys(data.scoring || {})
            .filter(key => -1 === hashtagsToIgnore.indexOf(key))
            .map(key => ({ key, value: data.scoring[key] }))
            .filter(hashtag => hashtag.value > 0.4)
            .sort((a, b) => b.value - a.value)
            .map(hashtag => hashtag.key)
            .splice(0, 3);
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

      const providers: Array<CorrespondingItem | null> = item.providers
        .filter((item: CorrespondingItem | null): boolean => (item?.priceCurrent || 0) > 0)
        .sort((a, b) => (a?.priceCurrent || 0) - (b?.priceCurrent || 0));

      return providers[0];
    }

  public static getProviderItemWithHighestPrice(item: Item | null): CorrespondingItem | null {
    if (!item?.providers || !item.providers.length) {
      return null;
    }

    if (1 === item.providers.length) {
      return item.providers[0];
    }

    const providers: Array<CorrespondingItem | null> = item.providers
      .filter((item: CorrespondingItem | null): boolean => (item?.priceCurrent || 0) > 0)
      .sort((a, b) => (b?.priceCurrent || 0) - (a?.priceCurrent || 0));

    return providers[0];
  }

    public static renderLowestPrice(item: Item | null): string {
      const itemWithLowestPrice: CorrespondingItem | null = Item.getProviderItemWithLowestPrice(item);

      const lowestPrice: number | undefined = itemWithLowestPrice?.priceCurrent;
      return lowestPrice ? `${lowestPrice.toLocaleString('de-DE', {minimumFractionDigits: 2})} EUR` : '';
    }

    public static renderReductionOfLowestPriceItem(item: Item | null): string {
      const itemWithLowestPrice: CorrespondingItem | null = Item.getProviderItemWithLowestPrice(item);
      if (!itemWithLowestPrice?.priceCurrent || !itemWithLowestPrice?.priceInitial) {
        return '';
      }

      const reductionInPercent = 100 - Math.floor((itemWithLowestPrice?.priceCurrent || 0) * 100 / (itemWithLowestPrice?.priceInitial || 1));

      if (reductionInPercent < 20) {
        return '';
      }

      return `- ${reductionInPercent} %`
    }

    public static getItemDetails(item: Item | null, translations: any): Array<ItemDetails> {
      if (!item) {
        return [];
      }

      const itemDetails: Array<ItemDetails> = [new ItemDetails('MAKE', item.make || item.brand)];

      const prependedPropertyKeys: Array<string> = [ 'importantHints' ];
      let propertyKeys: Array<string> = Object.keys(item).filter((key: string): boolean => -1 === prependedPropertyKeys.indexOf(key));
      propertyKeys = propertyKeys.concat(prependedPropertyKeys);

      propertyKeys.forEach((key: string): void => {
        if (translations[`PRODUCT_DETAILS_${key.toUpperCase()}`]) {
          itemDetails.push(new ItemDetails(key.toUpperCase(), item[key as keyof Item]));
        }
      });

      return itemDetails.filter((detail: ItemDetails) => detail.value);
    }

}
