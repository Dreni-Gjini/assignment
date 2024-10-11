import { Component } from '@angular/core';
import { ChatComponent } from './components/chat/chat.component';
import { CreateMessageComponent } from './components/create-message/create-message.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [ChatComponent, CreateMessageComponent],
})
export class AppComponent {
  title = 'Chat Application';
}
