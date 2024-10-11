import { Component, inject, Inject } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message.model';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageStatus } from '../../models/message-status.enum';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  standalone: true,
  imports: [FormsModule, MessageComponent, NgClass],
  providers: [MessageService],
})
export class CreateMessageComponent {
  messageService = inject(MessageService);

  message: Message = new Message('', MessageStatus.DRAFT);

  onSubmit() {
    this.message.status = MessageStatus.PENDING;
    console.log(this.message);
  }
}
