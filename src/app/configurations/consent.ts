import { ConsentItem, ConsentScope, StorageLocation } from 'src/app/model/consent-item';

export class ConsentConfiguration {
  public static ITEMS: ConsentItem[] = [
    new ConsentItem(ConsentScope.Functional, StorageLocation.Cookie, 'g_state')
  ];
}
