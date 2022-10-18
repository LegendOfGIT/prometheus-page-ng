export class NavigationItem {

    fromId: string = '';
    toId: string = '';
    pathParts: Array<string> = [];

    constructor(fromId: string, toId: string, pathParts: Array<string>) {
      this.fromId = fromId;
      this.toId = toId;
      this.pathParts = pathParts;
    }
}
