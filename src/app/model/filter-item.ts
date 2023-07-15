import { BaseModel } from './factory/factory-base';

export class FilterItem extends BaseModel {
  public id: string = '';
  public filterLabelId: string = '';
  public groupLabelId: string = '';
  public orderPosition: number = 0;

  public constructor(id: string, filterLabelId: string) {
    super();

    this.id = id;
    this.filterLabelId = filterLabelId;
  }
}
