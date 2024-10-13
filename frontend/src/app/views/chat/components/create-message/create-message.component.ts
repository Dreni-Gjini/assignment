import { Component, inject } from '@angular/core';
import { CreateMessageModel } from '../../models/message.model';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageStatus } from '../../models/message-status.enum';
import { MessageComponent } from '../message/message.component';
import { catchError, finalize, of, take } from 'rxjs';
import { MessagesService } from '../../../../api';
import { LucideAngularModule, SendHorizontal } from 'lucide-angular';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  standalone: true,

  imports: [FormsModule, MessageComponent, NgClass, LucideAngularModule],
  providers: [MessagesService],
})
export class CreateMessageComponent {
  messageService = inject(MessagesService);
  readonly SendHorizontal = SendHorizontal;
  message = new CreateMessageModel('', MessageStatus.DRAFT);

  onSubmit() {
    this.sendMessage();
  }

  private sendMessage() {
    this.message.status = MessageStatus.PENDING;
    //since the local server is fast, we dont get to see the pending preview, therefore i added 1sec timer until firing the req
    setTimeout(() => {
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
    }, 1000);
  }
}
