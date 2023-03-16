import {Component, HostListener, ViewChild} from '@angular/core';
import { Module, NavigationService } from '../../service/navigation.service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @ViewChild('gdprDialog')
  public gdprDialog: HTMLDialogElement | undefined;

  private wasLastScrollDirectionUp: boolean = false;

  public constructor(private navigationService: NavigationService){
  }

  @HostListener('document:mousewheel', ['$event'])
  onScroll(e: WheelEvent): void {
    this.wasLastScrollDirectionUp = (e?.deltaY || 0) > 0;
  }

  get isImprintActive(): boolean {
    return Module.IMPRINT === this.navigationService.activeModule;
  }

  get isDataProtectionActive(): boolean {
    return Module.DATA_PROTECTION === this.navigationService.activeModule;
  }

  get showFooter(): boolean {
    return !this.wasLastScrollDirectionUp;
  }

  public showGdprDialog(): void {
    (document.getElementById('gdprDialog') as HTMLDialogElement).showModal();
  }
}
