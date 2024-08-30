import { CorrespondingItemDto } from './corresponding-item-dto';
import { ItemDescriptionDto } from './item-description';
import {PriceHistoryItem} from "../price-history-item";

export interface ItemDto {
    itemId: string;
    title: string;
    titleImage: string;
    scoring: any;

    descriptions: Array<ItemDescriptionDto>;
    providers: Array<CorrespondingItemDto>;
    priceHistory: Array<PriceHistoryItem>;
}
