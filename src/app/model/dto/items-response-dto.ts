import { ItemDto } from './item-dto';

export interface ItemsResponseDto {
  errorCode: string;
  items: Array<ItemDto>;
  availablePages: Array<number>;
}
