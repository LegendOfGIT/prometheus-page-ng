import {SuggestionItemDto} from './suggestion-item-dto';

export interface HashtagItemsResponseDto {
    items: Array<SuggestionItemDto>;
    availablePages: Array<number>;
}
