import { Routes } from '@angular/router';
import { ChatComponent } from './views/chat/components/chat/chat.component';
import { authGuard } from './core/auth/auth.guard';
import { AccountComponent } from './views/account/account.component';

export const routes: Routes = [
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
  { path: 'chat', component: ChatComponent, canActivate: [authGuard] },
  { path: 'account', component: AccountComponent },
  { path: '**', redirectTo: '/error' },
];
