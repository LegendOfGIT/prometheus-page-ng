import { Component, Input } from '@angular/core';
import { GdprService } from '../../service/gdpr.service';
import { GdprDecision, GdprSettings } from '../../model/gdpr-settings';

@Component({
  selector: 'general-data-protection-regulation',
  templateUrl: './general-data-protection-regulation.component.html',
  styleUrls: ['./general-data-protection-regulation.component.scss']
})
export class GeneralDataProtectionRegulationComponent {
  @Input()
  gdprDialog: HTMLDialogElement | undefined;

  constructor(private gdprService: GdprService) {
  }

  public acceptAll(): void {
    const settings = this.gdprService.getSettings() || new GdprSettings();
    settings.gdprDecision = GdprDecision.AcceptedAll;
    this.gdprService.storeSettings(settings);

    this.gdprDialog?.close();
  }

  public declineAll(): void {
    const settings = this.gdprService.getSettings() || new GdprSettings();
    settings.gdprDecision = GdprDecision.DeclinedAll;
    this.gdprService.storeSettings(settings);

    this.gdprDialog?.close();
  }
}
