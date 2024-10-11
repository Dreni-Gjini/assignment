import { MessageStatus } from './message-status.enum';

export class Message {
  content: string;
  // isAi: boolean;
  // timestamp: Date;
  status: string;

  constructor(
    content: string,
    // isAi: boolean,
    status: string
    // timestamp: Date = new Date()
  ) {
    this.content = content;
    // this.isAi = isAi;
    this.status = status;
    // this.timestamp = timestamp;
  }

  empty(): boolean {
    return this.content === '';
  }
}
