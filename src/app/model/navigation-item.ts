export class NavigationItem {

    fromId: string = '';
    toId: string = '';
    path: string = '';

    constructor(fromId: string, toId: string, path: string) {
      this.fromId = fromId;
      this.toId = toId;
      this.path = path;
    }
}
