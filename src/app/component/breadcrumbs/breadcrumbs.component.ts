import {Component, Input} from '@angular/core';
import {Navigation} from "../../configurations/navigation";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  @Input()
  public navigationIds: Array<string> | undefined = [];

  public getUriOfNavigationId(navigationId: string): string {
    return `/${(Navigation.getNavigationItemByToId(navigationId)?.pathParts || []).filter(part => part).join('/')}`;
  }
}
