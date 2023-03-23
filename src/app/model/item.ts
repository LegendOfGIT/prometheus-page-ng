import { ItemDto } from './dto/item-dto';
import { BaseModel } from './factory/factory-base';
import { CorrespondingItem } from './corresponding-item';
import {ItemDetails} from "./item-details";
import {unwrapConstructorDependencies} from "@angular/compiler-cli/src/ngtsc/annotations/common";

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

    public getProviderItemWithLowestPrice(): CorrespondingItem | null {
      if (!this.providers || !this.providers.length) {
        return null;
      }

      if (1 === this.providers.length) {
        return this.providers[0];
      }

      const providers = this.providers
        .filter(item => (item?.priceCurrent || 0) > 0)
        .sort((a, b) => (a?.priceCurrent || 0) - (b?.priceCurrent || 0));

      return providers[0];
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

    public getItemDetails(): Array<ItemDetails> {
      return [
        new ItemDetails('GENRE', this.genre),
        new ItemDetails('SUBGENRE', this.subgenre),
        new ItemDetails('MINIMUM_AGE', this.minimumAge),
        new ItemDetails('INTERPRET', this.interpret),
        new ItemDetails('AMOUNT_OF_MEDIA', this.amountOfMedia),
        new ItemDetails('AMOUNT_OF_SONGS', this.amountOfSongs),
        new ItemDetails('FIT', this.fit),
        new ItemDetails('MATERIAL', this.material),
        new ItemDetails('FABRIC', this.fabric),
        new ItemDetails('FABRIC_PATTERN', this.fabricPattern),
      ].filter(detail => detail.value);
    }

}
