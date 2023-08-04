import { BaseModel } from './factory/factory-base';
import {AvailableFilterItem} from "./available-filter-item";

export class AvailableFiltersResponse extends BaseModel {
    items: Array<AvailableFilterItem | null> = [];
}
