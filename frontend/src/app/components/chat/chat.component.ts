import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { Message } from '../../models/message.model';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  Subject,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { MessagesService } from '../../api';
import { CreateMessageComponent } from '../create-message/create-message.component';
import { MessageStatus } from '../../models/message-status.enum';
import { scrollToBottom } from '../../helpers/dom-utils';
import { SocketService } from '../../services/socker.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MessageComponent, CommonModule, CreateMessageComponent],
  providers: [MessagesService],
})
export class ChatComponent implements OnInit {
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$: Observable<Message[]> = this.messagesSubject.asObservable();
  private existingMessages: Message[] = [];
  private destroy$ = new Subject<void>();
  processing: boolean = false;

  private messageService = inject(MessagesService);
  private socketService = inject(SocketService);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  ngOnInit(): void {
    this.socketService.connect();
    this.setupSocketListeners();
    this.fetchMessages(new Date('2023-01-01T00:00:00Z').getTime());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    this.socketService.disconnect();
  }

  private setupSocketListeners(): void {
    this.socketService
      .onEvent('chatbot')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        const shouldFetchMessages =
          data.status === 'sent' || data.status === 'processing';
        if (shouldFetchMessages) {
          this.fetchLatestMessages();
          this.processing = data.status === 'processing';
        }

        this.cdr.markForCheck();
      });
  }

  private fetchLatestMessages(): void {
    this.messages$
      .pipe(
        take(1),
        map((messages: Message[]) => messages[messages.length - 1]),
        catchError((error) => {
          console.error('Error fetching latest message:', error);
          return of(null);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((lastMessage: Message | null) => {
        if (lastMessage) {
          const lastTimestamp = new Date(lastMessage.timestamp).getTime();
          this.fetchMessages(lastTimestamp);
        } else {
          this.fetchMessages(new Date('2023-01-01T00:00:00Z').getTime());
        }
      });
  }

  private fetchMessages(timestamp: number): void {
    this.messageService
      .findAll(`${timestamp}`)
      .pipe(
        map((messages = []) => {
          return messages
            .map(
              (message: Message) =>
                new Message({
                  ...message,
                  status: message.isAi
                    ? MessageStatus.RECEIVED
                    : MessageStatus.SENT,
                })
            )
            .sort(
              (a: Message, b: Message) =>
                new Date(a.timestamp).getTime() -
                new Date(b.timestamp).getTime()
            );
        }),
        take(1),
        catchError((error) => {
          console.error('Error fetching messages:', error);
          return of([]);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((newMessages: Message[]) => {
        this.existingMessages = [...this.existingMessages, ...newMessages];
        this.messagesSubject.next(this.existingMessages);

        this.cdr.markForCheck();

        setTimeout(
          () => scrollToBottom(this.messageContainer.nativeElement),
          0
        );
      });
  }
}
