import {Link} from './link';
import {Address} from './address';

export class ThingOfInterest {
    id?: string = '';
    title: string = '';
    titleImage?: string;
    navigationId?: string;
    typeOfItem: string = 'SHOP';
    description?: string;
    links?: Link[];
    address?: Address;
    images?: String[];
}
