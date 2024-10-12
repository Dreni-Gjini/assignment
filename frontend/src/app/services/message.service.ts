import { inject, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, take } from 'rxjs';
import { Message, PostMessageDto } from '../models/message.model';

@Injectable()
export class MessageService {
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$: Observable<Message[]> = this.messagesSubject.asObservable();

  http = inject(HttpClient);

  fetchAll(): void {
    const timestamp = new Date('2023-01-01T00:00:00Z').getTime();

    this.http
      .get<Message[]>(`http://localhost:3000/messages?timestamp=${timestamp}`)
      .pipe(
        map((messages = []) => {
          return messages
            .map((message) => new Message({ ...message }))
            .sort(
              (a, b) =>
                new Date(a.timestamp).getTime() -
                new Date(b.timestamp).getTime()
            );
        }),
        catchError((err) => {
          console.error('Error fetching messages:', err);
          return of([]);
        }),
        take(1)
      )
      .subscribe((messages) => this.messagesSubject.next(messages));
  }

  send(message: PostMessageDto): Observable<void> {
    return this.http.post<void>(`http://localhost:3000/messages`, message);
  }
}
