export class NavigationItem {

    fromId: string = '';
    toId: string = '';
    pathParts: Array<string> = [];
    sortOrder: number;

    constructor(fromId: string, toId: string, pathParts: Array<string>, sortOrder: number = 0) {
      this.fromId = fromId;
      this.toId = toId;
      this.pathParts = pathParts;
      this.sortOrder = sortOrder;
    }
}
