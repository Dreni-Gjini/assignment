import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { MessageComponent } from '../message/message.component';
import { Message } from '../../models/message.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  standalone: true,
  imports: [MessageComponent, CommonModule],
  providers: [MessageService],
})
export class ChatComponent implements OnInit {
  messages$!: Observable<Message[]>;

  messageService = inject(MessageService);

  ngOnInit(): void {
    this.messages$ = this.messageService.messages$;
    this.messageService.fetchAll();
  }
}
