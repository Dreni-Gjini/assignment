import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { Message } from '../../models/message.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, Observable, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MessagesService } from '../../api';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  standalone: true,
  imports: [MessageComponent, CommonModule],
  providers: [MessagesService],
})
export class ChatComponent implements OnInit {
  messages$!: Observable<Message[]>;

  messageService = inject(MessagesService);

  ngOnInit(): void {
    this.fetchMessages();
  }

  fetchMessages(): void {
    const timestamp = new Date('2023-01-01T00:00:00Z').getTime();

    this.messages$ = this.messageService.findAll(`${timestamp}`).pipe(
      map((messages = []) => {
        return messages
          .map((message: Message) => new Message({ ...message }))
          .sort(
            (a: Message, b: Message) =>
              new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          );
      }),
      take(1)
    );
  }
}
