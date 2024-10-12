import { Component, inject, Inject } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { CreateMessageModel } from '../../models/message.model';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageStatus } from '../../models/message-status.enum';
import { MessageComponent } from '../message/message.component';
import { catchError, of, take, tap } from 'rxjs';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  standalone: true,
  imports: [FormsModule, MessageComponent, NgClass],
  providers: [MessageService],
})
export class CreateMessageComponent {
  messageService = inject(MessageService);
  

  message = new CreateMessageModel('', MessageStatus.DRAFT);

  onSubmit() {
    this.message.status = MessageStatus.PENDING;

    this.messageService
      .send({ content: this.message.content })
      .pipe(
        tap({
          complete: () => {
            this.message.status = MessageStatus.SENT;
            this.message.reset();
          },
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
