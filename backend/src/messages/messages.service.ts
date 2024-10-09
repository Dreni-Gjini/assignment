import { Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  private messages: Message[] = [];

  createMessage({ content }: CreateMessageDto, userId: string): Message {
    const newMessage = new Message();
    newMessage.content = content;
    newMessage.userId = userId;

    this.messages.push(newMessage);
    return newMessage;
  }

  getAllMessages(): Message[] {
    return this.messages;
  }
}
