import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  standalone: true,
  imports: [NgClass],
})
export class MessageComponent {
  @Input() message: any;
  @Input() no: number | undefined;
}
