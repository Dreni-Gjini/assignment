export class Message {
  content: string;

  userId: string;

  timestamp: Date = new Date(Date.now());

  isAi: boolean = false;
}
