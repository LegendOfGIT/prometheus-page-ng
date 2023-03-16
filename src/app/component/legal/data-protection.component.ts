import {Component} from '@angular/core';
import {Module, NavigationService} from '../../service/navigation.service';

@Component({
  selector: 'data-protection',
  templateUrl: './data-protection.component.html',
  styleUrls: ['./data-protection.component.scss']
})
export class DataProtectionComponent {
  public constructor(navigationService: NavigationService) {
    navigationService.activeModule = Module.DATA_PROTECTION;
  }
}
