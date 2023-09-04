import { BaseModel } from './factory/factory-base';
import { CorrespondingItemDto } from './dto/corresponding-item-dto';

export class CorrespondingItem extends BaseModel {
    public link: string = '';
    public priceCurrent: number = 0;
    public priceInitial: number = 0;
    public productCondition: string = '';
    public updatedOn: string = '';

    static override fromModel(data: CorrespondingItemDto): CorrespondingItem {

      const item = this.bindFrom<CorrespondingItemDto, CorrespondingItem>(CorrespondingItem, data) || new CorrespondingItem();
      if (!item) {
        return new CorrespondingItem();
      }

      item.priceCurrent = (data as any)['price-current'];
      item.priceInitial = (data as any)['price-initial'];

      return item;
    }

  public static renderPrice(item: CorrespondingItem | null): string | undefined {
    return item?.priceCurrent ? `${item.priceCurrent.toLocaleString('de-DE', {minimumFractionDigits: 2})} EUR` : undefined;
  }
}
