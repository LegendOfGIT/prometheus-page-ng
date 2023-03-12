export class ConsentItem {
    scope: ConsentScope;
    storageLocation: StorageLocation;
    namePattern: string;

    constructor (scope: ConsentScope, storageLocation: StorageLocation, namePattern: string) {
      this.scope = scope;
      this.storageLocation = storageLocation;
      this.namePattern = namePattern;
    }
}

export enum ConsentScope {
  Essential,
  Functional,
  Marketing
}

export enum StorageLocation {
  Cookie,
  LocalStorage
}
