export interface Message {
  title: string;
  message: string;
  type: MessageType;
}

export enum MessageType {
  SUCCESS = 0,
  ERROR = 1
}
