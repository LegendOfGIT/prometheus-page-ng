import { Component } from '@angular/core';

import { Navigation } from 'src/app/configurations/navigation';
import { NavigationItem } from 'src/app/model/navigation-item';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  public navigationItems: NavigationItem[] = Navigation.ITEMS;

}
