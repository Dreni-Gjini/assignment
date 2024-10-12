export * from './auth.service';
import { AuthService } from './auth.service';
export * from './messages.service';
import { MessagesService } from './messages.service';
export const APIS = [AuthService, MessagesService];
