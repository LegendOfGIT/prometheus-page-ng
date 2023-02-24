import { Component } from '@angular/core';
import { Module, NavigationService } from "../../service/navigation.service";

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public constructor(private navigationService: NavigationService) {
  }

  get isImprintActive(): boolean {
    return Module.IMPRINT === this.navigationService.activeModule;
  }
}
