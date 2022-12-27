import { CorrespondingItemDto } from './corresponding-item-dto';

export interface ItemDto {
    itemId: string;
    title: string;
    titleImage: string;

    providers: Array<CorrespondingItemDto>;
}
