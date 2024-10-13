import { MessageStatus } from './message-status.enum';

export class Message {
  content: string;
  isAi: boolean;
  timestamp: Date;
  status: MessageStatus;

  constructor({
    content,
    isAi,
    status,
    timestamp,
  }: {
    content: string;
    isAi: boolean;
    status: MessageStatus;
    timestamp: Date;
  }) {
    this.content = content;
    this.isAi = isAi;
    this.status = status;
    this.timestamp = timestamp;
  }
}

export class CreateMessageModel {
  content: string;
  status: MessageStatus;

  constructor(content: string, status: MessageStatus) {
    this.content = content;
    this.status = status;
  }

  isValid(): boolean {
    return !!this.content && this.content.length > 0;
  }

  toMessage(): Message {
    return new Message({
      content: this.content,
      isAi: false,
      status: this.status,
      timestamp: new Date(Date.now()),
    });
  }

  reset(): void {
    this.content = '';
    this.status = MessageStatus.DRAFT;
  }
}

export type PostMessageDto = Pick<Message, 'content'>;
