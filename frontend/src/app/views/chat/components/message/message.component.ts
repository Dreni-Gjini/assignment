import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  standalone: true,
  imports: [NgClass],
})
export class MessageComponent {
  @Input() message!: Message;
  @Input() no!: string | number;
}
