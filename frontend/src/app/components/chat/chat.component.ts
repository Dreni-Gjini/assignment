import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { NgForOf } from '@angular/common';
import { MessageComponent } from '../message/message.component';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  standalone: true,
  imports: [NgForOf, MessageComponent],
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  constructor(private messageService: MessageService) {}

  async ngOnInit() {
    // @ts-ignore
    await this.messageService.all();
    this.messages = this.messageService.messages;
  }
}
