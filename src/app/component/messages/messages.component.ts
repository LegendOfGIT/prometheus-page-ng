import {Component} from '@angular/core';
import {MessagesService} from '../../service/messages.service';
import {Message} from '../../model/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  public showToast: boolean = false;
  private messageToShow: Message | undefined;
  private timeoutHandleId: any;

  public constructor(private messageService: MessagesService) {
  }

  get Message(): Message | undefined {
    if (!this.messageService.message) {
      return this.messageToShow;
    }

    this.messageToShow = this.messageService.message;
    this.messageService.message = undefined;

    clearTimeout(this.timeoutHandleId);

    this.showToast = true;
    this.timeoutHandleId = setTimeout((): void => {
      this.showToast = false;
      this.messageService.message = undefined;
      this.messageToShow = undefined;
    }, 4000);

    return this.messageToShow;
  }
}
