import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[] = [];

  async all() {
    const res = await fetch('http://127.0.0.1:3000/messages');
    const data = await res.json();

    this.messages = data.messages.map(
      (message: any) => new Message(message.text, message.status)
    );
  }

  async add(message: Message) {
    this.messages.push(message);
  }
}
