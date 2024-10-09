export class Message {
  content: string;

  userId: string;

  createdAt: Date = new Date(Date.now());
}
