import { Component, inject } from '@angular/core';
import { ChatComponent } from './components/chat/chat.component';
import { CreateMessageComponent } from './components/create-message/create-message.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CustomAuthService } from './auth/customAuth.service';

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
