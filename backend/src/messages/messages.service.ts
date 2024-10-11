import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesGateway } from './messages.gateway';
import { AI_RESPONSES } from 'src/ai/ai-responses';
@Injectable()
export class MessagesService {
  private messages: Message[] = [];

  constructor(private readonly messagesGateway: MessagesGateway) {}

  createMessage(
    createMessageDto: CreateMessageDto,
    userId: string,
  ): { status: number } {
    try {
      const newMessage = new Message();
      newMessage.content = createMessageDto.content;
      newMessage.userId = userId;
      newMessage.timestamp = new Date();
      this.messages.push(newMessage);

      this.messagesGateway.server.emit('chatbot', { status: 'processing' });

      setTimeout(
        () => {
          this.simulateAIResponse(userId);

          this.messagesGateway.server.emit('chatbot', { status: 'sent' });
        },
        Math.random() * 2000 + 2000,
      );

      return {
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      throw new HttpException(
        'An error occurred while creating the message',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  private simulateAIResponse(userId: string): Message {
    try {
      const aiMessage = new Message();

      const randomResponse =
        AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];

      aiMessage.content = randomResponse;
      aiMessage.userId = userId;
      aiMessage.isAi = true;
      aiMessage.timestamp = new Date();

      this.messages.push(aiMessage);
      return aiMessage;
    } catch (error) {
      throw new HttpException(
        'Error generating AI response',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getAllMessages(userId: string, lastFetched: Date): Message[] {
    try {
      return this.messages.filter(
        (message) =>
          message.timestamp > lastFetched &&
          (message.userId === userId || message.isAi),
      );
    } catch (error) {
      throw new HttpException(
        'Error fetching messages',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
