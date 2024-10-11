import { inject, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { Message } from '../models/message.model';

@Injectable()
export class MessageService {
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$: Observable<Message[]> = this.messagesSubject.asObservable();

  http = inject(HttpClient);

  fetchAll(): void {
    this.http
      .get<{ messages: Message[] }>('http://127.0.0.1:3000/messages')
      .pipe(
        map((data) =>
          data.messages.map(
            (message) => new Message(message.content, message.status)
          )
        )
      )
      .subscribe((messages) => this.messagesSubject.next(messages));
  }

  add(message: Message): void {
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }
}
