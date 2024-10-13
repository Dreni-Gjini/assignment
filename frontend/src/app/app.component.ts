import { Component, inject } from '@angular/core';
import { ChatComponent } from './views/chat/components/chat/chat.component';
import { CreateMessageComponent } from './views/chat/components/create-message/create-message.component';
import { RouterModule } from '@angular/router';
import { CustomAuthService } from './core/auth/customAuth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [ChatComponent, CreateMessageComponent, RouterModule],
})
export class AppComponent {
  title = 'Chat Application';

  authService = inject(CustomAuthService);
}
