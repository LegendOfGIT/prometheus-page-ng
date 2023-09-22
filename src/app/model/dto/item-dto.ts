import { CorrespondingItemDto } from './corresponding-item-dto';
import { ItemDescriptionDto } from './item-description';

export interface ItemDto {
    itemId: string;
    title: string;
    titleImage: string;
    scoring: any;

    descriptions: Array<ItemDescriptionDto>;
    providers: Array<CorrespondingItemDto>;
}
