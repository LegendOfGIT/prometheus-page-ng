import { Injectable } from '@angular/core';
import { Message } from '../model/message';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {
  private _message: Message | undefined;

  get message() {
    return this._message;
  }

  set message(message: Message | undefined) {
    this._message = message;
  }
}
