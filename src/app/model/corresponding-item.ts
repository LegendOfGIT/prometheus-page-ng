import { BaseModel } from './factory/factory-base';
import { CorrespondingItemDto } from './dto/corresponding-item-dto';

export class CorrespondingItem extends BaseModel {
  public link: string = '';
  public amountInStock: number | undefined;
  public mean: string = '';
  public priceCurrent: number = 0;
  public priceInitial: number = 0;
  public pricePerUnit: number = 0;
  public productCondition: string = '';
  public referenceUnit: string = '';
  public updatedOn: string = '';

  static override fromModel(data: CorrespondingItemDto): CorrespondingItem {
    const item: CorrespondingItem = this.bindFrom<CorrespondingItemDto, CorrespondingItem>(CorrespondingItem, data) || new CorrespondingItem();
    if (!item) {
      return new CorrespondingItem();
    }

    item.priceCurrent = (data as any)['price-current'];
    item.priceInitial = (data as any)['price-initial'];

    return item;
  }

  public static renderPrice(item: CorrespondingItem | null): string | undefined {
    return CorrespondingItem.renderPriceAmount(item?.priceCurrent);
  }

  public static renderPriceAmount(price: number | undefined): string | undefined {
    return price ? `${price.toLocaleString('de-DE', {minimumFractionDigits: 2})} EUR` : undefined;
  }
}
