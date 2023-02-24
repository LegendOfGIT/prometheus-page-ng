import {Component} from '@angular/core';
import {Module, NavigationService} from '../../service/navigation.service';

@Component({
  selector: 'imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent {
  public constructor(navigationService: NavigationService) {
    navigationService.activeModule = Module.IMPRINT;
  }
}
