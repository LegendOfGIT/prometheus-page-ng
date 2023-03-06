import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Module, NavigationService } from '../../service/navigation.service';
import { Navigation } from '../../configurations/navigation';
import {NavigationItem} from "../../model/navigation-item";

@Component({
  selector: 'start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent {

  constructor(
    private route: ActivatedRoute,
    private navigationService: NavigationService) {

    route.paramMap.subscribe((params) => {
      this.navigationService.activeModule = Module.HOME;
    });
  }

  get allRootRootItems(): Array<NavigationItem> {
    return Navigation.getAllRootItems();
  }
}
