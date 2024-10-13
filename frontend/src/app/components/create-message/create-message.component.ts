import { Component, EventEmitter, inject, Inject, Output } from '@angular/core';
import { CreateMessageModel, Message } from '../../models/message.model';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageStatus } from '../../models/message-status.enum';
import { MessageComponent } from '../message/message.component';
import { catchError, finalize, of, take, tap } from 'rxjs';
import { MessagesService } from '../../api';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  standalone: true,
  imports: [FormsModule, MessageComponent, NgClass],
  providers: [MessagesService],
})
export class CreateMessageComponent {
  messageService = inject(MessagesService);

  message = new CreateMessageModel('', MessageStatus.DRAFT);

  onSubmit() {
    this.message.status = MessageStatus.PENDING;

    this.messageService
      .send({ content: this.message.content })
      .pipe(
        finalize(() => {
          this.message.status = MessageStatus.SENT;
          this.message.reset();
        }),
        catchError((err) => {
          console.error('Error posting message:', err);
          this.message.status = MessageStatus.FAILED;
          return of(null);
        }),
        take(1)
      )
      .subscribe();
  }
}
