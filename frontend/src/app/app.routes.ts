import { Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { authGuard } from './auth/auth.guard';
import { AccountComponent } from './account/account.component';

export const routes: Routes = [
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
  { path: 'chat', component: ChatComponent, canActivate: [authGuard] },
  { path: 'account', component: AccountComponent },
  { path: '**', redirectTo: '/error' },
];
