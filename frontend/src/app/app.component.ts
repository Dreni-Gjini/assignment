import { Component, inject } from '@angular/core';
import { ChatComponent } from './views/chat/components/chat/chat.component';
import { CreateMessageComponent } from './views/chat/components/create-message/create-message.component';
import { RouterModule } from '@angular/router';
import { CustomAuthService } from './core/auth/customAuth.service';
import { LucideAngularModule, FileIcon } from 'lucide-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    ChatComponent,
    CreateMessageComponent,
    RouterModule,
    LucideAngularModule,
  ],
})
export class AppComponent {
  title = 'Chat Application';
  readonly FileIcon = FileIcon;

  authService = inject(CustomAuthService);
}
