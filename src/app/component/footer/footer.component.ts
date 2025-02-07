import {Component, ViewChild} from '@angular/core';
import { Module, NavigationService } from '../../service/navigation.service';
import {TranslationPipe} from "../../pipes/translation.pipe";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [TranslationPipe, RouterLink]
})
export class FooterComponent {
  @ViewChild('gdprDialog')
  public gdprDialog: HTMLDialogElement | undefined;

  public constructor(private navigationService: NavigationService){
  }

  get isImprintActive(): boolean {
    return Module.IMPRINT === this.navigationService.activeModule;
  }

  get isDataProtectionActive(): boolean {
    return Module.DATA_PROTECTION === this.navigationService.activeModule;
  }

  public showGdprDialog(): void {
    (document.getElementById('gdprDialog') as HTMLDialogElement).showModal();
  }
}
