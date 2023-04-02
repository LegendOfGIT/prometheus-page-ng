export class NavigationItem {

    fromId: string = '';
    toId: string = '';
    pathParts: Array<string> = [];
    hasSlogan = false;
    hasTeaser = false;
    sortOrder: number;

    constructor(fromId: string, toId: string, pathParts: Array<string>, sortOrder: number = 0) {
      this.fromId = fromId;
      this.toId = toId;
      this.pathParts = pathParts;
      this.sortOrder = sortOrder;
    }

    public setHasSlogan(hasSlogan: boolean): NavigationItem {
      this.hasSlogan = hasSlogan;
      return this;
    }

  public setHasTeaser(hasTeaser: boolean): NavigationItem {
    this.hasTeaser = hasTeaser;
    return this;
  }
}
