import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private connectedUsers: Map<string, Socket> = new Map();

  constructor(private readonly jwtService: JwtService) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.query.token as string;
      if (!token) {
        throw new WsException('Token not provided');
      }

      const decoded = this.jwtService.verify(token);

      const userId = decoded.userId;
      this.connectedUsers.set(userId, client);
      console.log(`User ${userId} connected with socket ID ${client.id}`);
    } catch (error) {
      console.log('Connection error:', error.message);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = [...this.connectedUsers.entries()].find(
      ([, socket]) => socket.id === client.id,
    )?.[0];

    if (userId) {
      this.connectedUsers.delete(userId);
      console.log(`User ${userId} disconnected`);
    }
  }
}
