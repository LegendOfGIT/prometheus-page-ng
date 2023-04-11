import { ItemDto } from './item-dto';

export interface ItemsResponseDto {
    items: Array<ItemDto>;
    availablePages: Array<number>;
}
