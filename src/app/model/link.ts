export class Link {
    typeOfLink: LinkType = LinkType.Website;
    uri: string = '';
}

export enum LinkType {
  Website = 'WEBSITE',
  Facebook = 'FACEBOOK',
  Instagram = 'INSTAGRAM',
  Pinterest = 'PINTEREST',
  YouTube = 'YOUTUBE'
}
