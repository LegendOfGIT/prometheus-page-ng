export class NavigationItem {

    fromId: string = '';
    toId: string = '';
    pathParts: Array<string> = [];
    pathPartsForNavigation: Array<string> = [];
    hasSlogan = false;
    hasTeaser = false;
    sortOrder: number;
    filters: Array<string> = [];
    SEOId: string = '';

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

    public getFilters(): Array<string> {
      return this.filters;
    }

    public setFilters(filters: Array<string>): NavigationItem {
      this.filters = filters;
      return this;
    }

    public setSEOId(SEOId: string): NavigationItem {
      this.SEOId = SEOId;
      return this;
    }

    public setPathPartsForNavigation(pathPartsForNavigation: Array<string>): NavigationItem {
      this.pathPartsForNavigation = pathPartsForNavigation;
      return this;
    }

    public isFirstNavigationLevel(): boolean {
      return 'ALL' === (this.fromId || 'ALL');
    }
}
