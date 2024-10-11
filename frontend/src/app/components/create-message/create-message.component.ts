import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  standalone: true,
  providers: [MessageService],
  imports: [ReactiveFormsModule, FormsModule, NgIf, NgClass],
})
export class CreateMessageComponent {
  message: Message = new Message('', 'draft');
  private messageService: MessageService;

  constructor(messageService: MessageService) {
    this.messageService = messageService;
  }

  async onSubmit() {
    this.message.status = 'pending';
    const res = await fetch('http://127.0.0.1:3000/messages/send', {
      method: 'GET',
      body: JSON.stringify({ text: this.message.text }),
    });
    res.status === 204
      ? (this.message.status = 'sent')
      : (this.message.status = 'failed');
    await this.messageService.add(this.message);
    this.message = new Message('', 'draft');
  }
}
